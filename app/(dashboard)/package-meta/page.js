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

const data = [
  {
    id: 1,
    refnum: "1",
    name: "Muhammad Fayyaz",
    mobile: "+923136724374",
    username: "chaudhry",
    role: "Groom",
    byrole: "Self",
    byname: "Self",
    profilestatus: "01",
    status: "Active",
    action: "Action",
  },
  {
    id: 2,
    refnum: "2",
    name: "Chaudhry Fayyaz",
    mobile: "+923136724374",
    username: "chaudhry",
    role: "Groom",
    byrole: "Self",
    byname: "Self",
    profilestatus: "14",
    status: "Deactive",
    action: "Action",
  },
  {
    id: 3,
    refnum: "3",
    name: "Chaudhry Fayyaz",
    mobile: "+923136724374",
    username: "chaudhry",
    role: "Groom",
    byrole: "Self",
    byname: "Self",
    profilestatus: "02",
    status: "Active",
    action: "Action",
  },
  {
    id: 4,
    refnum: "4",
    name: "Chaudhry Fayyaz",
    mobile: "+923136724374",
    username: "chaudhry",
    role: "Groom",
    byrole: "Self",
    byname: "Self",
    profilestatus: "14",
    status: "Deactive",
    action: "Action",
  },
  {
    id: 5,
    refnum: "5",
    name: "Chaudhry Fayyaz",
    mobile: "+923136724374",
    username: "chaudhry",
    role: "Groom",
    byrole: "Self",
    byname: "Self",
    profilestatus: "07",
    status: "Active",
    action: "Action",
  },
  {
    id: 6,
    refnum: "6",
    name: "Chaudhry Fayyaz",
    mobile: "+923136724374",
    username: "chaudhry",
    role: "Groom",
    byrole: "Self",
    byname: "Self",
    profilestatus: "14",
    status: "Deactive",
    action: "Action",
  },

  {
    id: 7,
    refnum: "7",
    name: "Chaudhry Fayyaz",
    mobile: "+923136724374",
    username: "chaudhry",
    role: "Groom",
    byrole: "Self",
    byname: "Self",
    profilestatus: "14",
    status: "Deactive",
    action: "Action",
  },
  {
    id: 8,
    refnum: "8",
    name: "Chaudhry Fayyaz",
    mobile: "+923136724374",
    username: "chaudhry",
    role: "Groom",
    byrole: "Self",
    byname: "Self",
    profilestatus: "01",
    status: "Active",
    action: "Action",
  },
  {
    id: 9,
    refnum: "9",
    name: "Chaudhry Fayyaz",
    mobile: "+923136724374",
    username: "chaudhry",
    role: "Groom",
    byrole: "Self",
    byname: "Self",
    profilestatus: "14",
    status: "Deactive",
    action: "Action",
  },
  {
    id: 10,
    refnum: "10",
    name: "Chaudhry Fayyaz",
    mobile: "+923136724374",
    username: "chaudhry",
    role: "Groom",
    byrole: "Self",
    byname: "Self",
    profilestatus: "13",
    status: "Active",
    action: "Action",
  },
  {
    id: 11,
    refnum: "11",
    name: "Chaudhry Fayyaz",
    mobile: "+923136724374",
    username: "chaudhry",
    role: "Groom",
    byrole: "Self",
    byname: "Self",
    profilestatus: "14",
    status: "Deactive",
    action: "Action",
  },
  {
    id: 12,
    refnum: "12",
    name: "Chaudhry Fayyaz",
    mobile: "+923136724374",
    username: "chaudhry",
    role: "Groom",
    byrole: "Self",
    byname: "Self",
    profilestatus: "01",
    status: "Deactive",
    action: "Action",
  },
  {
    id: 13,
    refnum: "13",
    name: "Chaudhry Fayyaz",
    mobile: "+923136724374",
    username: "chaudhry",
    role: "Groom",
    byrole: "Self",
    byname: "Self",
    profilestatus: "01",
    status: "Active",
    action: "Action",
  },
  {
    id: 14,
    refnum: "14",
    name: "Chaudhry Fayyaz",
    mobile: "+923136724374",
    username: "chaudhry",
    role: "Groom",
    byrole: "Self",
    byname: "Self",
    profilestatus: "14",
    status: "Active",
    action: "Action",
  },
  {
    id: 15,
    refnum: "15",
    name: "Chaudhry Fayyaz",
    mobile: "+923136724374",
    username: "chaudhry",
    role: "Groom",
    byrole: "Self",
    byname: "Self",
    profilestatus: "01",
    status: "Deactive",
    action: "Action",
  },
  {
    id: 16,
    refnum: "16",
    name: "Chaudhry Fayyaz",
    mobile: "+923136724374",
    username: "chaudhry",
    role: "Groom",
    byrole: "Self",
    byname: "Self",
    profilestatus: "14",
    status: "Active",
    action: "Action",
  },
  {
    id: 17,
    refnum: "17",
    name: "Chaudhry Fayyaz",
    mobile: "+923136724374",
    username: "chaudhry",
    role: "Groom",
    byrole: "Self",
    byname: "Self",
    profilestatus: "01",
    status: "Active",
    action: "Action",
  },
  {
    id: 18,
    refnum: "18",
    name: "Chaudhry Fayyaz",
    mobile: "+923136724374",
    username: "chaudhry",
    role: "Groom",
    byrole: "Self",
    byname: "Self",
    profilestatus: "01",
    status: "Deactive",
    action: "Action",
  },
  {
    id: 19,
    refnum: "19",
    name: "Chaudhry Fayyaz",
    mobile: "+923136724374",
    username: "chaudhry",
    role: "Groom",
    byrole: "Self",
    byname: "Self",
    profilestatus: "01",
    status: "Active",
    action: "Action",
  },
  {
    id: 20,
    refnum: "20",
    name: "Chaudhry Fayyaz",
    mobile: "+923136724374",
    username: "chaudhry",
    role: "Groom",
    byrole: "Self",
    byname: "Self",
    profilestatus: "01",
    status: "Active",
    action: "Action",
  },
  {
    id: 21,
    refnum: "21",
    name: "Chaudhry Fayyaz",
    mobile: "+923136724374",
    username: "chaudhry",
    role: "Groom",
    byrole: "Self",
    byname: "Self",
    profilestatus: "01",
    status: "Deactive",
    action: "Action",
  },
  {
    id: 22,
    refnum: "22",
    name: "Chaudhry Fayyaz",
    mobile: "+923136724374",
    username: "chaudhry",
    role: "Groom",
    byrole: "Self",
    byname: "Self",
    profilestatus: "01",
    status: "Active",
    action: "Action",
  },
  {
    id: 23,
    refnum: "23",
    name: "Chaudhry Fayyaz",
    mobile: "+923136724374",
    username: "chaudhry",
    role: "Groom",
    byrole: "Self",
    byname: "Self",
    profilestatus: "01",
    status: "Active",
    action: "Action",
  },
  {
    id: 24,
    refnum: "24",
    name: "Chaudhry Fayyaz",
    mobile: "+923136724374",
    username: "chaudhry",
    role: "Groom",
    byrole: "Self",
    byname: "Self",
    profilestatus: "01",
    status: "Active",
    action: "Action",
  },
  {
    id: 25,
    refnum: "25",
    name: "Chaudhry Fayyaz",
    mobile: "+923136724374",
    username: "chaudhry",
    role: "Groom",
    byrole: "Self",
    byname: "Self",
    profilestatus: "01",
    status: "Active",
    action: "Action",
  },
  {
    id: 26,
    refnum: "26",
    name: "Chaudhry Fayyaz",
    mobile: "+923136724374",
    username: "chaudhry",
    role: "Groom",
    byrole: "Self",
    byname: "Self",
    profilestatus: "01",
    status: "Active",
    action: "Action",
  },
  {
    id: 27,
    refnum: "27",
    name: "Chaudhry Fayyaz",
    mobile: "+923136724374",
    username: "chaudhry",
    role: "Groom",
    byrole: "Self",
    byname: "Self",
    profilestatus: "01",
    status: "Active",
    action: "Action",
  },
  {
    id: 28,
    refnum: "28",
    name: "Chaudhry Fayyaz",
    mobile: "+923136724374",
    username: "chaudhry",
    role: "Groom",
    byrole: "Self",
    byname: "Self",
    profilestatus: "01",
    status: "Active",
    action: "Action",
  },
  {
    id: 29,
    refnum: "29",
    name: "Chaudhry Fayyaz",
    mobile: "+923136724374",
    username: "chaudhry",
    role: "Groom",
    byrole: "Self",
    byname: "Self",
    profilestatus: "01",
    status: "Active",
    action: "Action",
  },
  {
    id: 30,
    refnum: "30",
    name: "Chaudhry Fayyaz",
    mobile: "+923136724374",
    username: "chaudhry",
    role: "Groom",
    byrole: "Self",
    byname: "Self",
    profilestatus: "01",
    status: "Active",
    action: "Action",
  },
  {
    id: 31,
    refnum: "31",
    name: "Chaudhry Fayyaz",
    mobile: "+923136724374",
    username: "chaudhry",
    role: "Groom",
    byrole: "Self",
    byname: "Self",
    profilestatus: "01",
    status: "Active",
    action: "Action",
  },
  {
    id: 32,
    refnum: "32",
    name: "Chaudhry Fayyaz",
    mobile: "+923136724374",
    username: "chaudhry",
    role: "Groom",
    byrole: "Self",
    byname: "Self",
    profilestatus: "01",
    status: "Active",
    action: "Action",
  },
];
const selectCustomStyles = {

  option: (provided, state) => ({
    ...provided,
    cursor: 'pointer',
    padding: "8px 10px 10px 10px",
    backgroundColor: state.isFocused ? "#ca2d2c" : "white",
    ":hover": {
      backgroundColor: "#ca2d2c",
      color: "white",
    },
    backgroundColor: state.isSelected ? "#ca2d2c" : "white",
    fontWeight: 500,
    fontSize: "12px",
  }),
  control: (provided, state) => ({
    ...provided,
    cursor: 'pointer',
    backgroundColor: "white",
    border: "none",
    borderRadius: "0px",
    fontSize: "12px",
    fontWeight: "500",
    boxShadow: "none",
    "&:focus": {
      outline: "none",
    },
    ":hover": {
      outline: "none",
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#000000DE",
    fontWeight: 500,
    fontSize: "12px",
    paddingLeft: "0px",
  }),
  valueContainer: (provided) => ({
    ...provided,

    paddingLeft: "0px",
    fontWeight: 500,
    fontSize: "12px",
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: "black",
    marginRight: "0px",
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    display: "none",
  }),
};
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
const DropdownFilter = ({ options, placeholder, name, onFilterChange }) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleFilterChange = (selectedOption) => {
    setSelectedValue(selectedOption);
    onFilterChange(name, selectedOption.value);
  };

  return (
    typeof window !== "undefined" &&  <Select
      name={name}
      value={options.find((option) => option.value === selectedValue)}
      onChange={handleFilterChange}
      options={options.map((option) => ({ value: option, label: option }))}
      placeholder={placeholder}
      styles={selectCustomStyles}
      className="w-100"
      menuPortalTarget={document.body}
    />
  );
};

const Page = () => {

  const [modalTitle, setModalTitle] = useState('');
  const [btnLabel, setBtnLabel] = useState('');
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [filters, setFilters] = useState('');

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
        placeholder='Mobile No'
        name='mobile'
        onFilterChange={handleFilterChange}
      />,
      selector: (row) => row.mobile,
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
      width: "180px",
    },
    {

      name: <DropdownFilter
        placeholder='Role'
        name="role"
        options={["Role", "Groom", "Bride", "Admin", "User"]} // Replace with your actual role options
        onFilterChange={handleFilterChange}
      />,
      selector: (row) => row.role,
      //sortable: true,
      width: "130px",
    },
    {
      name: <DropdownFilter
        placeholder='Created by role'
        name="createdByRole"
        options={["Created by role", "Self", "Admin", "User"]} // Replace with your actual options
        onFilterChange={handleFilterChange}
      />,
      selector: (row) => row.byrole,
      //sortable: true,
      width: "180px",
    },
    {
      name: <DropdownFilter
        placeholder='Created by name'
        name='createdByName'
        options={["Created by name", "Self", "Admin", "User"]} // Replace with your actual options
        onFilterChange={handleFilterChange}
      />,
      selector: (row) => row.byname,
      //sortable: true,
      width: "200px",
    },
    {
      name: <FilterComponent
        placeholder='Profile status'
        name='profileStatus'
        onFilterChange={handleFilterChange}
      />,
      selector: (row) => row.profilestatus,
      //sortable: true,
      width: "140px",
      cell: (row) => (
        <Badge
          pill
          className={`${row.profilestatus == "14"
            ? "activeBadgeColor"
            : "deActiveBadgeColor"
            }`}
        >
          {" "}
          {row.profilestatus}
        </Badge>
      ),
    },
    {
      name:
        <DropdownFilter
          placeholder='Status'
          name="status"
          options={["Status", "Active", "Deactive"]} // Replace with your actual options
          onFilterChange={handleFilterChange}
        />,
      selector: (row) => row.status,
      //sortable: true,
      width: "162px",
      cell: (row) => (
        <Badge
          pill
          className={`w-75 ${row.status == "Deactive" ? "deActiveBadgeColor" : "activeBadgeColor"
            }`}
        >
          {" "}
          <li>{row.status}</li>
        </Badge>
      ),
    },
    {
      name: "Actions",

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
            src="/fonts/feather-icons/icons/edit.svg"
            width={15}
            height={15}
            className="cursor-pointer mx-2"
            alt="icon"
            onClick={() => {
              setIsOpenModal(true);
              setModalTitle('Edit User')
              setBtnLabel('Update')
            }}
          />
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
