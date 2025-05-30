import React, { useState, useRef, useEffect } from 'react';
import styles from '@/styles/reserve/RegisterReq.module.css';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { removeFavoriteApartment } from '@/state/apartment/favApartment';
import CloseIcon from '../Icons/closeBtn';

const ApartmentCard = ({ apartment }) => {
  const dispatch = useDispatch();
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
    name: '',
    phone: '',
    email: '',
    comment: '',
  });

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const [touchedFields, setTouchedFields] = useState({
    name: false,
    phone: false,
    email: false,
  });

  useEffect(() => {
    validateForm();
  }, [formData]);



  useEffect(() => {
    // Initialize GTM
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', 'GTM-MJDJH587');

    // Track clicks
    const clickHandler = (event) => {
      if (event.target.dataset.gtmClick) {
        gtag('event', event.target.dataset.gtmClick, {
          eventCategory: 'click',
          eventAction: 'submit',
          eventLabel: 'submit-button',
        });
      }
    };
    document.addEventListener('click', clickHandler);

    return () => {
      document.removeEventListener('click', clickHandler);
    };
  }, []);

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

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (touchedFields.name && formData.name.trim() === '') {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    if (touchedFields.phone && !phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number';
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (touchedFields.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email address';
      isValid = false;
    }

    setErrors(newErrors);
    setIsFormValid(isValid);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBlur = (e) => {
    setTouchedFields({ ...touchedFields, [e.target.name]: true });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      try {
        setIsSubmitting(true);
        const dataForBackend = {
          ...formData,
          data: favoriteApartments
        };

        // const response = await fetch('https://almaymaar.rems.pk/api/harsukh-form', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //     'Accept': 'application/json',
        //     'Authorization': 'Bearer GjKnyjcXFImbsMxCMf0McLaQBmlHKMvGk9'
        //   },
        //   body: JSON.stringify(dataForBackend),
        // });

        // if (!response.ok) {
        //   throw new Error(`HTTP error! status: ${response.status}`);
        // }

        // const result = await response.json();
        console.log('Form submitted successfully:', result);
        onClose();
      } catch (error) {
        console.error('Error submitting form:', error);
        setSubmitError('An error occurred while submitting the form. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  
  // Helper function to get cookie value
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

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
        <div className={styles.inputTitle}>Name</div>
        <div className={styles.inputGroup}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {touchedFields.name && errors.name && <div className={styles.errorMessage}>{errors.name}</div>}
        </div>
      </div>

      <div className={styles.inputBox}>
        <div className={styles.inputTitle}>Phone Number</div>
        <div className={styles.inputGroup}>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {touchedFields.phone && errors.phone && <div className={styles.errorMessage}>{errors.phone}</div>}
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
            onBlur={handleBlur}
            required
          />
          {touchedFields.email && errors.email && <div className={styles.errorMessage}>{errors.email}</div>}
        </div>
      </div>

      <div className={styles.inputBox}>
        <div className={styles.inputTitle}>Comment</div>
        <div className={styles.inputGroup}>
          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.overlay}>
      <div className={styles.formContainerBox} ref={formRef}>
        <div className={styles.closeButtonBox}>
          <CloseIcon closeBtn={onClose} />
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

        {submitError && <div className={styles.errorMessage}>{submitError}</div>}

        <div className={styles.formFooter}>
          {totalSteps > 1 && (
            <div className={styles.stepButtons}>
              {renderStepButtons()}
            </div>
          )}
         <button 
            onClick={handleSubmit} 
            type="submit" 
            data-gtm-click="submit-button"
            id="submit-button-id"
            className={`submit-button-id ${styles.submitButton} ${(!isFormValid || isSubmitting) && currentStep === totalSteps ? styles.disabled : ''}`}
            disabled={(!isFormValid || isSubmitting) && currentStep === totalSteps}
          >
            {currentStep < totalSteps ? 'Next' : (isSubmitting ? 'Submitting...' : 'Submit')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterRequestForm;