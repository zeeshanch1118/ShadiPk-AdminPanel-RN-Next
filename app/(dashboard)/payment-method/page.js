"use client";
import React, { useState, useMemo, useEffect } from "react";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import Image from "next/image";
import { Badge, Card, Form, Modal } from "react-bootstrap";
import Select from "react-select";
import ExportTable from "../../components/ExportTable.js";
import FormField from "../../components/Formfield.js";
import uploadIcon from "../../../public/fonts/feather-icons/icons/uploadIcon.svg";
import crossIcon from "../../../public/fonts/feather-icons/icons/crossIcon.svg";
import {
   showAlert,
   showConfirmationAlert,
   showToast,
} from "../../helper/alerts";
import { ProfileImageComposer } from "../../helper/Images.js";
import { requiredFields } from "../../helper";

import { getCategories } from "../../api/payment-method-category/index.js";
import {
   getPaymentMethods,
   addUpdatePaymentMethod,
   TrashPaymentMethod,
} from "../../api/payment-method/index.js";
import { CheckAuth } from "../../components/CheckAuth.js";
import "../../globals.css";
import { useRouter } from "next/navigation.js";

const selectCustomStyles = {
   option: (provided, state) => ({
      ...provided,
      cursor: "pointer",
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
      cursor: "pointer",
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
      width: 127,
   }),
   dropdownIndicator: (provided) => ({
      ...provided,
      color: "black",
      marginRight: "0px",
      paddingTop: "0px",
      marginTop: "-5px",
   }),
   indicatorSeparator: (provided) => ({
      ...provided,
      display: "none",
   }),
};
const customStyles = {
   option: (provided, state) => ({
      ...provided,
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

      backgroundColor: "white",
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
      paddingTop: "9px",
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

const Page = () => {
   const [imageDB, setImageDB] = useState(null);
   const [selectedImage, setSelectedImage] = useState(null);
   const [modalTitle, setModalTitle] = useState("");
   const [categoryStatus, setCategoryStatus] = useState("active");
   const [title, setTitle] = useState("");
   const [type, setType] = useState("");
   const [description, setDescription] = useState("");
   const [orderID, setOrderID] = useState("");
   const [btnLabel, setBtnLabel] = useState("");
   const [isOpenModal, setIsOpenModal] = useState(false);
   const [filters, setFilters] = useState("");
   const [loader, setLoader] = useState(true);
   const [toggleLoader, setToggleLoader] = useState(false);
   const [categories, setCategories] = useState([]);
   const [selectedCategory, setSelectedCategory] = useState(null);
   const authResult = CheckAuth();
   const [token, setToken] = useState("");
   const [mainLoader, setMainLoader] = useState(true);
   const [paymentMethodID, setPaymentMethodID] = useState("");
   const [data, setData] = useState([]);
   const [pagination, setPagination] = useState({
      pageIndex: 0,
      pageSize: 25,
   });
   const [totalPages, setTotalPages] = useState(1);
   const router = useRouter();

 
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
         typeof window !== "undefined" && (
            <Select
               name={name}
               value={options.find((option) => option.value === selectedValue)}
               onChange={handleFilterChange}
               options={options.map((option) => ({
                  value: option,
                  label: option,
               }))}
               placeholder={placeholder}
               styles={selectCustomStyles}
               menuPortalTarget={document.body}
            />
         )
      );
   };
   useEffect(() => {
      console.log("filters", filters);
      console.log("dddddddddddddddddddddddddddddddddddddddd", pagination);
      getAllPaymentMethods(
         pagination?.pageIndex,
         filters?.title,
         filters?.description,
         filters?.category,
         filters?.status,
         pagination?.pageSize
      );

      //  const fetchData = async () => {
      //     if (!data.length) {
      //        setIsLoading(true);
      //     } else {
      //        setIsRefetching(true);
      //     }

      //     const url = new URL(
      //        "/api/data",
      //        "https://www.mantine-react-table.com"
      //     );
      //     url.searchParams.set(
      //        "start",
      //        `${pagination.pageIndex * pagination.pageSize}`
      //     );
      //     url.searchParams.set("size", `${pagination.pageSize}`);
      //     url.searchParams.set("filters", JSON.stringify(columnFilters ?? []));
      //     url.searchParams.set("globalFilter", globalFilter ?? "");
      //     url.searchParams.set("sorting", JSON.stringify(sorting ?? []));

      //     try {
      //        const response = await fetch(url.href);
      //        console.log("object", response);
      //        const json = await response.json();
      //        setData(json.data);
      //        setRowCount(json.meta.totalRowCount);
      //     } catch (error) {
      //        setIsError(true);
      //        console.error(error);
      //        return;
      //     }
      //     setIsError(false);
      //     setIsLoading(false);
      //     setIsRefetching(false);
      //  };
      //  fetchData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [
      //refetch when global filter changes
      filters,
      pagination?.pageIndex,
      pagination?.pageSize,
   ]);
   useEffect(() => {
      if (authResult?.isAuthenticated) {
         setMainLoader(false);

         setToken(() => authResult?.token);
         getAllCategories();
         //  getAllPaymentMethods();
      } else {
         router.push("/");
      }
   }, []);
   const addBtnFun = () => {
      setSelectedCategory(null);
      setSelectedImage("");
      setCategoryStatus("active");
      setTitle("");
      setDescription("");
      setOrderID("");
      setModalTitle("Add Category");
      setBtnLabel("Submit");
      setIsOpenModal(true);
      setType("add"), setPaymentMethodID("");
   };
   const updateBtnFun = (rowData) => {
      setSelectedCategory({
         value: rowData.categoryID,
         label: rowData.category,
      });
      setSelectedImage(rowData.img);
      setCategoryStatus(rowData.status);
      setTitle(rowData.title);
      setDescription(rowData.description);
      setOrderID(rowData.orderID);
      setIsOpenModal(true);
      setModalTitle("Edit Payment Method");
      setBtnLabel("Update");
      setType("update");
      setPaymentMethodID(rowData.refnum);
   };
   const updateByToggleFun = async (rowData, status) => {
      console.log("updateByToggleFun", rowData, status);
      try {
         setToggleLoader(true);

         const result = await addUpdatePaymentMethod(
            token,
            rowData.title,
            rowData.description,
            rowData.img,
            status,
            rowData.orderID,
            "update",
            rowData.categoryID,
            rowData.refnum
         );
         const jsonString = result;
         const jsonObject = JSON.parse(jsonString);
         console.log("jsgafhdhamfsdlhfasd", jsonObject);
         if (jsonObject?.status == true) {
            getAllPaymentMethods();
            setToggleLoader(false);
            // showToast(
            //   'Updated Category successfully',
            //   "success",
            //   "top-end"
            // );
         } else {
            setLoader(false);
            if (jsonObject?.errors) {
               showToast(requiredFields, "error", "top-start");
            } else {
               showToast(jsonObject.message, "error", "top-start");
            }
         }
      } catch (error) {
         console.log("error", error);
      }
   };
   const confirmationForTrash = async (id) => {
      const confirm = await showConfirmationAlert(
         "Are you sure you want to delete permanently",
         "warning"
      );
      if (confirm.isConfirmed) {
         deletePaymentMethod(id);
      }
   };
   const getAllCategories = async () => {
      try {
         const result = await getCategories(token);
         if (result?.status == true) {
            let categoriesArray = [];
            result.categories.map((item, index) =>
               categoriesArray.push({
                  value: item.id,
                  label: item.category,
               })
            );
            setCategories(categoriesArray);
            // setLoader(false);
         } else {
            // setLoader(false);
         }
      } catch (error) {
         console.log("error", error);
         // setLoader(false);
      }
   };
   const getAllPaymentMethods = async (
      page,
      title,
      description,
      category,
      status,
      rows
   ) => {
      try {
         const result = await getPaymentMethods(
            token,
            page + 1,
            title,
            description,
            category,
            status,
            rows
         );
         if (result?.status == true) {
            console.log("result", result);
            setTotalPages(result?.paymentMethods?.total);

            // setPagination((prevPagination) => ({
            //    pageSize: result?.paymentMethods?.last_page,
            //    pageIndex: result?.paymentMethods?.current_page,
            // }));
            let paymentMethodArray = [];
            result.paymentMethods.data.map((item, index) =>
               paymentMethodArray.push({
                  id: item?.id,
                  refnum: item?.id,
                  category: item?.category?.label,
                  categoryID: item?.category?.id,
                  orderID: item?.order,
                  title: item?.title ?? "No Title",
                  description: item?.description ?? "No description",
                  img: ProfileImageComposer(item?.payment_mathod_icon),
                  status: item.status,
                  action: "Action",
               })
            );

            setData(paymentMethodArray);

            setLoader(false);
         } else {
            setLoader(false);
         }
      } catch (error) {
         setLoader(false);
      }
   };
   const handleFilterChange = (name, value) => {
      setFilters((prevFilters) => ({
         ...prevFilters,
         [name]: value,
      }));
   };
   const paymentMethodAction = async () => {
      setLoader(true);
      try {
         const result = await addUpdatePaymentMethod(
            token,
            title,
            description,
            imageDB,
            categoryStatus,
            orderID,
            type,
            selectedCategory?.value,
            paymentMethodID
         );
         const jsonString = result;
         const jsonObject = JSON.parse(jsonString);
         console.log("jsonObject", jsonObject);
         if (jsonObject?.status == true) {
            getAllPaymentMethods();
            setIsOpenModal(false);
            setLoader(false);
            showToast("Category added successfully", "success", "top-end");
         } else {
            setLoader(false);
            if (jsonObject?.errors) {
               showToast(requiredFields, "error", "top-start");
            } else {
               showToast(jsonObject.message, "error", "top-start");
            }
         }
      } catch (error) {
         setLoader(false);
      }
   };
   const deletePaymentMethod = async (id) => {
      setLoader(true);
      try {
         const result = await TrashPaymentMethod(token, id);
         console.log("addUpdatePaymentMethod", result);
         if (result?.status == true) {
            getAllPaymentMethods();
            showToast(result?.message, "success", "top-end");
         } else {
            showToast(result?.message, "error", "top-start");

            setLoader(false);
         }
      } catch (error) {
         setLoader(false);
      }
   };
   const columns = useMemo(
      () => [
         {
            accessorKey: "refnum",
            header: "#",
            // mantineTableHeadCellProps: {
            //   align: 'center',
            // },
            // mantineTableBodyCellProps: {
            //   align: 'center',
            // },
            size: 50,
         },

         {
            accessorKey: "img",
            header: "Image/Icon",
            Cell: ({ row }) => (
               <div>
                  <Image
                     src={row.original.img}
                     width={50}
                     height={50}
                     className="rounded-circle cursor-pointer mx-2"
                     alt="icon"
                     loader={loaderProp}
                  />
               </div>
            ),

            size: 90,
         },
         {
            accessorKey: "category",
            header: (
               <FilterComponent
                  placeholder="Category"
                  name="category"
                  onFilterChange={handleFilterChange}
               />
            ),
            size: 150,
         },

         {
            accessorKey: "title",
            header: (
               <FilterComponent
                  placeholder="Title"
                  name="title"
                  onFilterChange={handleFilterChange}
               />
            ),
            size: 150,
         },
         {
            accessorKey: "description",
            header: (
               <FilterComponent
                  placeholder="Description"
                  name="description"
                  onFilterChange={handleFilterChange}
               />
            ),
            size: 290,
         },

         {
            accessorKey: "status",
            header: (
               <DropdownFilter
                  placeholder="Status"
                  name="status"
                  options={["Status", "Active", "Inactive"]} // Replace with your actual options
                  onFilterChange={handleFilterChange}
               />
            ),
            Cell: ({ row }) => (
               <div className="form-check form-switch ">
                  <input
                     className="form-check-input border-secondary  shadow-none cursor-pointer"
                     type="checkbox"
                     id="flexSwitchCheckChecked"
                     checked={row.original.status == "active" ? true : false}
                     onChange={(e) =>
                        updateByToggleFun(
                           row.original,
                           e.target.checked ? "active" : "inactive"
                        )
                     }
                  />
                  <Badge
                     pill
                     className={`w-100  ${
                        row.original.status == "inactive"
                           ? "deActiveBadgeColor"
                           : "activeBadgeColor"
                     }`}
                  >
                     <li>
                        {row.original.status == "active"
                           ? "Active"
                           : "Inactive"}
                     </li>
                  </Badge>
               </div>
            ),
            size: 160,
         },
         {
            accessorKey: "orderID",
            header: "OrderID",
            mantineTableHeadCellProps: {
               align: "center",
            },
            mantineTableBodyCellProps: {
               align: "center",
            },
            size: 120,
         },
         {
            accessorKey: "action",
            header: "Action",
            mantineTableHeadCellProps: {
               align: "center",
            },
            mantineTableBodyCellProps: {
               align: "center",
            },
            Cell: ({ row }) => (
               <div>
                  <Image
                     src="/fonts/feather-icons/icons/trash-2.svg"
                     width={15}
                     height={15}
                     className="cursor-pointer "
                     alt="icon"
                     onClick={() => confirmationForTrash(row.original.refnum)}
                  />
                  <Image
                     src="/fonts/feather-icons/icons/edit.svg"
                     width={15}
                     height={15}
                     className="cursor-pointer ms-2"
                     alt="icon"
                     onClick={() => updateBtnFun(row.original)}
                  />
               </div>
            ),
            size: 160,
         },
      ],
      []
   );
   const handleImageChange = (event) => {
      const file = URL.createObjectURL(event.target.files[0]);
      for (let i = 0; i < file.length; i++) {
         if (file[i].size > 1024 * 1024) {
            showAlert("Your image exceeds 1MB in size", "error");

            return;
         }
      }
      setImageDB(event.target.files[0]);
      setSelectedImage(file);
      // setShowModal(true);
   };
   const loaderProp = ({ src }) => {
      return src;
   };
   const table = useMantineReactTable({
      columns,
      data,
      // manualPagination: true,
      onPaginationChange: setPagination,
      state: {
         pagination,
      },
      autoResetPageIndex: false,
      enablePinning: true,
      enableRowOrdering: true,
      enableSorting: false,
      enableFiltering: false,
      showSearch: false,
      showColumnToggle: false,
      showFilterButton: false,
      enableStickyHeader: true,
      mantineTableProps: {
         striped: true,
      },

      mantinePaginationProps: {
         rowsPerPageOptions: ["25", "50", "100", "250", "500"],
      },
      manualFiltering: true,
      manualPagination: true,
      manualSorting: true,
      rowCount: totalPages,
      mantineTableContainerProps: { sx: { maxHeight: "68vh" } },
      initialState: {
         onPaginationChange: setPagination,
         columnPinning: {
            right: ["action"], //pin built-in row actions display column to right by default
         },
         pagination: {
            pageIndex: 1,
            pageSize: 25,
         },
      },
      mantineRowDragHandleProps: ({ table }) => ({
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
      }),
   });
   return (
      <>
         {mainLoader ? (
            <div className="d-flex justify-content-center align-items-center vh-100">
               <div
                  className="spinner-border spinner-border-lg fs-12 spk-red-color"
                  role="status"
               ></div>
            </div>
         ) : (
            <>
               <Card className="mt-5 mx-5">
                  <div className="row my-4">
                     <div className="col-6">
                        <h4 className="ms-3 ">Payment method list</h4>
                     </div>
                     <div className="col-6 text-end">
                        <Image
                           src="/fonts/feather-icons/icons/user-plus.svg"
                           alt="add icon"
                           width={20}
                           height={20}
                           className="me-3 cursor-pointer"
                           onClick={() => addBtnFun()}
                        />
                        <ExportTable data={data} />
                     </div>
                  </div>
                  <MantineReactTable table={table} />
               </Card>
               <Modal
                  size="md"
                  show={isOpenModal}
                  onHide={() => setIsOpenModal(!isOpenModal)}
                  aria-labelledby="example-modal-sizes-title-lg"
               >
                  <Modal.Header closeButton>
                     <Modal.Title id="example-modal-sizes-title-lg">
                        {modalTitle}
                     </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                     <>
                        <FormField
                           label={
                              <>
                                 Select Category
                                 <sup className="spk-red-color">*</sup>
                              </>
                           }
                           value={
                              <Select
                                 placeholder="Select Category"
                                 options={categories}
                                 styles={customStyles}
                                 value={selectedCategory}
                                 isSearchable={true}
                                 onChange={(selected) => {
                                    setSelectedCategory(selected);
                                 }}
                              />
                           }
                           icon={"icon-profile"}
                           iconPath={4}
                        />
                        <FormField
                           label={
                              <>
                                 Title
                                 <sup className="spk-red-color">*</sup>
                              </>
                           }
                           value={
                              <input
                                 type="text"
                                 className="form-control mt-2 ps-0 shadow-none rounded-0 border-0 fw-500 fs-16"
                                 id="first-name-input"
                                 name="first-name-input"
                                 placeholder="Enter Caste Name"
                                 value={title}
                                 onChange={(e) => setTitle(e.target.value)}
                              />
                           }
                           icon={"icon-profile"}
                           iconPath={4}
                        />
                        <FormField
                           label={
                              <>
                                 Description
                                 <sup className="spk-red-color">*</sup>
                              </>
                           }
                           value={
                              <textarea
                                 rows="2"
                                 cols="65"
                                 className="form-control mt-2 ps-0 shadow-none rounded-0 border-0 fw-500 fs-16"
                                 id="description-input"
                                 name="description-input"
                                 placeholder="Enter Description"
                                 value={description}
                                 onChange={(e) =>
                                    setDescription(e.target.value)
                                 }
                              ></textarea>
                           }
                           icon={"icon-profile"}
                           iconPath={4}
                        />
                        <FormField
                           label={
                              <>
                                 OrderID
                                 <sup className="spk-red-color">*</sup>
                              </>
                           }
                           value={
                              <input
                                 type="number"
                                 className="form-control mt-2 ps-0 shadow-none rounded-0 border-0 fw-500 fs-16"
                                 id="OrderID-input"
                                 name="OrderID-input"
                                 placeholder="Enter OrderID"
                                 value={orderID}
                                 onChange={(e) => setOrderID(e.target.value)}
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
                                       className={`"pill-btn-font fw-500 fs-11 btn border-0 rounded px-4 py-2 btn-light ${
                                          categoryStatus == "active"
                                             ? "spk-background-red-color"
                                             : null
                                       }  rounded-pill`}
                                       onClick={() =>
                                          setCategoryStatus("active")
                                       }
                                    >
                                       Active
                                    </button>
                                 </div>
                                 <div className="m-1">
                                    <button
                                       type="button"
                                       className={`"pill-btn-font fw-500 fs-11 btn border-0 rounded px-4 py-2 btn-light ${
                                          categoryStatus == "inactive"
                                             ? "spk-background-red-color"
                                             : null
                                       }  rounded-pill`}
                                       onClick={() =>
                                          setCategoryStatus("inactive")
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
                        <FormField
                           label={
                              <>
                                 Image/Icon
                                 <sup className="spk-red-color">*</sup>
                              </>
                           }
                           value={
                              <div className="d-flex justify-content-center mt-5">
                                 {!selectedImage && (
                                    <label
                                       htmlFor="imageInput"
                                       className="cursor-pointer fw-400 fs-16"
                                    >
                                       <Image
                                          src={uploadIcon}
                                          className="justify-content-center"
                                          alt=""
                                       />
                                       <input
                                          type="file"
                                          accept="image/*"
                                          onChange={handleImageChange}
                                          className="img-input visually-hidden"
                                          id="imageInput"
                                       />
                                    </label>
                                 )}
                                 {selectedImage && (
                                    <div className="container position-relative">
                                       <div className="position-absolute top-0 end-0 mt-2 mx-3">
                                          <Image
                                             src={crossIcon}
                                             alt=""
                                             className="cursor-pointer"
                                             height={20}
                                             width={20}
                                             onClick={() => {
                                                setSelectedImage("");
                                             }}
                                          />
                                       </div>
                                       <div className="d-flex justify-content-center">
                                          <Image
                                             src={selectedImage}
                                             alt=""
                                             className="img-thumbnail mb-4 rounded"
                                             width={250}
                                             height={250}
                                          />
                                       </div>
                                    </div>
                                 )}
                              </div>
                           }
                           icon={"icon-lock"}
                           iconPath={2}
                           removeBorder={true}
                        />

                        <div className="form-group my-5 ">
                           <button
                              className="border-0 rounded p-2 text-white w-100 fs-15 fw-400"
                              onClick={() => paymentMethodAction()}
                              type="button"
                           >
                              {loader ? (
                                 <div
                                    className="spinner-border spinner-border-sm fs-12 text-light"
                                    role="status"
                                 ></div>
                              ) : (
                                 btnLabel
                              )}
                           </button>
                           {/* </Link> */}
                        </div>
                     </>
                  </Modal.Body>
               </Modal>
            </>
         )}
      </>
   );
};

export default Page;
