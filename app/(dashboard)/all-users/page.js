"use client"
import React, { useState, useMemo, useEffect } from "react";
import { MantineReactTable } from "mantine-react-table";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Badge, Card, Form, Modal } from "react-bootstrap";
import Select from 'react-select';
import ExportTable from "../../components/ExportTable.js";
import UserRegisterModal from '../../components/UserRegisterModal.js';

import '../../globals.css';

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
    fontWeight: 600,
    fontSize: "14px",
  }),
  control: (provided, state) => ({
    ...provided,
    cursor: 'pointer',
    backgroundColor: "white",
    border: "none",
    borderRadius: "0px",
    fontSize: "14px",
    fontWeight: "600",
    boxShadow: "none",
    "&:focus": {
      outline: "none",
    },
    paddingTop: "-10px",
    ":hover": {
      outline: "none",
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#495057",
    fontWeight: 600,
    fontSize: "14px",
    paddingLeft: "0px",
    paddingTop: "-10px",
  }),
  valueContainer: (provided) => ({
    ...provided,

    paddingLeft: "0px",
    fontWeight: 600,
    fontSize: "14px",
    paddingTop: "0px",
    marginTop: "-14px",
    width:127
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: "black",
    marginRight: "0px",
    paddingTop: "0px",
    marginTop: "-5px"
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    display: "none",
  }),
};




const Page = () => {

  const [modalTitle, setModalTitle] = useState('');
  const [btnLabel, setBtnLabel] = useState('');
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [filters, setFilters] = useState('');
  const [data, setData] = useState([
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
    ]
  );

  const FilterComponent = ({ placeholder, name, onFilterChange }) => {
    const [filterValue, setFilterValue] = useState("");
  
    const handleFilterChange = (event) => {
      const newValue = event.target.value;
      setFilterValue(newValue);
      onFilterChange(name, newValue);
    };
  
    return (
      <div className="input-group table m-0 ">
        <Form.Control
          type="text"
          name={name}
          placeholder={placeholder}
          value={filterValue}
          onChange={handleFilterChange}
          className="shadow-none border-1 border-white ps-1 my-0 pt-0 w-25 fs-14 fw-600"
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
      typeof window !== "undefined" && 
      <Select
        name={name}
        value={options.find((option) => option.value === selectedValue)}
        onChange={handleFilterChange}
        options={options.map((option) => ({ value: option, label: option }))}
        placeholder={placeholder}
        styles={selectCustomStyles}
        menuPortalTarget={document.body}
      />
    );
  };
  const handleFilterChange = (name, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
    console.log('filterValue', filters);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "refnum",
        header: (
          <FilterComponent
            placeholder='#'
            name='id'
            onFilterChange={handleFilterChange}
          />
        ),
        mantineTableHeadCellProps: {
          align: 'center',
        },
        mantineTableBodyCellProps: {
          align: 'center',
        },
        size:120
      },
     
      // {
      //   accessorKey: "orderID",
      //   header: (
      //     <FilterComponent
      //       placeholder='Order ID'
      //       name='orderID'
      //       onFilterChange={handleFilterChange}
      //     />
      //   ),
      //   size:100
      // },
      {
        accessorKey: "name",
        header: (
          <FilterComponent
          placeholder='Name'
          name='name'
          onFilterChange={handleFilterChange}
        />
        ),
        size:180
      },
      {
        accessorKey: "mobile",
      header: (
        <FilterComponent
        placeholder='Mobile No'
        name='mobile'
        onFilterChange={handleFilterChange}
      />
      ),
      size:180
      },
      {
        accessorKey: "username",
      header: (
        <FilterComponent
        placeholder='Username'
        name='username'
        onFilterChange={handleFilterChange}
      />
      ),
      size:180
      },
      {
        accessorKey: "role",
      header: (
        <DropdownFilter
        placeholder='Role'
        name="role"
        options={["Role", "Groom", "Bride", "Admin", "User"]} // Replace with your actual role options
        onFilterChange={handleFilterChange}
      />
      ),
      size:130
      },
      {
        accessorKey: "byrole",
      header: (
        <DropdownFilter
        placeholder='Created by role'
        name="createdByRole"
        options={["Created by role", "Self", "Admin", "User"]} // Replace with your actual options
        onFilterChange={handleFilterChange}
      />
      ),
      size:200
      },
      {
        accessorKey: "byname",
      header: (
        <DropdownFilter
        placeholder='Created by name'
        name='createdByName'
        options={["Created by name", "Self", "Admin", "User"]} // Replace with your actual options
        onFilterChange={handleFilterChange}
      />
      ),
      size:200
      },
      {
      accessorKey: "profileStatus",
      header: (
        <FilterComponent
        placeholder='Profile status'
        name='profileStatus'
        onFilterChange={handleFilterChange}
      />
      ),
      
      Cell: ({ row }) => (
        <Badge
          pill
          className={`${row.original.profilestatus == "14"
            ? "activeBadgeColor"
            : "deActiveBadgeColor"
            }`}
        >
          {" "}
          {row.original.profilestatus}
        </Badge>
     
        
      ),
      size:160
      },
    
      {
        accessorKey: "status",
        header: (
          <DropdownFilter
          placeholder='Status'
          name="status"
          options={["Status", "Active", "Deactive"]} // Replace with your actual options
          onFilterChange={handleFilterChange}
        />
        ),
        Cell: ({ row }) => (
          <div className="form-check form-switch">
          <input className="form-check-input border-secondary  shadow-none cursor-pointer" type="checkbox" id="flexSwitchCheckChecked"
           
          />
         <Badge
            pill
            className={`w-100  ${row.original.status === "Deactive" ? "deActiveBadgeColor" : "activeBadgeColor"
              }`}
          >
            <li>{row.original.status}</li>
          </Badge>
        </div>
          
        ),
        size:160
      },
      {
        accessorKey: "action",
        header: 'Action',
        mantineTableHeadCellProps: {
          align: 'center',
        },
        mantineTableBodyCellProps: {
          align: 'center',
        },
        Cell: ({ row }) => (
          <div >
          <Image
            src="/fonts/feather-icons/icons/trash-2.svg"
            width={15}
            height={15}
            className="cursor-pointer "
            alt="icon"
          // onClick={()=>setLgShow(true)}
          />
          <Image
            src="/fonts/feather-icons/icons/edit.svg"
            width={15}
            height={15}
            className="cursor-pointer ms-2"
            alt="icon"
            onClick={() => {
              setIsOpenModal(true);
              setModalTitle('Edit User')
              setBtnLabel('Update')
            }}
          />
        </div>
        ),
        size:160
      },
      
    ],
    []
  );


  return (
    <>
       <Card className="mt-5 mx-5">
        <div className="row my-4">
          <div className="col-6">
            <h4 className="ms-3 ">Users List</h4>
          </div>
          <div className="col-6 text-end">
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
          </div>
        </div>
        <MantineReactTable
          autoResetPageIndex={false}
          columns={columns}
          data={data}
          enablePinning= {true}
          // enableRowOrdering
          enableSorting={false}
          enableFiltering={false}
          showSearch={false}
          showColumnToggle={false}
          showFilterButton={false}
          enableStickyHeader={true}
          mantineTableProps={{
            striped: true,
          }}
       
          mantinePaginationProps={{
            rowsPerPageOptions: ['25', '50', '100', '250', '500'],

          }}
         
          mantineTableContainerProps= {{ sx: { maxHeight: '68vh' } }}
          initialState={{
            // columnOrder: [
            //   'refnum',
            //   'title',
            //   'status',
            //   'orderID',
            //   'action',
            // 'mrt-row-select'
            // ],
            columnPinning: {
              right: ['action'], //pin built-in row actions display column to right by default
            },

            pagination: { pageIndex: 0, pageSize: 25 }, //set different default page size
          }}
          mantineRowDragHandleProps={({ table }) => ({
            onDragEnd: () => {
              const { draggingRow, hoveredRow } = table.getState();
              if (hoveredRow && draggingRow) {
                data.splice(
                  hoveredRow.index,
                  0,
                  data.splice(draggingRow.index, 1)[0]
                );
                setData([...data]);
              }
            },
          })}
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
