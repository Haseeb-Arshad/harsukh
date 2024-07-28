'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import apartmentData from '@/app/component/data/floorData';
import ElevStyles from "@/styles/elevation.module.css";
import { useSelector, useDispatch } from 'react-redux';
import { modifyLanguage } from '@/state/language/languageState';
import Image from 'next/image';
import styles from '@/styles/apartment/apartmentLayout.module.css';
import { useRouter } from 'next/navigation';
import en from '@/app/locales/en.json';
import ur from '@/app/locales/ur.json';

import { addFavoriteApartment, removeFavoriteApartment } from '@/state/apartment/favApartment';

const Layout = ({children}) => 
{   
    const router = useRouter();
    const dispatch = useDispatch();

    const params = useParams();

    const [apartmentInfo, setApartmentInfo] = useState(null);

    const [floor, setFloor] = useState('');

    const favoriteApartments = useSelector((state) => state.favoriteApartments.favoriteApartments);


    useEffect(() => {
        const apartmentNumber = params.apartment;
        let foundApartment = null;
        let foundFloor = '';

        // Search for the apartment in all floors
        for (const floorName in apartmentData) {
            const apartment = apartmentData[floorName].find(apt => apt.Apartmentno.toString() === apartmentNumber);
            if (apartment) {
                foundApartment = apartment;
                foundFloor = floorName;
                break;
            }
        }

        if (foundApartment) {
            setApartmentInfo(foundApartment);
            setFloor(foundFloor);
        } else {
            // Redirect to apartment 1 if the apartment is not found
            router.push('/thirdFloor/1');
        }
    }, [params.apartment, router]);


    useEffect(() => {
        function handleClickOutside(event) {
          if (elevationRef.current && !elevationRef.current.contains(event.target)) {
            setIsElevationOpen(false);
          }
        }
    
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);
    

  const languageState = useSelector((state) => {
    const languageState = state.language.lang.find((site) => site.id === '1');
    return languageState ? languageState.language : 'en';
  });

  const [language, setLanguage] = useState(languageState === 'ur');
  const [translations, setTranslations] = useState(languageState === 'ur' ? ur : en);

  const [showPopup, setShowPopup] = useState(false);

  const handleIconClick = () => {
    if (apartmentInfo) {
        const isFavorite = favoriteApartments.some(apt => apt.Apartmentno === apartmentInfo.Apartmentno);
        if (isFavorite) {
            dispatch(removeFavoriteApartment(apartmentInfo.Apartmentno));
            setShowPopup(true);
            setTimeout(() => {
                setShowPopup(false);
            }, 5000);
        } else {
            dispatch(addFavoriteApartment({ ...apartmentInfo, floor }));
            setShowPopup(true);
            setTimeout(() => {
                setShowPopup(false);
            }, 5000);
        }
    }
  };



  const toggleLanguage = () => {
    setLanguage(!language);
  }

  useEffect(() => {
    setTranslations(language ? ur : en);
    dispatch(modifyLanguage({ language: language ? 'ur' : 'en' }));
  }, [language, dispatch]);

  const elevationRef = useRef(null);

  const elevationDropdown = () => {
    setIsElevationOpen(!isElevationOpen);
  };

  const handleElevationItemClick = (route) => {
    router.push(route);
    setIsElevationOpen(false);
  };

  const [isElevationOpen, setIsElevationOpen] = useState(false);
  const [elevationArray, setElevationArray] = 
  useState([
    {id:'2', label: 'Map View', route:'/mapview'},
    {id:'1', label: 'Elevation', route:'/'},

  ]);


    return (
    <>
    <div>
        {children}
    </div>


    <div className={ElevStyles.elevationApContainer}>
      <div className={ElevStyles.elevationButtonBox}  ref={elevationRef} >
          <div
              className={`${ElevStyles.elevationBtnGrid} ${isElevationOpen ? ElevStyles.open : ''}`}
            >
              <div className={ElevStyles.elevationBtnLeft} onClick={() => router.push('/mapview')}>
                <Image src="/images/icons/LeftArrow.svg" quality={100} alt="Elevation" height={16} width={16} />
              </div>
              <div
                className={ElevStyles.elevationBtnRight}
                // onMouseEnter={() => setIsElevationOpen(true)}
                // onMouseLeave={() => setIsElevationOpen(false)}
                onClick={elevationDropdown}

              >
                <div className={ElevStyles.elevationBtnTitle}>{translations.elevation || 'Elevation'}</div>
                <div className={ElevStyles.elevationBtnDownArrow}>
                  <Image src="/images/icons/downFillArrow.svg" quality={100} alt="Elevation" height={7} width={7} />
                </div>
              </div>
            </div>
            
            <div
              className={`${ElevStyles.dropDownElevationBox} ${isElevationOpen ? ElevStyles.open : ''}`}
              // onMouseEnter={() => setIsElevationOpen(true)}
            >
              {elevationArray.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleElevationItemClick(item.route)}
                  className={`${ElevStyles.dropDownfloorButton} ${item.label === 'Elevation' ? ElevStyles.active : ''}`}
                >
                  {translations[item.label.toLowerCase()] || item.label}
                </div>
              ))}
            </div>
          </div>
          </div>

          <div className={styles.apartmentInterestBox}>
            <div className={styles.apartmentInterestInside}>
          
                
                <div className={styles.apartmentInterestTitle}>
                    <div className={styles.apartmentInterestTitleText}>
                        {/* {translations.apartmentInterest || 'Apartment Interest'} */}
                          Apartment no. {apartmentInfo?.Apartmentno || ''}
                        </div>
                    <div className={styles.apartmentInterestTitleIcon}  onClick={handleIconClick}>
                    <Image 
                    // src="/images/icons/favIconFilled.svg"
                    src={favoriteApartments.some(apt => apt.Apartmentno === apartmentInfo?.Apartmentno) 
                        ? "/images/icons/favIconFilled.svg" 
                        : "/images/icons/favIcon.svg"} 
                    quality={100} 
                    alt="Favorite" 
                    height={22} 
                    width={22} 
                />                    </div>

                </div>
                <div className={styles.apartmentInterestList}>

                <div className={styles.apartmentInterestItem}>
                    <div className={styles.apartmentInterestItemKey}>
                        Floor
                    </div>
                    <div className={styles.apartmentInterestItemValue}>
                        {floor || ''}
                    </div>
                </div>

                <div className={styles.apartmentInterestItem}>
                    <div className={styles.apartmentInterestItemKey}>
                        Type
                    </div>
                    <div className={styles.apartmentInterestItemValue}>
                        {apartmentInfo?.Type || ''}
                    </div>
                </div>
                <div className={styles.apartmentInterestItem}>
                    <div className={styles.apartmentInterestItemKey}>
                        Bedrooms
                    </div>
                    <div className={styles.apartmentInterestItemValue}>
                        {apartmentInfo?.Bedrooms || ''}
                    </div>
                </div>
                <div className={styles.apartmentInterestItem}>
                    <div className={styles.apartmentInterestItemKey}>
                        Area
                    </div>
                    <div className={styles.apartmentInterestItemValue}>
                        {apartmentInfo?.Area || ''}
                    </div>
                </div>

                </div>
                <div className={styles.apartmentInterestButtonBox}>
                    <div className={styles.apartmentInterestButton}>
                        Interested
                    </div>
                </div>

            </div>

          </div>


          {showPopup && (
                <div className={`${styles.popupMenu} ${styles.fadeInOut}`}>
                  Apartment has been added to favorites.
                    {/* {favoriteApartments.some(apt => apt.Apartmentno === apartmentInfo?.Apartmentno)
                        ? "Apartment has been added to favorites."
                        : "Apartment has been removed from favorites."} */}
                </div>
            )}

    </>

    )
  
}

export default Layout