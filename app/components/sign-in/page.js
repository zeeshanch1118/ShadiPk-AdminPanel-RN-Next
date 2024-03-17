'use client'
import { Row, Col, Card, Form, Button, Image } from 'react-bootstrap';
import Link from 'next/link';
import { useState, useEffect, useRef } from "react";
import FormField from '../Formfield.js'
import CryptoJS from "crypto-js";
import '../../../app/globals.css';
import eye from "/public/fonts/feather-icons/icons/eye.svg";
import crossEye from "/public/fonts/feather-icons/icons/eye-off.svg";
import Cookies from "js-cookie";
import { CheckAuth } from "../CheckAuth.js";
import { inValidEmail, inValidPassword, inValidPhoneNumber } from "../../helper/index.js";
import { useRouter } from "next/navigation";
import { adminLogIn } from "../../api/auth/index.js";
import validator from "validator";

const SignIn = () => {

  const [isViewPassword, setIsViewPassword] = useState(false);
  const isEmailValid = (email) => validator.isEmail(email);
  const isPasswordValid = (password) => password.length >= 6;
  const isPhoneValid = (phoneNumber) => phoneNumber.length >= 6;
  const router = useRouter();
  const hasRun = useRef(false);
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const [loginType, setLoginType] = useState("email");
  const [forgetPassword, setForgetPassword] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState("");
  const [mainLoader, setMainLoader] = useState(true);
  useEffect(() => {
    if (!hasRun.current) {
      const authResult = CheckAuth();
      if (authResult?.isAuthenticated) {
        router.push("/dashboard");
      }
      hasRun.current = true;
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setMainLoader(false);
    }, 1000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const onKeyPressLogin = (e) => {
    if (e.which === 13) {
      loginHandler(e);
    }
  };
  const loginHandler = async (event) => {
    event.preventDefault();
    if (loginType == "email" && !isEmailValid(email)) {
      setEmailError(true);
      if (email === "" || email == null || email == undefined) {
        setEmailErrorMessage("Please enter your email to continue");
      } else {
        setEmailErrorMessage(inValidEmail);
      }
      return;
    } else if (loginType == "mobile" && !isPhoneValid(phoneNumber)) {
      setEmailError(true);
      if (
        phoneNumber === "" ||
        phoneNumber == null ||
        phoneNumber == undefined
      ) {
        setEmailErrorMessage("Please enter your mobile number to continue");
      } else {
        setEmailErrorMessage(inValidPhoneNumber);
      }
      return;
    }

    if (!isPasswordValid(password)) {
      setPasswordError(true);
      setPasswordMessage(inValidPassword);

      return;
    }

    try {
      setLoader(true);
      const result = await adminLogIn(
        loginType == "email" ? email : phoneNumber,
        password
      );
      if (result.status == true) {
        const encryptedData = CryptoJS.AES.encrypt(
          JSON.stringify({
            token: result?.token,
            // id: result?.user?.id,
            // registerAs: result?.user?.roles[0]?.slug,
          }),
          "PK8D@9z$Tj^6LfAAdminShadiPk"
        ).toString();
        Cookies.set("Admin_session", encryptedData, {
          expires: 30 * 24 * 60 * 60,
        });

        setLoader(false);

        router.push("/dashboard");
      } else {
        setLoader(false);

        if (result.status === false && result.type === "email") {
          setEmailError(true);
          setEmailErrorMessage(result?.message);
          return;
       }
       if (result.status === false && result.type === "password") {
          setPasswordError(true);
          setPasswordMessage(result?.message);
          return;
       }

      }
    } catch (err) {
      setLoader(false);
console.log('setLoadersetLoader',err)
      // Handle any other errors
    }
  };
  return (
    <Row className="align-items-center justify-content-center g-0 min-vh-100">
      <Col xxl={4} lg={6} md={8} xs={12} className="py-8 py-xl-0">
        {/* Card */}
        <Card className="smooth-shadow-md">
          {/* Card body */}
          <Card.Body className="p-6">
          {mainLoader ? (
            <div className="d-flex justify-content-center align-items-center vh-100">
               <div
                  className="spinner-border spinner-border-lg fs-12 spk-red-color"
                  role="status"
               ></div>
            </div>
         ) : (
          <>
           <div className="mb-4">
              <Link href="/"><Image src="/header/logo.svg" className="mb-2" alt="" /></Link>
              <p className="mb-6">Please enter your user information.</p>
            </div>
            {/* Form */}
              <Form>

                {/* Email */}
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
                      className="form-control  shadow-none border-0 rounded-0 ps-0 "
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value),
                          setEmailError(false);
                      }}
                      onKeyPress={(e) => onKeyPressLogin(e)}
                    />
                  }
                  icon={"icon-email"}
                  iconPath={4}
                />
                {emailError && (
                  <span className="spk-red-color fs-15 px-1">
                    {emailErrorMessage}
                  </span>
                )}
                <FormField
                  label={
                    <>
                      Password{" "}
                      <sup className="spk-red-color">*</sup>
                    </>
                  }
                  value={
                    <div className="position-relative">
                      <input
                        type={
                          isViewPassword == true
                            ? "text"
                            : "password"
                        }
                        value={password}
                        className="form-control mt-2 passwordIcon shadow-none border-0 ps-0"
                        onChange={(e) => {
                          setPassword(e.target.value),
                            setPasswordError(false);
                        }}
                        placeholder="Enter your password"
                        onKeyPress={(e) => onKeyPressLogin(e)}
                      />
                      <div className="position-absolute top-0 end-0 pt-2">
                        <Image
                          src={isViewPassword ? crossEye?.src : eye?.src}
                          height={16}
                          width={16}
                          className="cursor-pointer "
                          onClick={() =>
                            setIsViewPassword(!isViewPassword)
                          }
                          alt=""
                        />
                      </div>
                    </div>
                  }
                  icon={"icon-lock"}
                  iconPath={2}
                />
                {passwordError && (
                  <span className="spk-red-color fs-15 px-1">
                    {passwordMessage}
                  </span>
                )}


                {/* Checkbox */}

                <div>
                  {/* Button */}
                  <div className="d-grid mt-7">
                    {/* <Button variant="danger" type="submit" onClick={()=>loginHandler}
                    > {loader ? (
                      <div
                         className="spinner-border spinner-border-sm fs-12 text-light"
                         role="status"
                      ></div>
                   ) : (
                      "Login"
                   )}
                    </Button> */}
                     <button
                           className="border-0 text-white rounded w-100 py-2 mt-5"
                           onClick={loginHandler}
                        >
                           {loader ? (
                              <div
                                 className="spinner-border spinner-border-sm fs-12 text-light"
                                 role="status"
                              ></div>
                           ) : (
                              "Login"
                           )}
                        </button>
                  </div>
                  {/* <div className="d-md-flex justify-content-between mt-4">
                    <div className="mb-2 mb-md-0">
                      <Link href="/authentication/sign-up" className="fs-5 spk-red-color">Create An Account </Link>
                    </div>
                    <div>
                      <Link href="/authentication/forget-password" className="text-inherit fs-5">Forgot your password?</Link>
                    </div>
                  </div> */}
                </div>
              </Form>
          </>
         )}


          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}


export default SignIn