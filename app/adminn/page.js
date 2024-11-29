'use client';

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateApartment, toggleBookingStatus } from '@/state/apartment/apartmentSlice';
import styles from '@/styles/admin/adminPage.module.css';
import Image from 'next/image';

const AdminPage = () => {
  const dispatch = useDispatch();
  const apartments = useSelector((state) => state.apartmentn.apartments);

  const [editing, setEditing] = useState(null); // { floor, Apartmentno }
  const [formData, setFormData] = useState({
    Type: '',
    Bedrooms: '',
    Area: '',
  });

  // Insights Calculations
  const totalApartments = Object.values(apartments).reduce(
    (acc, floor) => acc + floor.length,
    0
  );
  const bookedApartments = Object.values(apartments).reduce(
    (acc, floor) => acc + floor.filter((apt) => apt.isBooked).length,
    0
  );
  const availableApartments = totalApartments - bookedApartments;

  const handleEditClick = (floor, Apartmentno) => {
    const apartment = apartments[floor].find((apt) => apt.Apartmentno === Apartmentno);
    setEditing({ floor, Apartmentno });
    setFormData({
      Type: apartment.Type,
      Bedrooms: apartment.Bedrooms,
      Area: apartment.Area,
    });
  };

  const handleCancelEdit = () => {
    setEditing(null);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveEdit = () => {
    if (editing) {
      dispatch(
        updateApartment({
          floor: editing.floor,
          Apartmentno: editing.Apartmentno,
          updates: {
            Type: formData.Type,
            Bedrooms: parseInt(formData.Bedrooms, 10),
            Area: formData.Area,
          },
        })
      );
      setEditing(null);
    }
  };

  const handleToggleBooking = (floor, Apartmentno) => {
    dispatch(toggleBookingStatus({ floor, Apartmentno }));
  };

  return (
    <div className={styles.adminContainer}>
      <h1 className={styles.title}>Admin Dashboard</h1>

      {/* Insights Section */}
      <div className={styles.insights}>
        <div className={styles.insightCard}>
          <h2>Total Apartments</h2>
          <p>{totalApartments}</p>
        </div>
        <div className={styles.insightCard}>
          <h2>Booked Apartments</h2>
          <p>{bookedApartments}</p>
        </div>
        <div className={styles.insightCard}>
          <h2>Available Apartments</h2>
          <p>{availableApartments}</p>
        </div>
      </div>

      {/* Apartments List */}
      {Object.keys(apartments).map((floor) => (
        <div key={floor} className={styles.floorSection}>
          <h2 className={styles.floorTitle}>{floor}</h2>
          <table className={styles.apartmentsTable}>
            <thead>
              <tr>
                <th>Apartment No</th>
                <th>Type</th>
                <th>Bedrooms</th>
                <th>Area</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {apartments[floor].map((apt) => (
                <tr
                  key={apt.Apartmentno}
                  className={apt.isBooked ? styles.booked : ''}
                >
                  <td>{apt.Apartmentno}</td>
                  <td>
                    {editing &&
                    editing.floor === floor &&
                    editing.Apartmentno === apt.Apartmentno ? (
                      <input
                        type="text"
                        name="Type"
                        value={formData.Type}
                        onChange={handleFormChange}
                      />
                    ) : (
                      apt.Type
                    )}
                  </td>
                  <td>
                    {editing &&
                    editing.floor === floor &&
                    editing.Apartmentno === apt.Apartmentno ? (
                      <input
                        type="number"
                        name="Bedrooms"
                        value={formData.Bedrooms}
                        onChange={handleFormChange}
                      />
                    ) : (
                      apt.Bedrooms
                    )}
                  </td>
                  <td>
                    {editing &&
                    editing.floor === floor &&
                    editing.Apartmentno === apt.Apartmentno ? (
                      <input
                        type="text"
                        name="Area"
                        value={formData.Area}
                        onChange={handleFormChange}
                      />
                    ) : (
                      apt.Area
                    )}
                  </td>
                  <td>
                    {apt.isBooked ? (
                      <span className={styles.bookedStatus}>Booked</span>
                    ) : (
                      <span className={styles.availableStatus}>Available</span>
                    )}
                  </td>
                  <td>
                    {editing &&
                    editing.floor === floor &&
                    editing.Apartmentno === apt.Apartmentno ? (
                      <>
                        <button
                          className={styles.saveButton}
                          onClick={handleSaveEdit}
                        >
                          Save
                        </button>
                        <button
                          className={styles.cancelButton}
                          onClick={handleCancelEdit}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className={styles.editButton}
                          onClick={() => handleEditClick(floor, apt.Apartmentno)}
                        >
                          Edit
                        </button>
                        <button
                          className={styles.bookButton}
                          onClick={() => handleToggleBooking(floor, apt.Apartmentno)}
                        >
                          {apt.isBooked ? 'Unbook' : 'Book'}
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default AdminPage;
