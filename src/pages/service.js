import React from 'react';
import "../assets/css/service.css"
import {useFormik} from 'formik';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import Whatsapp from "../assets/img/whatsapp.webp";

const Service = () => {
    const formik = useFormik({
        initialValues : {
            name : "",
            email:"",
            password:"",
            confirmpassword:"",
            list:"",
            number:""
        },
        validationSchema : yup.object({
            name : yup.string().required("Name is a required field").max(10, "Maximum 10 characters only").strict().trim().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field"),
            email : yup.string().required("Email is a required field").email().strict().trim(),
            password : yup.string().required("Password is a required field").min(6, "Minimum 5 characters must").strict().trim(),
            confirmpassword : yup.string().required("Confirmpassword is a required field").oneOf([yup.ref('password'),null],"Password must match").strict().trim(),
            list: yup.string().required("List is a required field").strict().trim(),
            number:yup.string().required("Number is a required field").max(10,"Maximum 10 digits only").matches(/^[0-9]+$/, "Must be only digits")
        }),
        onSubmit:(userdata,{resetForm}) => {
            resetForm({userdata:""})
        }
    })
    return (
        <div className="service">
            <div className="container">
                <center>
                    <div className="jumb">
                        <center>
                            <h2><Link to="/signup"><i className="fa fa-arrow-left" aria-hidden="true"></i></Link>Sign up as Kaodim Vendor</h2>
                            <div className="SignForm-form-line">
                                <hr className="divider"/>
                            </div>
                        </center>
                        <form autoComplete="off" className="form-group" onSubmit={formik.handleSubmit}>
                            <label>Email address</label>
                            <input placeholder="Enter your email" className="form-control" type="email"
                            name="email" onChange = {formik.handleChange} value={formik.values.email} />
                            {formik.errors.email && formik.touched.email ?
                                <div className="text-danger">{formik.errors.email}</div> : null
                            }
                            <label>Password</label>
                            <input placeholder="Enter a password" className="form-control" type="password"
                            name="password" onChange = {formik.handleChange} value={formik.values.password} />
                            {formik.errors.password && formik.touched.password ?
                                <div className="text-danger">{formik.errors.password}</div> : null
                            }
                            <div className="row pads">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"><label>Phone number</label></div>
                                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 add">
                                    <input placeholder="+91" className="form-control addition" type="text"
                                    name="number" onChange = {formik.handleChange} value={formik.values.number} />
                                </div>
                                <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10 add1">
                                    <input placeholder="Enter a number" className="form-control" type="number"
                                    name="number" onChange = {formik.handleChange} value={formik.values.number} />
                                </div>
                                {formik.errors.number && formik.touched.number ?
                                    <div className="text-danger dangerous">{formik.errors.number}</div> : null
                                }
                            </div>
                            <label className="checkbox-inline">
                                <input type="checkbox" value="" />
                                I want to receive important notification from over
                                <span><img src={Whatsapp} className="img img-responsive" alt="whatsapp" /></span>
                            </label>
                            <center>
                                <button className="btn btn-danger btn-block btn-lg" type="submit">Continue</button>
                            </center>
                        </form>
                        <center>
                            <p>By creating a vendor account with Kaodim, you agree to our</p>
                            <p><Link to="/service">Terms of Use</Link> and <Link to="/service">Privacy Policy</Link></p>
                        </center>
                    </div>
                </center>
            </div>
        </div>
    )
}
export default Service;