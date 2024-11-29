// components/admin/AdminDashboard.js
import React from 'react';
import ApartmentTable from './apartmentTable';
import Insights from './Insights';
import styles from '@/styles/admin/dashboard.module.css';
import { Row, Col } from 'antd';

const AdminDashboard = () => {
  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.title}>Admin Dashboard</h1>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Insights />
        </Col>
        <Col xs={24} lg={12}>
          {/* Placeholder for additional insights or components */}
          {/* You can add more charts or widgets here */}
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <ApartmentTable />
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;
