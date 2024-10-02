import React, { useState, useRef, useEffect } from 'react';
import styles from '@/styles/reserve/RegisterReq.module.css';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { removeFavoriteApartment } from '@/state/apartment/favApartment';
import CloseIcon from '../../Icons/closeBtn';
import Swup from 'swup';

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

const RegisterRequestForm = ({ onClose, onSuccess }) => {
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
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const [touchedFields, setTouchedFields] = useState({
    name: false,
    phone: false,
    email: false,
  });

  useEffect(() => {
    const swup = new Swup();
    return () => {
      swup.destroy();
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

    if (formData.name.trim() === '') {
      newErrors.name = 'Name is required';
      isValid = false;
    }


    const phoneRegex = /^[+]?[0-9\s()-]*$/; // Allows more formats, including local styles
    
    if (!phoneRegex.test(formData.phone) || formData.phone.length < 4) {
      newErrors.phone = 'Invalid phone number. It must be at least 4 characters long.';
      isValid = false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email address';
      isValid = false;
    }

    setErrors(newErrors);
    setIsFormValid(isValid);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      // Only allow numbers and '+' for phone field
      const sanitizedValue = value.replace(/[^\d+]/g, '');
      setFormData({ ...formData, [name]: sanitizedValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    setTouchedFields({ ...touchedFields, [name]: true });
    validateForm();
  };

  const handleBlur = (e) => {
    setTouchedFields({ ...touchedFields, [e.target.name]: true });
    validateForm();
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();

    if (!isValid && currentStep === 2) { // Only validate in the input step
      return;
    }


    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      try {
        setIsSubmitting(true);
        const dataForBackend = {
          ...formData,
          data: favoriteApartments,
        };

        // const response = await fetch('https://almaymaar.rems.pk/api/harsukh-form', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //     'Accept': 'application/json',
        //     'Authorization': 'Bearer GjKnyjcXFImbsMxCMf0McLaQBmlHKMvGk9',
        //   },
        //   body: JSON.stringify(dataForBackend),
        // });

        // if (!response.ok) {
        //   throw new Error(`HTTP error! status: ${response.status}`);
        // }

        // const result = await response.json();
        console.log('Form submitted successfully:', "result");

        onSuccess();
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
          onClose();
        }, 3000);
      } catch (error) {
        console.error('Error submitting form:', error);
        setSubmitError('An error occurred while submitting the form. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
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
        <div className={styles.inputTitle}>Name</div>
        <div className={styles.inputGroup}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            autoComplete="new-password"
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
            autoComplete="new-password"
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
            autoComplete="new-password"
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
            autoComplete="new-password"
          />
        </div>
      </div>
    </div>
  );

  const renderSuccessMessage = () => (
    <div className={`${styles.successMessage} ${styles.swupTransitionFade}`}>
      <h2>Submit Successful!</h2>
      <p>We will get in touch with you soon!</p>
    </div>
  );

  return (
    <div className={styles.overlay}>
      <div className={styles.formContainerBox} ref={formRef}>
        <div className={styles.closeButtonBox}>
          <CloseIcon closeBtn={onClose} />
        </div>
        {!showSuccessMessage ? (
          <>
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
                className={`${styles.submitButton} ${currentStep === 2 && !isFormValid && !isSubmitting ? styles.disabled : ''}`}
                disabled={currentStep === 2 && !isFormValid && !isSubmitting}
              >
                {currentStep < totalSteps ? 'Next' : (isSubmitting ? 'Submitting...' : 'Submit')}
              </button>
            </div>
          </>
        ) : renderSuccessMessage()}
      </div>
    </div>
  );
};

export default RegisterRequestForm;
