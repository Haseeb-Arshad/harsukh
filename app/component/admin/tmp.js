// components/admin/ApartmentTable.js
import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateApartmentStatus, updateApartmentDetails } from '@/state/apartment/apartmentSlice';
import {
  Table,
  Button,
  Modal,
  Form,
  Select,
  Input,
  Row,
  Col,
  notification,
} from 'antd';
import { SearchOutlined, EditOutlined } from '@ant-design/icons';
import styles from '@/styles/admin/apartmentTable.module.css';

const { Option } = Select;

const ApartmentTable = () => {
  const dispatch = useDispatch();
  const apartmentsData = useSelector((state) => state.apartments.apartments);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedApartment, setSelectedApartment] = useState(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Get sorted list of floors
  const sortedFloors = useMemo(() => {
    // Extract floor names and sort them logically (e.g., Valley Floor 1, Valley Floor 2, ...)
    const floors = Object.keys(apartmentsData).filter(floor => floor.startsWith('Valley Floor'));
    floors.sort((a, b) => {
      const aNum = parseInt(a.split(' ')[2]) || 0;
      const bNum = parseInt(b.split(' ')[2]) || 0;
      return aNum - bNum;
    });
    return floors;
  }, [apartmentsData]);

  // Flatten the apartments data for easier searching
  const flattenedApartments = useMemo(() => {
    const flats = [];
    for (const floor of sortedFloors) {
      if (Array.isArray(apartmentsData[floor])) { // Ensure it's an array
        apartmentsData[floor].forEach(apt => {
          flats.push({
            key: apt.Apartmentno,
            Apartmentno: apt.Apartmentno,
            floorName: floor, // Already "Valley Floor X"
            Type: apt.Type,
            Bedrooms: apt.Bedrooms,
            Area: apt.Area,
            status: apt.status,
          });
        });
      } else {
        console.warn(`Expected an array for floor "${floor}", but got:`, apartmentsData[floor]);
      }
    }
    return flats;
  }, [apartmentsData, sortedFloors]);

  // Handle Search
  const handleSearch = (value) => {
    setSearchText(value);
    setCurrentPage(1); // Reset to first page on new search
  };

  // Filtered Data based on Search
  const filteredData = useMemo(() => {
    if (!searchText) return flattenedApartments;
    return flattenedApartments.filter(apt => {
      const searchLower = searchText.toLowerCase();
      return (
        apt.Apartmentno.toString().toLowerCase().includes(searchLower) ||
        apt.Type.toLowerCase().includes(searchLower) ||
        apt.floorName.toLowerCase().includes(searchLower) ||
        apt.Area.toLowerCase().includes(searchLower) ||
        apt.status.toLowerCase().includes(searchLower)
      );
    });
  }, [flattenedApartments, searchText]);

  // Paginated Data based on currentPage
  const paginatedData = useMemo(() => {
    if (filteredData.length === 0) return [];
    const floorIndex = currentPage - 1;
    const floorName = sortedFloors[floorIndex];
    return filteredData.filter(apt => apt.floorName === floorName);
  }, [filteredData, sortedFloors, currentPage]);

  // Total Pages equals number of floors
  const totalPages = sortedFloors.length;

  const showModal = (apartment) => {
    setSelectedApartment(apartment);
    setIsModalVisible(true);
    form.setFieldsValue({
      status: apartment.status,
      Type: apartment.Type,
      Area: apartment.Area,
      Bedrooms: apartment.Bedrooms,
    });
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        const { status, Type, Area, Bedrooms } = values;
        // Dispatch updateApartmentStatus if status has changed
        if (status !== selectedApartment.status) {
          dispatch(updateApartmentStatus({
            floor: selectedApartment.floorName,
            Apartmentno: selectedApartment.Apartmentno,
            status,
          }));
        }
        // Dispatch updateApartmentDetails for other fields
        const updates = {};
        if (Type !== selectedApartment.Type) updates.Type = Type;
        if (Area !== selectedApartment.Area) updates.Area = Area;
        if (Bedrooms !== selectedApartment.Bedrooms) updates.Bedrooms = Bedrooms;

        if (Object.keys(updates).length > 0) {
          dispatch(updateApartmentDetails({
            floor: selectedApartment.floorName,
            Apartmentno: selectedApartment.Apartmentno,
            updates,
          }));
        }

        notification.success({ message: 'Apartment updated successfully' });
        setIsModalVisible(false);
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Define columns
  const columns = [
    {
      title: 'Apartment No',
      dataIndex: 'Apartmentno',
      key: 'Apartmentno',
      sorter: (a, b) => a.Apartmentno - b.Apartmentno,
      width: 120,
    },
    {
      title: 'Floor',
      dataIndex: 'floorName',
      key: 'floorName',
      filters: sortedFloors.map(floor => ({
        text: floor,
        value: floor,
      })),
      onFilter: (value, record) => record.floorName === value,
      width: 160,
    },
    {
      title: 'Type',
      dataIndex: 'Type',
      key: 'Type',
      filters: Array.from(new Set(flattenedApartments.map(apt => apt.Type))).map(type => ({
        text: type,
        value: type,
      })),
      onFilter: (value, record) => record.Type === value,
      width: 160,
    },
    {
      title: 'Bedrooms',
      dataIndex: 'Bedrooms',
      key: 'Bedrooms',
      sorter: (a, b) => a.Bedrooms - b.Bedrooms,
      width: 120,
    },
    {
      title: 'Area',
      dataIndex: 'Area',
      key: 'Area',
      sorter: (a, b) => parseInt(a.Area) - parseInt(b.Area),
      width: 150,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: 'Active', value: 'Active' },
        { text: 'In Process', value: 'In Process' },
        { text: 'Booked', value: 'Booked' },
      ],
      onFilter: (value, record) => record.status === value,
      render: (text) => {
        let color;
        if (text === 'Active') {
          color = '#52c41a'; // Green
        } else if (text === 'In Process') {
          color = '#faad14'; // Orange
        } else if (text === 'Booked') {
          color = '#f5222d'; // Red
        }
        return <span style={{ color, fontWeight: 'bold' }}>{text}</span>;
      },
      width: 160,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button
          type="primary"
          icon={<EditOutlined />}
          onClick={() => showModal(record)}
          className={styles.editButton}
        >
          Edit
        </Button>
      ),
      width: 120,
    },
  ];

  return (
    <div className={styles.tableContainer}>
      <Row justify="space-between" align="middle" className={styles.headerRow}>
        <Col>
          <h2 className={styles.tableTitle}>Manage Apartments</h2>
        </Col>
        <Col>
          <Input
            placeholder="Search by No, Type, Floor, Area, Status"
            prefix={<SearchOutlined />}
            allowClear
            onSearch={handleSearch}
            style={{ width: 300 }}
          />
        </Col>
      </Row>

      <Table
        columns={columns}
        dataSource={paginatedData}
        rowKey="Apartmentno"
        pagination={{
          current: currentPage,
          total: totalPages,
          pageSize: 1, // Each page corresponds to one floor
          showSizeChanger: false,
          onChange: (page) => setCurrentPage(page),
          itemRender: (_, type, originalElement) => {
            if (type === 'page') {
              return <Button type={originalElement.props.className === 'ant-pagination-item-active' ? 'primary' : 'default'}>{originalElement.props.children}</Button>;
            }
            return originalElement;
          },
        }}
        bordered
        className={styles.apartmentTable}
      />

      <Modal
        title={`Update Apartment ${selectedApartment?.Apartmentno}`}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Update"
        cancelText="Cancel"
        centered
      >
        <Form form={form} layout="vertical" name="form_in_modal">
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select a status!' }]}
          >
            <Select placeholder="Select a status">
              <Option value="Active">Active</Option>
              <Option value="In Process">In Process</Option>
              <Option value="Booked">Booked</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="Type"
            label="Type"
            rules={[{ required: true, message: 'Please select the type!' }]}
          >
            <Select placeholder="Select type">
              <Option value="Studio">Studio</Option>
              <Option value="One Bed">One Bed</Option>
              <Option value="Two Bed">Two Bed</Option>
              <Option value="Penthouse">Penthouse</Option>
              {/* Add more types as needed */}
            </Select>
          </Form.Item>
          <Form.Item
            name="Bedrooms"
            label="Bedrooms"
            rules={[{ required: true, message: 'Please enter the number of bedrooms!' }]}
          >
            <Input type="number" min={0} />
          </Form.Item>
          <Form.Item
            name="Area"
            label="Area"
            rules={[{ required: true, message: 'Please enter the area!' }]}
          >
            <Input placeholder="e.g., 750 sqft" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ApartmentTable;
