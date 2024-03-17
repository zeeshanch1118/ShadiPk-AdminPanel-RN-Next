'use client'

// import node module libraries
import { Row, Col, Card, Form, Button, Image } from 'react-bootstrap';
import Link from 'next/link';
import FormField from '../../../components/Formfield.js'
import '../../../globals.css';

const ForgetPassword = () => {
  return (
    <Row className="align-items-center justify-content-center g-0 min-vh-100">
      <Col xxl={4} lg={6} md={8} xs={12} className="py-8 py-xl-0">
        {/* Card */}
        <Card className="smooth-shadow-md">
          {/* Card body */}
          <Card.Body className="p-6">
            <div className="mb-4">
              <Link href="/"><Image src="/header/logo.svg" className="mb-2" alt="" /></Link>
              <p className="mb-6">Don&apos;t worry, we&apos;ll send you an email to reset your password.</p>
            </div>
            {/* Form */}
              <Form >
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
                      className="form-control ps-0 mt-2 shadow-none border-0 rounded-0 fw-500 fs-16"
                      id="email-input"
                      name="email-input"
                      placeholder="Example@gmail.com"
                    // value={mailID}
                    // onChange={(e) => {
                    //     setMailID(e.target.value);
                    // }}
                    />
                  }
                  icon={"icon-email"}
                  iconPath={4}
                />
                {/* Button */}
                <div className="my-5 d-grid">
                  <Button variant="danger" type="submit">Reset Password</Button>
                </div>
                <span>Don&apos;t have an account? <Link href="/authentication/sign-in" className='text-danger'>Sign In</Link></span>
              </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}

export default ForgetPassword