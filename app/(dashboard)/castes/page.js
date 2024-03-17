"use client"
import React, { useState, useMemo, useEffect } from "react";
import { MantineReactTable } from "mantine-react-table";
import Image from "next/image";
import ExportTable from "../../components/ExportTable.js";
import { Badge, Card, Form, Modal } from "react-bootstrap";
import Select from 'react-select';
import FormField from '../../components/Formfield.js'
import '../../globals.css';
const Table = () => {
  const [userStatus, setUserStatus] = useState('active');
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [filters, setFilters] = useState('');
 
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
      marginTop: "-14px"

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
      typeof window !== "undefined"  && (
        <Select
          name={name}
          value={options.find((option) => option.value === selectedValue)}
          onChange={handleFilterChange}
          options={options.map((option) => ({ value: option, label: option }))}
          placeholder={placeholder}
          styles={selectCustomStyles}
          menuPortalTarget={document.body}
        />
      )
    );
  };
  const handleFilterChange = (name, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
    console.log('filterValue', filters);
  };
  const [data, setData] = useState([
    {
      id: 1,
      refnum: "1",
      orderID:'1',
      title: "Muhammad Fayyaz" ,

      status: "Active",
      action: "Action"

      ,
    },
    {
      id: 2,
      refnum: "2",
      orderID:'2',
      title: "Chaudhry Fayyaz",

      status: 'Active',
      action: "Action"

      ,
    },
    {
      id: 3,
      refnum: "3",
      orderID:'3',
     title: "Chaudhry Fayyaz",

      status: "Active",
      action: "Action"

      ,
    },
    {
      id: 4,
      refnum: "4",
      orderID:'4',
     title: "Chaudhry Fayyaz",

      status: "Deactive",
      action: "Action"

      ,
    },
    {
      id: 5,
      refnum: "5",
      orderID:'5',
     title: "Chaudhry Fayyaz",

      status: "Active",
      action: "Action"

      ,
    },
    {
      id: 6,
      refnum: "6",
      orderID:'6',
     title: "Chaudhry Fayyaz",

      status: "Deactive",
      action: "Action"

      ,
    },

    {
      id: 7,
      refnum: "7",
      orderID:'7',
     title: "Chaudhry Fayyaz",

      status: "Deactive",
      action: "Action"

      ,
    },
    {
      id: 8,
      refnum: "8",
      orderID:'8',
     title: "Chaudhry Fayyaz",

      status: "Active",
      action: "Action"

      ,
    },
    {
      id: 9,
      refnum: "9",
      orderID:'9',
     title: "Chaudhry Fayyaz",

      status: "Deactive",
      action: "Action"

      ,
    },
    {
      id: 10,
      refnum: "10",
      orderID:'10',
     title: "Chaudhry Fayyaz",

      status: "Active",
      action: "Action"

      ,
    },
    {
      id: 11,
      refnum: "11",
      orderID:'11',
     title: "Chaudhry Fayyaz",

      status: "Deactive",
      action: "Action"

      ,
    },
    {
      id: 12,
      refnum: "12",
      orderID:'12',
     title: "Chaudhry Fayyaz",

      status: "Deactive",
      action: "Action"

      ,
    },
    {
      id: 13,
      refnum: "13",
      orderID:'13',
     title: "Chaudhry Fayyaz",

      status: "Active",
      action: "Action"

      ,
    },
    {
      id: 14,
      refnum: "14",
      orderID:'14',
     title: "Chaudhry Fayyaz",

      status: "Active",
      action: "Action"

      ,
    },
    {
      id: 15,
      refnum: "15",
      orderID:'15',
     title: "Chaudhry Fayyaz",

      status: "Deactive",
      action: "Action"

      ,
    },
    {
      id: 16,
      refnum: "16",
      orderID:'16',
     title: "Chaudhry Fayyaz",

      status: "Active",
      action: "Action"

      ,
    },
    {
      id: 17,
      refnum: "17",
      orderID:'17',
     title: "Chaudhry Fayyaz",

      status: "Active",
      action: "Action"

      ,
    },
    {
      id: 18,
      refnum: "18",
      orderID:'18',
     title: "Chaudhry Fayyaz",

      status: "Deactive",
      action: "Action"

      ,
    },
    {
      id: 19,
      refnum: "19",
      orderID:'19',
     title: "Chaudhry Fayyaz",

      status: "Active",
      action: "Action"

      ,
    },
    {
      id: 20,
      refnum: "20",
      orderID:'1',
     title: "Chaudhry Fayyaz",

      status: "Active",
      action: "Action"

      ,
    },
    {
      id: 21,
      refnum: "21",
      orderID:'1',
      

     title: "Chaudhry Fayyaz",

      status: "Deactive",
      action: "Action"

      ,
    },
    {
      id: 22,
      refnum: "22",
      orderID:'1',

     title: "Chaudhry Fayyaz",

      status: "Active",
      action: "Action"

      ,
    },
    {
      id: 23,
      refnum: "23",
      orderID:'1',

     title: "Chaudhry Fayyaz",

      status: "Active",
      action: "Action"

      ,
    },
    {
      id: 24,
      refnum: "24",
      orderID:'1',

     title: "Chaudhry Fayyaz",

      status: "Active",
      action: "Action"

      ,
    },
    {
      id: 25,
      refnum: "25",
      orderID:'1',

     title: "Chaudhry Fayyaz",

      status: "Active",
      action: "Action"

      ,
    },
    {
      id: 26,
      refnum: "26",
      orderID:'1',

     title: "Chaudhry Fayyaz",

      status: "Active",
      action: "Action"

      ,
    },
    {
      id: 27,
      refnum: "27",
      orderID:'1',

     title: "Chaudhry Fayyaz",

      status: "Active",
      action: "Action"

      ,
    },
    {
      id: 28,
      refnum: "28",
      orderID:'1',

     title: "Chaudhry Fayyaz",

      status: "Active",
      action: "Action"

      ,
    },
    {
      id: 29,
      refnum: "29",
      orderID:'1',

     title: "Chaudhry Fayyaz",

      status: "Active",
      action: "Action"

      ,
    },
    {
      id: 30,
      orderID:'1',

      refnum: "30",
     title: "Chaudhry Fayyaz",

      status: "Active",
      action: "Action"

      ,
    },
    {
      id: 31,
      orderID:'1',

      refnum: "31",
     title: "Chaudhry Fayyaz",

      status: "Active",
      action: "Action"

      ,
    },
    {
      id: 32,
      orderID:'1',

      refnum: "32",
     title: "Chaudhry Fayyaz",

      status: "Active",
      action: "Action"

      ,
    },
  ]);
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
        size:100
      },
      {
        accessorKey: "orderID",
        header: (
          <FilterComponent
            placeholder='Order ID'
            name='orderID'
            onFilterChange={handleFilterChange}
          />
        ),
        size:100
      },
      {
        accessorKey: "title",
        header: (
          <FilterComponent
            placeholder='Title'
            name='title'
            onFilterChange={handleFilterChange}
          />
        ),
       
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
            className={`w-50  ${row.original.status === "Deactive" ? "deActiveBadgeColor" : "activeBadgeColor"
              }`}
          >
            <li>{row.original.status}</li>
          </Badge>
        </div>
          
        ),
      },
      {
        accessorKey: "action",
        header: 'Action',
        Cell: ({ row }) => (
          <div >
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
              }}
            />
          </div>
        ),
      },
      
    ],
    []
  );

  return (
    <>
      <Card className="mt-5 mx-5">
        <div className="row my-4">
          <div className="col-6">
            <h4 className="ms-3 ">Castes List</h4>
          </div>
          <div className="col-6 text-end">
            <Image
              src="/fonts/feather-icons/icons/user-plus.svg"
              alt="add icon"
              width={20}
              height={20}
              className="me-3 cursor-pointer"
              onClick={() => {
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
          enableRowOrdering
          enableSorting={false}
          enableFiltering={false}
          showSearch={false}
          showColumnToggle={false}
          showFilterButton={false}
          enableStickyHeader={false}
          mantineTableProps={{
            striped: true,
          }}
          positionActionsColumn={'last'}
          mantinePaginationProps={{
            rowsPerPageOptions: ['25', '50', '100', '250', '500'],

          }}
         

          showSkeletons={true}
          initialState={{
            // columnOrder: [
            //   'refnum',
            //   'title',
            //   'status',
            //   'orderID',
            //   'action',
            
            // ],

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
      <Modal size="md" show={isOpenModal} onHide={() => setIsOpenModal(!isOpenModal)} aria-labelledby="example-modal-sizes-title-lg" >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Add Caste
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>

            <FormField
              label={
                <>
                  Title
                  <sup className="spk-red-color">
                    *
                  </sup>
                </>
              }
              value={
                <input
                  type="text"
                  className="form-control mt-2 ps-0 shadow-none rounded-0 border-0 fw-500 fs-16"
                  id="first-name-input"
                  name="first-name-input"
                  placeholder="Enter Caste Name"
                //  value={firstName}
                //  onChange={(e) =>
                //      handleFirstNameChange(e)
                //  }
                />
              }
              icon={"icon-profile"}
              iconPath={4}
            />
                  <FormField
                            label={
                                <>
                                    Status
                                    <sup className="spk-red-color">*</sup>
                                </>
                            }
                            value={
                                <div className="d-flex justify-content-start flex-wrap mt-3 ">

                                    <div className="m-1">
                                        <button
                                            type="button"
                                            className={`"pill-btn-font fw-500 fs-11 btn border-0 rounded px-4 py-2 btn-light ${userStatus == 'active'
                                                ? "spk-background-red-color"
                                                : null
                                                }  rounded-pill`}
                                            onClick={() =>
                                                setUserStatus('active')
                                            }
                                        >
                                            Active
                                        </button>

                                    </div>
                                    <div className="m-1">
                                        <button
                                            type="button"
                                            className={`"pill-btn-font fw-500 fs-11 btn border-0 rounded px-4 py-2 btn-light ${userStatus == 'deactive'
                                                ? "spk-background-red-color"
                                                : null
                                                }  rounded-pill`}
                                            onClick={() =>
                                                setUserStatus('deactive')
                                            }
                                        >
                                            Deactive
                                        </button>

                                    </div>
                                </div>
                            }
                            icon={"icon-lock"}
                            iconPath={2}
                            removeBorder={true}
                        />

            <div className="form-group my-5 ">
              <button
                className="border-0 rounded p-2 text-white w-100 fs-15 fw-400"
                //  onClick={() => register()}
                type="button"
              >
                {/* {loader ? (
                     <div
                         className="spinner-border spinner-border-sm fs-12 text-light"
                         role="status"
                     ></div>
                 ) : (
                     btnLabel
                 )} */}
                Submit
              </button>
              {/* </Link> */}
            </div>
          </>
        </Modal.Body>
      </Modal>
    </>
  );

};

export default Table;
