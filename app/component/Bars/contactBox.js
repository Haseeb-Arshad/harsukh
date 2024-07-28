import React, { useState } from 'react';
import styles from '@/styles/Floor/RegisterReq.module.css';

const RegisterRequestForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>Register Request</h2>
      <div className={styles.apartmentInfo}>
        <h3>Apartment no. 23</h3>
        <table>
          <tbody>
            <tr><td>Floor</td><td>Third Floor</td></tr>
            <tr><td>Bedrooms</td><td>2</td></tr>
            <tr><td>Net Area</td><td>150 sq.ft</td></tr>
            <tr><td>Gross Area</td><td>300 sq.ft</td></tr>
            <tr><td>Price</td><td>Rs. 23,500,000</td></tr>
          </tbody>
        </table>
      </div>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className={styles.submitButton}>Submit</button>
      </form>
    </div>
  );
};

export default RegisterRequestForm;