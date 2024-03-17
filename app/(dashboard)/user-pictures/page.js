"use client"
import React, { useState, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Badge, Card, Form, Modal } from "react-bootstrap";
import Select from 'react-select';
import ExportTable from "../../components/ExportTable.js";
import UserRegisterModal from '../../components/UserRegisterModal.js';
const DataTable = dynamic(() => import('react-data-table-component'), {
  ssr: false,
});
import '../../globals.css';
const DEFAULT_SHOW_DATA = 25;
const customStyles = {
  option: (provided, state) => ({
    ...provided,
    whiteSpace: 'nowrap',
    cursor: "pointer",
    padding: "8px 10px 10px 10px",
    backgroundColor: state.isFocused ? "#ca2d2c" : "white",
    ":hover": {
      backgroundColor: "#f8f9fa",
      color: "black",
    },
    backgroundColor: state.isSelected ? "#ca2d2c" : "white",
    fontWeight: 500,
    fontSize: "16px",
  }),
  control: (provided) => ({
    ...provided,
    width:233,
    backgroundColor: "transparent",
    border: "none",
    borderRadius: "5px",
    fontSize: "13px",
    fontWeight: "500",
    border: "none",
    boxShadow: "none", // Remove box shadow
    "&:focus": {
      outline: "none", // Remove outline on focus
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#a29f9f",
    fontWeight: 500,
    fontSize: "16px",
  }),
  valueContainer: (provided) => ({
    ...provided,
    cursor: "pointer",
    fontWeight: 500,
    paddingLeft: "0px",
    fontSize: "16px",
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    cursor: "pointer",
    color: "#ca2d2c", // Change the color of the arrow
    border: "none",
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    display: "none", // Hide the indicator separator
  }),
};
const data = [
  {
    id: 1,
    refnum: "1",
    name: "Muhammad Fayyaz",
    mobile: "+923136724374",
    whatsApp: "+923136724374",
    username: 'Fayyaz',
    myPicture: "https://spk.shadi.pk/uploads/2023/10/up169611564520231001041405595.png",
    profilePicture: "https://spk.shadi.pk/uploads/2023/10/up169611564520231001041405595.png",
    action: "Action",

  },
  {
    id: 2,
    refnum: "2",
    name: "Muhammad Fayyaz",
    mobile: "+923136724374",
    whatsApp: "+923136724374",
    username: 'Fayyaz',
    myPicture: "https://spk.shadi.pk/uploads/2023/10/up169611564520231001041405595.png",
    profilePicture: "https://spk.shadi.pk/uploads/2023/10/up169611564520231001041405595.png",
    action: "Action",
  },
  {
    id: 3,
    refnum: "3",
    name: "Muhammad Fayyaz",
    mobile: "+923136724374",
    whatsApp: "+923136724374",
    username: 'Fayyaz',
    myPicture: "https://spk.shadi.pk/uploads/2023/10/up169611564520231001041405595.png",
    profilePicture: "https://spk.shadi.pk/uploads/2023/10/up169611564520231001041405595.png",
    action: "Action",
  },
  {
    id: 4,
    refnum: "4",
    name: "Muhammad Fayyaz",
    mobile: "+923136724374",
    whatsApp: "+923136724374",
    username: 'Fayyaz',
    myPicture: "https://spk.shadi.pk/uploads/2023/10/up169611564520231001041405595.png",
    profilePicture: "https://spk.shadi.pk/uploads/2023/10/up169611564520231001041405595.png",
    action: "Action",
  },
  {
    id: 5,
    refnum: "5",
    name: "Muhammad Fayyaz",
    mobile: "+923136724374",
    whatsApp: "+923136724374",
    username: 'Fayyaz',
    myPicture: "https://spk.shadi.pk/uploads/2023/10/up169611564520231001041405595.png",
    profilePicture: "https://spk.shadi.pk/uploads/2023/10/up169611564520231001041405595.png",
    action: "Action",
  },
  {
    id: 6,
    refnum: "6",
    name: "Muhammad Fayyaz",
    mobile: "+923136724374",
    whatsApp: "+923136724374",
    username: 'Fayyaz',
    myPicture: "https://spk.shadi.pk/uploads/2023/10/up169611564520231001041405595.png",
    profilePicture: "https://spk.shadi.pk/uploads/2023/10/up169611564520231001041405595.png",
    action: "Action",
  },

  {
    id: 7,
    refnum: "7",
    name: "Muhammad Fayyaz",
    mobile: "+923136724374",
    whatsApp: "+923136724374",
    username: 'Fayyaz',
    myPicture: "https://spk.shadi.pk/uploads/2023/10/up169611564520231001041405595.png",
    profilePicture: "https://spk.shadi.pk/uploads/2023/10/up169611564520231001041405595.png",
    action: "Action",
  },
  {
    id: 8,
    refnum: "8",
    name: "Muhammad Fayyaz",
    mobile: "+923136724374",
    whatsApp: "+923136724374",
    username: 'Fayyaz',
    myPicture: "https://spk.shadi.pk/uploads/2023/10/up169611564520231001041405595.png",
    profilePicture: "https://spk.shadi.pk/uploads/2023/10/up169611564520231001041405595.png",
    action: "Action",
  },
  {
    id: 9,
    refnum: "9",
    name: "Muhammad Fayyaz",
    mobile: "+923136724374",
    whatsApp: "+923136724374",
    username: 'Fayyaz',
    myPicture: "https://spk.shadi.pk/uploads/2023/10/up169611564520231001041405595.png",
    profilePicture: "https://spk.shadi.pk/uploads/2023/10/up169611564520231001041405595.png",
    action: "Action",
  },
  {
    id: 10,
    refnum: "10",
    name: "Muhammad Fayyaz",
    mobile: "+923136724374",
    whatsApp: "+923136724374",
    username: 'Fayyaz',
    myPicture: "https://spk.shadi.pk/uploads/2023/10/up169611564520231001041405595.png",
    profilePicture: "https://spk.shadi.pk/uploads/2023/10/up169611564520231001041405595.png",
    action: "Action",
  },
  {
    id: 11,
    refnum: "11",
    name: "Muhammad Fayyaz",
    mobile: "+923136724374",
    whatsApp: "+923136724374",
    username: 'Fayyaz',
    myPicture: "https://spk.shadi.pk/uploads/2023/10/up169611564520231001041405595.png",
    profilePicture: "https://spk.shadi.pk/uploads/2023/10/up169611564520231001041405595.png",
    action: "Action",
  },
  {
    id: 12,
    refnum: "12",
    name: "Muhammad Fayyaz",
    mobile: "+923136724374",
    whatsApp: "+923136724374",
    username: 'Fayyaz',
    myPicture: "https://spk.shadi.pk/uploads/2023/10/up169611564520231001041405595.png",
    profilePicture: "https://spk.shadi.pk/uploads/2023/10/up169611564520231001041405595.png",
    action: "Action",
  },
  {
    id: 13,
    refnum: "13",
    name: "Muhammad Fayyaz",
    mobile: "+923136724374",
    whatsApp: "+923136724374",
    username: 'Fayyaz',
    myPicture: "https://spk.shadi.pk/uploads/2023/10/up169611564520231001041405595.png",
    profilePicture: "https://spk.shadi.pk/uploads/2023/10/up169611564520231001041405595.png",
    action: "Action",
  },
  {
    id: 14,
    refnum: "14",
    name: "Muhammad Fayyaz",
    mobile: "+923136724374",
    whatsApp: "+923136724374",
    username: 'Fayyaz',
    myPicture: "https://spk.shadi.pk/uploads/2023/10/up169611564520231001041405595.png",
    profilePicture: "https://spk.shadi.pk/uploads/2023/10/up169611564520231001041405595.png",
    action: "Action",
  },
  {
    id: 15,
    refnum: "15",
    name: "Muhammad Fayyaz",
    mobile: "+923136724374",
    whatsApp: "+923136724374",
    username: 'Fayyaz',
    myPicture: "https://spk.shadi.pk/uploads/2023/10/up169611564520231001041405595.png",
    profilePicture: "https://spk.shadi.pk/uploads/2023/10/up169611564520231001041405595.png",
    action: "Action",
  },
  {
    id: 16,
    refnum: "16",
    name: "Muhammad Fayyaz",
    mobile: "+923136724374",
    whatsApp: "+923136724374",
    username: 'Fayyaz',
    myPicture: "https://spk.shadi.pk/uploads/2023/10/up169611564520231001041405595.png",
    profilePicture: "https://spk.shadi.pk/uploads/2023/10/up169611564520231001041405595.png",
    action: "Action",
  },
  {
    id: 17,
    refnum: "17",
    name: "Muhammad Fayyaz",
    mobile: "+923136724374",
    whatsApp: "+923136724374",
    username: 'Fayyaz',
    myPicture: "https://spk.shadi.pk/uploads/2023/10/up169611564520231001041405595.png",
    profilePicture: "https://spk.shadi.pk/uploads/2023/10/up169611564520231001041405595.png",
    action: "Action",
  },
  {
    id: 18,
    refnum: "18",
    name: "Muhammad Fayyaz",
    mobile: "+923136724374",
    whatsApp: "+923136724374",
    username: 'Fayyaz',
    myPicture: "https://spk.shadi.pk/uploads/2023/10/up169611564520231001041405595.png",
    profilePicture: "https://spk.shadi.pk/uploads/2023/10/up169611564520231001041405595.png",
    action: "Action",
  },
  {
    id: 19,
    refnum: "19",
    name: "Muhammad Fayyaz",
    mobile: "+923136724374",
    whatsApp: "+923136724374",
    username: 'Fayyaz',
    myPicture: "https://spk.shadi.pk/uploads/2023/10/up169611564520231001041405595.png",
    profilePicture: "https://spk.shadi.pk/uploads/2023/10/up169611564520231001041405595.png",
    action: "Action",
  },
  {
    id: 20,
    refnum: "20",
    name: "Muhammad Fayyaz",
    mobile: "+923136724374",
    whatsApp: "+923136724374",
    username: 'Fayyaz',
    myPicture: "https://spk.shadi.pk/uploads/2023/10/up169611564520231001041405595.png",
    profilePicture: "https://spk.shadi.pk/uploads/2023/10/up169611564520231001041405595.png",
    action: "Action",
  },
  {
    id: 21,
    refnum: "21",
    name: "Muhammad Fayyaz",
    mobile: "+923136724374",
    whatsApp: "+923136724374",
    username: 'Fayyaz',
    myPicture: "https://spk.shadi.pk/uploads/2023/10/up169611564520231001041405595.png",
    profilePicture: "https://spk.shadi.pk/uploads/2023/10/up169611564520231001041405595.png",
    action: "Action",
  },
  {
    id: 22,
    refnum: "22",
    name: "Muhammad Fayyaz",
    mobile: "+923136724374",
    whatsApp: "+923136724374",
    username: 'Fayyaz',
    myPicture: "https://spk.shadi.pk/uploads/2023/10/up169611564520231001041405595.png",
    profilePicture: "https://spk.shadi.pk/uploads/2023/10/up169611564520231001041405595.png",
    action: "Action",
  },
  {
    id: 23,
    refnum: "23",
    name: "Muhammad Fayyaz",
    mobile: "+923136724374",
    whatsApp: "+923136724374",
    username: 'Fayyaz',
    myPicture: "https://spk.shadi.pk/uploads/2023/10/up169611564520231001041405595.png",
    profilePicture: "https://spk.shadi.pk/uploads/2023/10/up169611564520231001041405595.png",
    action: "Action",
  },
  {
    id: 24,
    refnum: "24",
    name: "Muhammad Fayyaz",
    mobile: "+923136724374",
    whatsApp: "+923136724374",
    username: 'Fayyaz',
    myPicture: "https://spk.shadi.pk/uploads/2023/10/up169611564520231001041405595.png",
    profilePicture: "https://spk.shadi.pk/uploads/2023/10/up169611564520231001041405595.png",
    action: "Action",
  },
  {
    id: 25,
    refnum: "25",
    name: "Muhammad Fayyaz",
    mobile: "+923136724374",
    whatsApp: "+923136724374",
    username: 'Fayyaz',
    myPicture: "https://spk.shadi.pk/uploads/2023/10/up169611564520231001041405595.png",
    profilePicture: "https://spk.shadi.pk/uploads/2023/10/up169611564520231001041405595.png",
    action: "Action",
  },
  {
    id: 26,
    refnum: "26",
    name: "Muhammad Fayyaz",
    mobile: "+923136724374",
    whatsApp: "+923136724374",
    username: 'Fayyaz',
    myPicture: "https://spk.shadi.pk/uploads/2023/10/up169611564520231001041405595.png",
    profilePicture: "https://spk.shadi.pk/uploads/2023/10/up169611564520231001041405595.png",
    action: "Action",
  },
  {
    id: 27,
    refnum: "27",
    name: "Muhammad Fayyaz",
    mobile: "+923136724374",
    whatsApp: "+923136724374",
    username: 'Fayyaz',
    myPicture: "https://spk.shadi.pk/uploads/2023/10/up169611564520231001041405595.png",
    profilePicture: "https://spk.shadi.pk/uploads/2023/10/up169611564520231001041405595.png",
    action: "Action",
  },
  {
    id: 28,
    refnum: "28",
    name: "Muhammad Fayyaz",
    mobile: "+923136724374",
    whatsApp: "+923136724374",
    username: 'Fayyaz',
    myPicture: "https://spk.shadi.pk/uploads/2023/10/up169611564520231001041405595.png",
    profilePicture: "https://spk.shadi.pk/uploads/2023/10/up169611564520231001041405595.png",
    action: "Action",
  },
  {
    id: 29,
    refnum: "29",
    name: "Muhammad Fayyaz",
    mobile: "+923136724374",
    whatsApp: "+923136724374",
    username: 'Fayyaz',
    myPicture: "https://spk.shadi.pk/uploads/2023/10/up169611564520231001041405595.png",
    profilePicture: "https://spk.shadi.pk/uploads/2023/10/up169611564520231001041405595.png",
    action: "Action",
  },
  {
    id: 30,
    refnum: "30",
    name: "Muhammad Fayyaz",
    mobile: "+923136724374",
    whatsApp: "+923136724374",
    username: 'Fayyaz',
    myPicture: "https://spk.shadi.pk/uploads/2023/10/up169611564520231001041405595.png",
    profilePicture: "https://spk.shadi.pk/uploads/2023/10/up169611564520231001041405595.png",
    action: "Action",
  },
  {
    id: 31,
    refnum: "31",
    name: "Muhammad Fayyaz",
    mobile: "+923136724374",
    whatsApp: "+923136724374",
    username: 'Fayyaz',
    myPicture: "https://spk.shadi.pk/uploads/2023/10/up169611564520231001041405595.png",
    profilePicture: "https://spk.shadi.pk/uploads/2023/10/up169611564520231001041405595.png",
    myPicture: "https://spk.shadi.pk/uploads/2023/10/up169611564520231001041405595.png",
    profilePicture: "https://spk.shadi.pk/uploads/2023/10/up169611564520231001041405595.png",
    action: "Action",
  },
  {
    id: 32,
    name: "Muhammad Fayyaz",
    mobile: "+923136724374",
    whatsApp: "+923136724374",
    username: 'Fayyaz',
    myPicture: "https://spk.shadi.pk/uploads/2023/10/up169611564520231001041405595.png",
    profilePicture: "https://spk.shadi.pk/uploads/2023/10/up169611564520231001041405595.png",
    action: "Action",
  },
];

const tableCustomStyles = {
  rows: {
    style: {
      paddingTop: 15,
      paddingBottom: 15,
    },
  },
  headCells: {
    style: {
      paddingTop: 15,
      paddingBottom: 15,
    },
  },
};
const FilterComponent = ({ placeholder, name, onFilterChange }) => {
  const [filterValue, setFilterValue] = useState("");

  const handleFilterChange = (event) => {
    const newValue = event.target.value;
    setFilterValue(newValue);
    onFilterChange(name, newValue);
  };

  return (
    <div className="input-group table m-0">
      <Form.Control
        type="text"
        name={name}
        placeholder={placeholder}
        value={filterValue}
        onChange={handleFilterChange}
        className="shadow-none border-1 border-white ps-1 my-0 w-25 fs-12 fw-500"
      />
    </div>
  );
};


const Page = () => {

  const [modalTitle, setModalTitle] = useState('');
  const [btnLabel, setBtnLabel] = useState('');
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [filters, setFilters] = useState('');

  const [options, setOptions] = useState([
    { value: 1, label: 'Picture waring reasons' },
    { value: 2, label: 'Picture waring reasons' },
    { value: 3, label: 'Unethical value' },
    { value: 4, label: 'Graphically not good' },
  ]);


  const handleFilterChange = (name, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
    console.log('filterValue', filters);
  };
  
  const columns = [
    {
      name: "#",
      selector: (row) => row.refnum,
      width: "60px",
    },
    {
      name: <FilterComponent
        placeholder='Name'
        name='name'
        onFilterChange={handleFilterChange}
      />,
      selector: (row) => row.name,
      //sortable: true,
      width: "180px",
      wrap: true,
    },
    {
      name: <FilterComponent
        placeholder='Mobile No.'
        name='mobile'
        onFilterChange={handleFilterChange}
      />,
      selector: (row) => row.mobile,
      //sortable: true,
      width: "180px",
    },
    {
      name: <FilterComponent
        placeholder='WhatsApp No.'
        name='whatsApp'
        onFilterChange={handleFilterChange}
      />,
      selector: (row) => row.whatsApp,
      //sortable: true,
      width: "180px",
    },

    {
      name: <FilterComponent
        placeholder='Username'
        name='username'
        onFilterChange={handleFilterChange}
      />,
      selector: (row) => row.username,
      //sortable: true,
      width: "140px",

    },
    {
      name: 'Profile Pictures',
      cell: (row) => (
        <div cl>
          <Image
            src="/fonts/feather-icons/icons/trash-2.svg"
            width={15}
            height={15}
            className="cursor-pointer mx-2"
            alt="icon"
          // onClick={()=>setLgShow(true)}
          />
          <Image
            src={row.profilePicture}
            width={100}
            height={100}
            className="cursor-pointer mx-2"
            alt="icon"

          />
        </div>
      ),
      //sortable: true,
      width: "140px",

    },
    {
      name: 'My Pictures',
      cell: (row) => (
        <div cl>
          <Image
            src="/fonts/feather-icons/icons/trash-2.svg"
            width={15}
            height={15}
            className="cursor-pointer mx-2"
            alt="icon"
          // onClick={()=>setLgShow(true)}
          />
          <Image
            src={row.myPicture}
            width={100}
            height={100}
            className="cursor-pointer mx-2"
            alt="icon"

          />
        </div>
      ),
      //sortable: true,
      width: "140px",

    },

    {
      name: "Pictures Warning",
      width: "250px",
      cell: (row) => (
        <div >

        { typeof window !== "undefined" &&   <Select
            placeholder="Please Choose"
            options={options}
            styles={customStyles}
            // value={selectedMainProfileFor}
            isSearchable={true}
            // onChange={(selected) => {
            //     setSelectedMainProfileFor(selected);
            // }}
            className="w-100"
            menuPortalTarget={document.body}
          />}
        </div>
      ),

    },
  ];
  const handleCloseModal = () => {
    setIsOpenModal(false);
  };
  const paginationDropValues = [25, 50, 100, 250, 500];
  const actionsMemo = useMemo(() => (
    <>
      {/* <Image
        src="/fonts/feather-icons/icons/clear-filter.svg"
        alt="clear filter icon"
        width={20}
        height={20}
        className="me-3 cursor-pointer"
        onClick={() => setFilters(()=>{})}
      /> */}
      <Image
        src="/fonts/feather-icons/icons/user-plus.svg"
        alt="add icon"
        width={20}
        height={20}
        className="me-3 cursor-pointer"
        onClick={() => {
          setModalTitle('Add User')
          setBtnLabel('Submit')
          setIsOpenModal(true);
        }}
      />
      <ExportTable data={data} />
    </>
  ), []);

  return (
    <>
      <Card className="mt-5 mx-1 p-2">
        <DataTable
          title="All Users"
          responsive
          striped
          highlightOnHover
          columns={columns}
          persistTableHead={true}
          data={data}
          pagination
          dense
          fixedHeader
          customStyles={tableCustomStyles}
          paginationRowsPerPageOptions={paginationDropValues}
          paginationPerPage={DEFAULT_SHOW_DATA}
          fixedHeaderScrollHeight="68vh"
          actions={actionsMemo}
        />

      </Card>
      <UserRegisterModal
        isOpenModal={isOpenModal}
        handleCloseModal={handleCloseModal}
        modalTitle={modalTitle}
        btnLabel={btnLabel}
      />

    </>

  );
};



export default Page;
