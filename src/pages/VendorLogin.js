import React from 'react';
import "../assets/css/vendorlogin.css"
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { ActionType } from '../redux/type/productType';

const VendorLogin = () => {

    const { register,handleSubmit,formState: { errors } } = useForm();
    const dispatch = useDispatch();

    const onSubmit = async (data) => {
        axios.post("http://demo.cleversoindia.com/serviceApi/cvlogin/do_login",{"loginData":{
            "vendorName":data.vendorName,
            "vendorPassword":data.vendorPassword
        }}).then(res => {
            const result = res.data.response.data.userData.verifiedStatus;
            if(result === "1") {
                localStorage.setItem('vendor',res.data.response.data.token);
                dispatch({ type: ActionType.VENDOR_SUCCESS});
                window.location.href="/";
            } else if(result === "0") {
                alert("Not verify");
            }
        }).catch(err => {
            alert("User not exist");
        })
    }
    
    return (
        <div className="vendorLogin">
            <div className="container">
                <center>
                    <div className="jumb">
                        <center>
                            <h2>Vendors Login</h2>
                            <button className="btn mary btn-block btn-lg"><Link to="/login">Login with facebook</Link></button>
                            <div className="SignForm-form-line">
                                <i className="SignForm-form-line-ico">or</i>
                                <hr className="divider"/>
                            </div>
                        </center>
                        <form autoComplete="off" className="form-group" onSubmit={handleSubmit(onSubmit)}>
                            <label>Vendor Phone Number</label>
                            <input placeholder="Enter Name..." className="form-control" type="text"
                            name="vendorName" {...register('vendorName',{ required: true })} />
                            {errors.vendorName && errors.vendorName.type === "required" && (<span style={{color:"red",float:"left"}}>This field is required</span>)}
                            <label>Vendor Password</label>
                            <input placeholder="Password..." className="form-control" type="password"
                            name="vendorPassword" {...register('vendorPassword')} />
                            <center>
                                <button className="btn btn-danger btn-block btn-lg" type="submit">Login</button>
                            </center>
                        </form>
                        <center>
                            <hr className="hariz"/>
                            <p>Don't have an account? Signup as</p>
                            <p><Link to="/service">Service Provider</Link> | <Link to="/vendorRegister">Register</Link></p>
                        </center>
                    </div>
                </center>
            </div>
        </div>
    )
}
export default VendorLogin;