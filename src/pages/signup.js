import React from 'react';
import "../assets/css/signup.css"
import {useFormik} from 'formik';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import Whatsapp from "../assets/img/whatsapp.webp";
import axios from 'axios';
import { useHistory } from 'react-router';

const Signup = () => {
    const history = useHistory();
    const formik = useFormik({
        initialValues : {
            name : "",
            email:"",
            password:"",
            number:""
        },
        validationSchema : yup.object({
            name : yup.string().required("Name is a required field").strict().trim().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field"),
            email : yup.string().required("Email is a required field").email().strict().trim(),
            password : yup.string().required("Password is a required field").min(5, "Minimum 5 characters must").strict().trim(),
            number:yup.string().required("Number is a required field").max(10,"Maximum 10 digits only").matches(/^[0-9]+$/, "Must be only digits")
        }),
        onSubmit:(userdata,{resetForm}) => {
            axios.post("http://demo.cleversoindia.com/serviceApi/cwebsite/email_exit",{"userEmail":userdata.email}
            ).then(res => {
                if(res.data.response.code === 200) {
                    axios.post("http://demo.cleversoindia.com/serviceApi/cwebsite/phone_exit",{"userPhone":userdata.number}
                    ).then(res1 => {
                        if(res1.data.response.code === 200) {
                            axios.post("http://demo.cleversoindia.com/serviceApi/cwebsite/add_customer",{"customerData":{
                                "userName":userdata.name,
                                 "userPhone":userdata.number,
                                  "userEmail":userdata.email,
                                   "userPassword":userdata.password
                            }}
                            ).then(res2 => {
                                if(res2.data.response.code === 200) {
                                    history.push(`/login`);
                                }
                            })
                        } else {
                            alert("Phone number already exist")
                        }
                    })
                } else {
                    alert("Email already exist")
                }
            })

            resetForm({userdata:""})
        }
    })

    return (
        <div className="signup">
            <div className="container">
                <center>
                    <div className="jumb">
                        <center>
                            <h2>Sign Up</h2>
                            <button className="btn mary btn-block btn-lg"><Link to="/signup">Sign Up with facebook</Link></button>
                            <div className="SignForm-form-line">
                                <i className="SignForm-form-line-ico">or</i>
                                <hr className="divider"/>
                            </div>
                        </center>
                        <form autoComplete="off" className="form-group" onSubmit={formik.handleSubmit}>
                            <label>Name</label>
                            <input placeholder="Name..." className="form-control" type="text"
                            name="name" onChange = {formik.handleChange} value={formik.values.name} />
                            {formik.errors.name && formik.touched.name ?
                                <div className="text-danger">{formik.errors.name}</div> : null
                            }
                            <label>Email</label>
                            <input placeholder="Email..." className="form-control" type="email"
                            name="email" onChange = {formik.handleChange} value={formik.values.email} />
                            {formik.errors.email && formik.touched.email ?
                                <div className="text-danger">{formik.errors.email}</div> : null
                            }
                            <div className="row pads">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"><label>Phone number</label></div>
                                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 add">
                                    <input placeholder="+91" className="form-control addition" type="text" />
                                </div>
                                <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10 add1">
                                    <input placeholder="Enter a number" className="form-control" type="number"
                                    name="number" onChange = {formik.handleChange} value={formik.values.number} />
                                </div>
                                {formik.errors.number && formik.touched.number ?
                                    <div className="text-danger dangerous">{formik.errors.number}</div> : null
                                }
                            </div>
                            <label>Password</label>
                            <input placeholder="Password..." className="form-control" type="password"
                            name="password" onChange = {formik.handleChange} value={formik.values.password} />
                            {formik.errors.password && formik.touched.password ?
                                <div className="text-danger">{formik.errors.password}</div> : null
                            }
                            <label className="checkbox-inline">
                                <input type="checkbox" value="" />
                                I want to receive important notification from over
                                <span><img src={Whatsapp} className="img img-responsive" alt="whatsapp" /></span>
                            </label>
                            <center>
                                <button className="btn btn-danger btn-block btn-lg" type="submit">Sign Up</button>
                            </center>
                            {/* <div>{formValue.name}</div> */}
                        </form>
                        <center>
                            <p>By signing up with us, you agree to our</p>
                            <p><Link to="/signup">Terms of Use</Link> and <Link to="/signup">Privacy Policy</Link></p>
                            <hr/>
                            <p>Already have an account? <Link to="/login">Login</Link></p>
                            <p>Sign up as <Link to="/service">Service Provider</Link></p>
                        </center>
                    </div>
                </center>
            </div>
        </div>
    )
}
export default Signup;