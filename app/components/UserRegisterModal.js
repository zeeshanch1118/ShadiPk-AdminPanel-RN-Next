import React, { useState, useMemo, useEffect } from "react";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import Image from "next/image";
import Select from 'react-select';
import { Modal } from "react-bootstrap";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import eye from "/public/fonts/feather-icons/icons/eye.svg";
import crossEye from "/public/fonts/feather-icons/icons/eye-off.svg";
import { useRouter } from "next/navigation";
import { getAllStates, getAllCities, getConfigOpts } from "../api/fields-data/index.js";
import { createUser } from "../api/auth/index.js";
import { showToast } from "../helper/alerts/index.js";
import FormField from "./Formfield.js";
const UserRegisterModal = (
    {
        isOpenModal,
        handleCloseModal,
        modalTitle,
        btnLabel
    }
) => {

    const [userStatus, setUserStatus] = useState('active');
    const [loader, setLoader] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [DBPhoneNumber, setDBPhoneNumber] = useState(null);
    const [countryCode, setCountryCode] = useState(null);
    const [flagPhoneNumber, setflagPhoneNumber] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [mailID, setMailID] = useState("");
    const [selectedMainProfileFor, setSelectedMainProfileFor] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedState, setSelectedState] = useState(null);
    const [isViewPassword, setIsViewPassword] = useState(false);
    const [isViewConfirmPassword, setIsViewConfirmPassword] = useState(false);
    const [profileRole, setProfileRole] = useState([]);
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const router = useRouter();
    const [isFetchStorageData, setIsFetchStorageData] = useState(true);
    const [mainLoader, setMainLoader] = useState(true);
    const [filters, setFilters] = useState({});
    const [lgShow, setLgShow] = useState(false);
    const [isModal, setIsModal] = useState(false);
    useEffect(() => {
        getAllOpts();

    }, []);

    const getAllOpts = async () => {
        const result = await getConfigOpts()
        if (result.status == true) {
            getOptions(result?.config_options)
        }
    }
    const getOptions = async (decryptedData) => {
        let rolesArray = [];
        let countriesArray = [];

        decryptedData.roles.map(
            (item, index) =>
                index <= 1 &&
                rolesArray.push({ value: item?.id, label: item?.label })
        );
        setProfileRole(rolesArray);

        decryptedData.countries_db.map((item, index) =>
            item?.label != "Any Country"
                ? countriesArray.push({ value: item?.id, label: item?.label })
                : null
        );
        setCountries(countriesArray);
        setIsFetchStorageData(false);
    };
    const register = async () => {
        try {
            setLoader(true);
            const result = await createUser(
                firstName,
                lastName,
                password,
                confirmPassword,
                mailID,
                selectedMainProfileFor,
                selectedCountry,
                selectedCity,
                selectedState,
                DBPhoneNumber,
                countryCode,
                flagPhoneNumber
            );
            if (result.status === true) {
                setLoader(false);
                const encrypteduserData = CryptoJS.AES.encrypt(
                    JSON.stringify({
                        registerAs:
                            selectedMainProfileFor?.value == 4
                                ? "groom"
                                : selectedMainProfileFor?.value == 5
                                    ? "bride"
                                    : null,
                    }),
                    "PK8D@9z$Tj^6LfAAdminShadiPk"
                ).toString();
                Cookies.set("Admin_session", encrypteduserData, {
                    expires: 30 * 24 * 60 * 60,
                });
                const encryptedData = CryptoJS.AES.encrypt(
                    JSON.stringify({
                        registerUserToken: result?.token,
                        registerUserID: result?.user_id,
                        registerUserFirstName: firstName,
                        registerUserLastName: lastName,
                        registerUsergender: selectedMainProfileFor?.value,
                    }),
                    "PK8D@9z$Tj^6LfAAdminShadiPk"
                ).toString();

                localStorage.setItem("registerUserToken", encryptedData);

                const profileStatus = CryptoJS.AES.encrypt(
                    JSON.stringify({
                        profileStatus: 2,
                    }),
                    "PK8D@9z$Tj^6LfAAdminShadiPk"
                ).toString();

                localStorage.setItem("profileStatus", profileStatus);
                router.push("/register/step-3");
            } else {
                if (result?.errors) {

                    const errorMessages = [];

                    if (result?.errors?.first_name) {
                        errorMessages.push(result.errors.first_name[0]);
                    }
                    if (result?.errors?.last_name) {
                        errorMessages.push(result.errors.last_name[0]);
                    }
                    if (result?.errors?.email) {
                        errorMessages.push(result.errors.email[0]);
                    }
                    if (result?.errors?.password) {
                        errorMessages.push(result.errors.password[0]);
                    }
                    if (result?.errors?.country_living) {
                        errorMessages.push(result.errors.country_living[0]);
                    }
                    if (result?.errors?.city_living) {
                        errorMessages.push(result.errors.city_living[0]);
                    }
                    if (result?.errors?.mobile_no) {
                        errorMessages.push(result.errors.mobile_no[0]);
                    }
                    if (result?.errors?.role_id) {
                        errorMessages.push(result.errors.role_id[0]);
                    }
                    if (result?.errors?.state_living) {
                        errorMessages.push(result.errors.state_living[0]);
                    }

                    if (errorMessages.length === 0 && result?.errors) {
                        errorMessages.push(result.errors);
                    }
                    if (errorMessages.length > 0) {
                        showToast(errorMessages.join("<br>"), "error", "top-start");
                    }

                    setLoader(false);
                } else {
                    showToast(result.message, "error", "top-start");
                }
                setLoader(false);
            }
        } catch (err) {
            setLoader(false);
            showToast(err, "error", "top-start");
        }
    };

    const getStates = async (id) => {
        try {
            const result = await getAllStates(id);
            let newArray = [];
            if (result.status === true) {
                result.states.map((item, index) =>
                    newArray.push({ value: item?.id, label: item?.label })
                );
                setStates(newArray);
            }
        } catch (err) {
            // setLoader(false)
            console.log("getListings err", err);
        }
    };
    const getCities = async (id) => {
        try {
            const result = await getAllCities(id);
            let newArray = [];
            if (result.status === true) {
                result.cities.map((item, index) =>
                    newArray.push({ value: item?.id, label: item?.label })
                );
                setCities(newArray);
            }
        } catch (err) {
            // setLoader(false)
            console.log("getListings err", err);
        }
    };
    const handelCountry = (selected) => {
        setSelectedCountry(selected);
        getStates(selected?.value);
        setStates([]);
        setCities([]);
        setSelectedState(null);
        setSelectedCity(null);
    };
    const handelState = (selected) => {
        setSelectedState(selected);
        getCities(selected?.value);
        setCities([]);
        setSelectedCity(null);
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
    const customInputStyles = {
        border: "none",
        outline: "none",
        boxShadow: "none",
        fontSize: 16,
        fontWeight: 600,
    };
    const handleFirstNameChange = (e) => {
        const inputValue = e.target.value;
        // Check if the input contains only alphabets
        const isValid = /^[A-Za-z]+$/u.test(inputValue);

        if (isValid || inputValue === "") {
            setFirstName(inputValue);
        }
    };

    const handleLastNameChange = (e) => {
        const inputValue = e.target.value;
        // Check if the input contains only alphabets
        const isValid = /^[A-Za-z]+$/u.test(inputValue);

        if (isValid || isValid === "") {
            setLastName(inputValue);
        }
    };
    return (
        <div>
            <Modal size="lg" show={isOpenModal} onHide={handleCloseModal} aria-labelledby="example-modal-sizes-title-lg" >
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
                                    Select the Profile for
                                    <sup className="spk-red-color">*</sup>
                                </>
                            }
                            value={
                                <Select
                                    placeholder="Select who you are?"
                                    options={profileRole}
                                    styles={customStyles}
                                    value={selectedMainProfileFor}
                                    isSearchable={true}
                                    onChange={(selected) => {
                                        setSelectedMainProfileFor(selected);
                                    }}
                                />
                            }
                            icon={"icon-profile"}
                            iconPath={4}
                        />
                        <div className="row">
                            <div className="col-6">
                                <FormField
                                    label={
                                        <>
                                            Name
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
                                            placeholder="Enter First Name"
                                            value={firstName}
                                            onChange={(e) =>
                                                handleFirstNameChange(e)
                                            }
                                        />
                                    }
                                    icon={"icon-profile"}
                                    iconPath={4}
                                />
                            </div>
                            <div className="col-6 align-self-end">
                                <FormField
                                    label={""}
                                    value={
                                        <input
                                            type="text"
                                            className="form-control mt-2 ps-0 shadow-none border-0 fw-500 fs-16 rounded-0 "
                                            id="last-name-input"
                                            name="last-name-input"
                                            placeholder="Enter Last Name"
                                            value={lastName}
                                            onChange={handleLastNameChange}
                                        />
                                    }
                                    icon={null}
                                    iconPath={0}
                                />
                            </div>
                        </div>

                        <FormField
                            label={
                                <>
                                    Country{" "}
                                    <sup className="spk-red-color">*</sup>
                                </>
                            }
                            value={
                                <Select
                                    isDisabled={
                                        countries?.length > 0 ? false : true
                                    }
                                    placeholder="Select Country"
                                    options={countries}
                                    styles={customStyles}
                                    value={selectedCountry}
                                    isSearchable={true}
                                    onChange={(selected) =>
                                        handelCountry(selected)
                                    }
                                />
                            }
                            icon={"icon-location"}
                            iconPath={2}
                        />
                        <div className="row">
                            <div className="col-6">
                                <FormField
                                    label={
                                        <>
                                            Province
                                            <sup className="spk-red-color">
                                                *
                                            </sup>
                                        </>
                                    }
                                    value={
                                        <Select
                                            isDisabled={
                                                states?.length > 0
                                                    ? false
                                                    : true
                                            }
                                            placeholder="Select Province"
                                            options={states}
                                            styles={customStyles}
                                            value={selectedState}
                                            isSearchable={true}
                                            onChange={(selected) =>
                                                handelState(selected)
                                            }
                                        />
                                    }
                                    icon={"icon-location"}
                                    iconPath={4}
                                />
                            </div>
                            <div className="col-6 align-self-end">
                                <FormField
                                    label={
                                        <>
                                            City
                                            <sup className="spk-red-color">
                                                *
                                            </sup>
                                        </>
                                    }
                                    value={
                                        <Select
                                            isDisabled={
                                                cities?.length > 0
                                                    ? false
                                                    : true
                                            }
                                            placeholder="Select City"
                                            options={cities}
                                            styles={customStyles}
                                            value={selectedCity}
                                            isSearchable={true}
                                            onChange={(selected) => {
                                                setSelectedCity(selected);
                                            }}
                                        />
                                    }
                                    icon={null}
                                    iconPath={0}
                                />
                            </div>
                        </div>

                        <FormField
                            label={
                                <>
                                    Phone{" "}
                                    <sup className="spk-red-color">*</sup>
                                </>
                            }
                            value={
                                <PhoneInput
                                    containerClass="fs-16 fw-600 "
                                    placeholder="Enter phone number"
                                    inputStyle={customInputStyles}
                                    country={"pk"}
                                    value={phoneNumber}
                                //  onChange={(value, data, event, formattedValue) => handleOnChange(value, data, event, formattedValue)}
                                />
                            }
                            icon={"icon-phone"}
                            iconPath={2}
                        />
                        <FormField
                            label={
                                <>
                                    Email{" "}
                                    <sup className="spk-red-color">*</sup>
                                </>
                            }
                            value={
                                <input
                                    type="email"
                                    className="form-control ps-0 mt-2 shadow-none border-0 rounded-0 fw-500 fs-16"
                                    id="email-input"
                                    name="email-input"
                                    placeholder="Example@gmail.com"
                                    value={mailID}
                                    onChange={(e) => {
                                        setMailID(e.target.value);
                                    }}
                                />
                            }
                            icon={"icon-email"}
                            iconPath={4}
                        />
                        <FormField
                            label={
                                <>
                                    Password{" "}
                                    <sup className="spk-red-color">*</sup>
                                </>
                            }
                            value={
                                <div className="d-flex justify-content-between align-items-center">
                                    <input
                                        type={
                                            isViewPassword == true
                                                ? "text"
                                                : "password"
                                        }
                                        className="form-control mt-2 ps-0 shadow-none border-0 rounded-0 fw-500 fs-16"
                                        id="password-input"
                                        name="password-input"
                                        placeholder="Enter Your Password"
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                        }}
                                    />
                                    <Image
                                        src={isViewPassword ? crossEye : eye}
                                        height={16}
                                        width={16}
                                        className="cursor-pointer"
                                        onClick={() =>
                                            setIsViewPassword(!isViewPassword)
                                        }
                                        alt=""
                                    />
                                </div>
                            }
                            icon={"icon-lock"}
                            iconPath={2}
                        />
                        <FormField
                            label={
                                <>
                                    Confirm Password{" "}
                                    <sup className="spk-red-color">*</sup>
                                </>
                            }
                            value={
                                <div className="d-flex justify-content-between align-items-center">
                                    <input
                                        type={
                                            isViewConfirmPassword == true
                                                ? "text"
                                                : "password"
                                        }
                                        className="form-control mt-2 ps-0 shadow-none border-0 rounded-0 fw-500 fs-16"
                                        id="confirm-password-input"
                                        name="confirm-password-input"
                                        placeholder="Enter Your Confirm Password"
                                        value={confirmPassword}
                                        onChange={(e) => {
                                            setConfirmPassword(e.target.value);
                                        }}
                                    />
                                    <Image
                                        src={
                                            isViewConfirmPassword
                                                ? crossEye
                                                : eye
                                        }
                                        height={16}
                                        width={16}
                                        className="cursor-pointer"
                                        onClick={() =>
                                            setIsViewConfirmPassword(
                                                !isViewConfirmPassword
                                            )
                                        }
                                    />
                                </div>
                            }
                            icon={"icon-lock"}
                            iconPath={2}
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
                                onClick={() => register()}
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
                {/* <Modal.Footer >
          <Button variant="secondary" onClick={() => setLgShow(false)} >
            Close
          </Button>
          <Button variant="primary" onClick={() => setLgShow(false)}>
            Save Changes
          </Button>
        </Modal.Footer> */}
            </Modal>
        </div>

    )
}
export default UserRegisterModal