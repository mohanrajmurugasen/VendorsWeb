import React from 'react';
import "../assets/css/login.css"
import {useFormik} from 'formik';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { ActionType } from '../redux/type/productType';

const Login = () => {
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues : {
            number:"",
            password:"",
        },
        validationSchema : yup.object({
            password : yup.string().required("Password is a required field").min(5, "Minimum 5 characters must").strict().trim(),
            number:yup.string().required("Number is a required field").max(10,"Maximum 10 digits only").matches(/^[0-9]+$/, "Must be only digits"),
        }),
        onSubmit:(userdata,{resetForm} ) => {
            axios.post("http://demo.cleversoindia.com/serviceApi/clogin/do_login",{"loginData":{
                "userPhone":userdata.number,
                "userPassword":userdata.password
            }}
            ).then(res => {
                if(res.data.response.code === 400) {
                    localStorage.setItem('token',res.data.response.data.token);
                    dispatch({ type: ActionType.LOGIN_SUCCESS});
                    window.location.href="/";
                } else {
                    console.log(res.data.response.status);
                }
            }).catch(err => {
                console.error(err.message);
            })

            resetForm({userdata:""})
        }
    }) 
    return (
        <div className="login">
            <div className="container">
                <center>
                    <div className="jumb">
                        <center>
                            <h2>Login</h2>
                            <button className="btn mary btn-block btn-lg"><Link to="/login">Login with facebook</Link></button>
                            <div className="SignForm-form-line">
                                <i className="SignForm-form-line-ico">or</i>
                                <hr className="divider"/>
                            </div>
                        </center>
                        <form autoComplete="off" className="form-group" onSubmit={formik.handleSubmit}>
                            <label>Mobile number</label>
                            <input placeholder="Enter your mobile number" className="form-control" type="number"
                            name="number" onChange = {formik.handleChange} value={formik.values.number} />
                            {formik.errors.number && formik.touched.number ?
                                <div className="text-danger">{formik.errors.number}</div> : null
                            }
                            <label>Password</label>
                            <input placeholder="Password..." className="form-control" type="password"
                            name="password" onChange = {formik.handleChange} value={formik.values.password} />
                            {formik.errors.password && formik.touched.password ?
                                <div className="text-danger">{formik.errors.password}</div> : null
                            }
                            <center>
                                <button className="btn btn-danger btn-block btn-lg" type="submit">Login</button>
                            </center>
                            {/* <div>{formValue.name}</div> */}
                        </form>
                        <center>
                            <hr className="hariz"/>
                            <p>Don't have an account? Signup as</p>
                            <p><Link to="/service">Service Provider</Link> | <Link to="/signup">Register</Link></p>
                        </center>
                    </div>
                </center>
            </div>
        </div>
    )
}
export default Login;