import React, { useState, useRef, useEffect } from 'react';
import styles from '@/styles/reserve/RegisterReq.module.css';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { removeFavoriteApartment } from '@/state/apartment/favApartment';



const ApartmentCard = ({ apartment }) => {
  const dispatch = useDispatch();
  console.log('apartment', apartment);
  const handleDelete = () => {
    dispatch(removeFavoriteApartment(apartment.Apartmentno));
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3>Apartment no. {apartment.Apartmentno}</h3>
        <div className={styles.deleteButton} onClick={handleDelete}>
          <Image src="/images/icons/binIcon.svg" quality={100} alt="Delete Icon" height={16} width={16} />
        </div>
      </div>
      <div className={styles.cardBody}>
        <div className={styles.row}>
          <span>Floor</span>
          <span>{apartment.floor}</span>
        </div>
        <div className={styles.row}>
          <span>Type</span>
          <span>{apartment.Type}</span>
        </div>
        <div className={styles.row}>
          <span>Bedrooms</span>
          <span>{apartment.Bedrooms}</span>
        </div>
        <div className={styles.row}>
          <span>Area</span>
          <span>{apartment.Area} sq.ft</span>
        </div>
        {apartment.price && (
          <div className={styles.row}>
            <span className={styles.price}>Price</span>
            <span className={styles.price}>Rs. {apartment.price.toLocaleString()}</span>
          </div>
        )}
      </div>
    </div>
  );
};


const RegisterRequestForm = ({ onClose }) => {
  const favoriteApartments = useSelector((state) => state.favoriteApartments.favoriteApartments);
  const [currentStep, setCurrentStep] = useState(favoriteApartments.length > 0 ? 1 : 2);
  const totalSteps = favoriteApartments.length > 0 ? 2 : 1;
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    fullname: '',
    phoneNumber: '',
    email: '',
    comments: '',
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      console.log('Form submitted:', formData);
      onClose();
    }
  };

  const renderStepButtons = () => {
    return Array.from({ length: totalSteps }, (_, index) => (
      <div
        key={index}
        className={`${styles.stepButton} ${currentStep === index + 1 ? styles.active : ''}`}
        onClick={() => setCurrentStep(index + 1)}
      />
    ));
  };

  const renderInputForm = () => (
    <div className={styles.inputGrids}>
      <div className={styles.inputBox}>
        <div className={styles.inputTitle}>First Name</div>
        <div className={styles.inputGroup}>
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className={styles.inputBox}>
        <div className={styles.inputTitle}>Phone Number</div>
        <div className={styles.inputGroup}>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className={styles.inputBox}>
        <div className={styles.inputTitle}>Email</div>
        <div className={styles.inputGroup}>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className={styles.inputBox}>
        <div className={styles.inputTitle}>Comments</div>
        <div className={styles.inputGroup}>
          <textarea
            name="comments"
            value={formData.comments}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.overlay}>
      <div className={styles.formContainer} ref={formRef}>
        <div className={styles.closeButtonBox} onClick={onClose}>
          <div className={styles.closeButton}>
            <Image src="/images/icons/closeIcon.svg" width="20" height="20" alt="Close"/>
          </div>
        </div>
        <h2 className={styles.formTitle}>Register Request</h2>
     
        {favoriteApartments.length > 0 && currentStep === 1 && (
          <div className={styles.cardContainer}>
            {favoriteApartments.map((apartment) => (
              <ApartmentCard key={apartment.Apartmentno} apartment={apartment} />
            ))}
          </div>
        )}

        {(favoriteApartments.length === 0 || currentStep === 2) && renderInputForm()}

        <div className={styles.formFooter}>
          {totalSteps > 1 && (
            <div className={styles.stepButtons}>
              {renderStepButtons()}
            </div>
          )}
          <button onClick={handleSubmit} type="submit" className={styles.submitButton}>
            {currentStep < totalSteps ? 'Next' : 'Submit'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterRequestForm;