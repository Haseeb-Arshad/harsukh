// components/admin/Insights.js
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import styles from '@/styles/admin/insights.module.css';

const STATUS_COLORS = {
  'Active': '#52c41a',       // Green
  'In Process': '#faad14',   // Orange
  'Booked': '#f5222d',       // Red
};

const FLOOR_COLORS = [
  '#006d77', // Teal
  '#83c5be', // Light Teal
  '#FFB703', // Vibrant Yellow
  '#FF6B6B', // Coral Red
  '#118AB2', // Blue
  '#073B4C', // Dark Blue
];

const Insights = () => {
  const apartmentsData = useSelector(state => state.apartments.apartments);

  // Flatten the apartments data for processing
  const flattenedApartments = useMemo(() => {
    const flats = [];
    for (const floor in apartmentsData) {
      if (Array.isArray(apartmentsData[floor])) { // Ensure it's an array
        apartmentsData[floor].forEach(apt => {
          flats.push({
            ...apt,
            floorName: floor, // Already "Valley Floor X"
          });
        });
      } else {
        console.warn(`Expected an array for floor "${floor}", but got:`, apartmentsData[floor]);
      }
    }
    return flats;
  }, [apartmentsData]);

  // Prepare data for Apartment Status Pie Chart
  const statusData = useMemo(() => {
    const statusCount = {
      'Active': 0,
      'In Process': 0,
      'Booked': 0,
    };
    flattenedApartments.forEach(apt => {
      if (statusCount.hasOwnProperty(apt.status)) {
        statusCount[apt.status] += 1;
      }
    });
    return Object.keys(statusCount).map(status => ({
      name: status,
      value: statusCount[status],
    }));
  }, [flattenedApartments]);

  // Prepare data for Apartments per Floor Horizontal Bar Chart
  const floorChartData = useMemo(() => {
    const floorCount = {};
    flattenedApartments.forEach(apt => {
      floorCount[apt.floorName] = (floorCount[apt.floorName] || 0) + 1;
    });
    return Object.keys(floorCount).map((floor, index) => ({
      floor,
      count: floorCount[floor],
      color: FLOOR_COLORS[index % FLOOR_COLORS.length],
    }));
  }, [flattenedApartments]);

  return (
    <div className={styles.insightsContainer}>
      <div className={styles.chartBox}>
        <h3 className={styles.chartTitle}>Apartment Status Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={statusData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {statusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry.name]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className={styles.chartBox}>
        <h3 className={styles.chartTitle}>Apartments per Floor</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={floorChartData}
            layout="vertical"
            margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" allowDecimals={false} />
            <YAxis type="category" dataKey="floor" />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="count"
              name="Number of Apartments"
              fill="#006d77"
              barSize={20}
              radius={[10, 10, 0, 0]}
            >
              {floorChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Insights;
