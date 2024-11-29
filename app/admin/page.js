// app/admin/page.js
'use client';

import React from 'react';
import AdminDashboard from '@/app/component/admin/AdminDashboard';
import styles from '@/styles/admin/adminPage.module.css';

const AdminPage = () => {
  return (
    <div className={styles.adminPageContainer}>
      <AdminDashboard />
    </div>
  );
};

export default AdminPage;
