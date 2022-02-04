import React, { useEffect, useState } from 'react';
import "../assets/css/vendorRegister.css";
import { Link } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import axios from 'axios';
import { useHistory } from 'react-router';

const VendorRegister = () => {

    const [button,setButton] = useState("Next");
    const [count,setCount] = useState(0);
    const [search,setSearch] = useState("");
    const [data,setData] = useState([]);
    const [proof,setProof] = useState([]);
    const [phone,setPhone] = useState("");
    const [phoneValid,setPhoneValid] = useState();
    const [email,setEmail] = useState("");
    const [emailValid,setEmailValid] = useState();
    const [grp,setgrp] = useState([]);
    const [grp1,setgrp1] = useState([]);
    const [selectedFile, setSelectedFile] = useState();
    const [uniKeys1,setUnikeys1] = useState([]);
    const [uniKeys2,setUnikeys2] = useState([]);
    const [serchng,setSerchng] = useState("");
    const [location,setLocation] = useState([]);
    const [locationId,setLocationId] = useState("");

    const history = useHistory();

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        watch
    } = useForm();

    const {
        fields,
        append,
        remove
    } = useFieldArray({ control, name: "categoryList" });

    useEffect(() => {
        if(count === 2) {
            setButton("Submit");
        }
    },[count])

    const change = (e,a,b) => {
        if(b === "0") {
            setSerchng(e);
            setLocationId(a);
        } else {
            setSerchng("Currently we are not providing service to this location...");
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            await axios.post("http://demo.cleversoindia.com/serviceApi/cwebsite/get_location",{searchValue:serchng})
            .then((res) => {
                const vari = res.data.response;
                if(serchng === "") {
                    setLocation([]);
                } else if(vari.code === 200) {
                    setLocation(res.data.response.data);
                } else {
                    setLocation([]);
                }
            })
            .catch(err => {
                console.error(err.message);
            });
        } 
        
        fetchData();
    },[serchng])

    useEffect(() => {
        axios.post("http://demo.cleversoindia.com/serviceApi/cwebsite/get_service_by_search",{"searchValue":search})
        .then(res => {
            setData(res.data.response.data);
        }).catch(err => {
            console.error(err.message);
        })
    },[search])

    useEffect(() => {

        axios.post("http://demo.cleversoindia.com/serviceApi/cwebsite/vendor_phone_validate",{"vendorPhone":phone}).then(res => {
            setPhoneValid(res.data.response.code);
        }).catch(err => {
            console.error(err.message);
        })

    },[phone])

    useEffect(() => {

        axios.post("http://demo.cleversoindia.com/serviceApi/cwebsite/vendor_email_validate",{"vendorEmail":email}).then(res => {
            setEmailValid(res.data.response.code);
        }).catch(err => {
            console.error(err.message);
        })

    },[email])

    useEffect(() => {
        axios.post("http://demo.cleversoindia.com/serviceApi/cwebsite/proofType",{}).then(res => {
            setProof(res.data.response.data);
        }) 
    },[])

    const validateUserPhone = async (value) => {
        if(value !== "" || phoneValid !== 200) {
            return true;
        } else {
            return false;
        }
    }

    const validateUserEmail = async (value) => {
        if(value !== "" || emailValid !== 200) {
            return true;
        } else {
            return false;
        }
    }
    const obj = [...new Map(grp.map(item => [JSON.stringify(item), item])).values()];

    const onSubmit = async (data) => {
        const setPrf = [];
        const setPrf1 = [];
        data.categoryList.map(itm => {
          return setPrf.push({user_proof: itm.user_proof[0]});
        })
        data.categoryList.map(itm => {
          return setPrf1.push({proofTypeId: itm.proofTypeId});
        })
        const fieldes = {
            vendorName: data.vendorName,
            vendorPhone: data.vendorPhone,
            vendorEmail: data.vendorEmail,
            vendorPassword: data.vendorPassword,
            dob: data.dob,
            experience: data.experience,
            fName: data.fName,
            lName: data.lName,
            perDayChg: data.perDayChg,
            perHourChg: data.perHourChg,
            remark: data.remark,
            locationId: locationId,
            profile: selectedFile,
            categoryList: obj,
            proofList: setPrf1,
            proof: setPrf
        };

        if(button === "Next") {
            setCount(count + 1);
        } else if(button === "Submit") {
            const formData = new FormData();
            formData.append('profile', fieldes.profile);
            let proofCount = fieldes.proof.length;
            for(let i=0;i<proofCount;i++){
                formData.append('user_proof_'+i,fieldes.proof[i].user_proof);
            }
            formData.append('vendorData',JSON.stringify(fieldes));

            axios.post("http://demo.cleversoindia.com/serviceApi/cwebsite/vendor",formData).then(res => {
                if(res.data.response.code === 200) {
                    alert("Registration successfully");
                    history.push("/vendorlogin");
                } else {
                    alert("Registration Failed Try Again Later");
                }
            }).catch(err => {
                console.error(err.message);
            });
        }
    }

    const onFileChange = event => {
        setSelectedFile(event.target.files[0]);
    };

    const saves = (x,y) => {
        setgrp(grp => [...grp,{serviceId: x}]);
        setgrp1(grp1 => [...grp1,{serviceName: y}]);
        setSearch("");
    }

    useEffect(() => {
        setUnikeys1([...(new Set(grp1.map(({ serviceName }) => serviceName)))]);
        setUnikeys2([...(new Set(grp.map(({ serviceId }) => serviceId)))]);
    },[grp1,grp])

    const removes = (index) => {
        const newArr = [...uniKeys1];
        const newArr1 = [...uniKeys2];
        newArr.splice(index, 1);
        newArr1.splice(index, 1);
        setUnikeys1(newArr);
        setUnikeys2(newArr1);
    }
    
    return (
        <div className="vendorSignup">
            <div className="container">
                <center>
                    <div className="jumb">
                        <center>
                            <h2>Vendor Sign Up</h2>
                            <button className="btn mary btn-block btn-lg"><Link to="/signup">Vendor Sign Up with facebook</Link></button>
                            <div className="SignForm-form-line">
                                <i className="SignForm-form-line-ico">or</i>
                                <hr className="divider"/>
                            </div>
                        </center>
                        <form autoComplete="off" className="form-group" onSubmit={handleSubmit(onSubmit)}>
                            { (count === 0) ? (
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <label>First Name <span>*</span></label>
                                        <input placeholder="Enter your first name" className="form-control" type="text"
                                        name="fName" {...register('fName', { required: true, pattern: /^[A-Za-z]+$/i })} />
                                        {errors.fName && errors.fName.type === "required" && <span style={{color:"red",float:"left"}}>This is required</span>}
                                        {errors.fName && errors.fName.type === "pattern" && <span style={{color:"red",float:"left"}}>Numeric values are not allowed</span>}
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <label>Last Name <span>*</span></label>
                                        <input placeholder="Enter your last name" className="form-control" type="text"
                                        name="lName" {...register('lName', { required: true, pattern: /^[A-Za-z]+$/i })} />
                                        {errors.lName && errors.lName.type === "required" && <span style={{color:"red",float:"left"}}>This is required</span>}
                                        {errors.lName && errors.lName.type === "pattern" && <span style={{color:"red",float:"left"}}>Numeric values are not allowed</span>}
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <label>User Name <span>*</span></label>
                                        <input placeholder="Enter user name" className="form-control" type="text"
                                        name="vendorName" {...register('vendorName', { required: true, pattern: /^[A-Za-z]+$/i })} />
                                        {errors.vendorName && errors.vendorName.type === "required" && <span style={{color:"red",float:"left"}}>This is required</span>}
                                        {errors.vendorName && errors.vendorName.type === "pattern" && <span style={{color:"red",float:"left"}}>Numeric values are not allowed</span>}
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <label>User profile</label>
                                        <input className="form-control" type="file"
                                        name="profile" onChange={onFileChange} />
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <label>Email <span>*</span></label>
                                        <input placeholder="Enter email" className="form-control" type="email"
                                        name="vendorEmail" {...register('vendorEmail',{ required: true, validate: validateUserEmail, pattern: /^\S+@\S+$/i })} onChange={txt => setEmail(txt.target.value)} />
                                        {errors.vendorEmail && errors.vendorEmail.type === "required" && (<span style={{color:"red",float:"left"}}>This field is required</span>)}
                                        {errors.vendorEmail && errors.vendorEmail.type === "validate" && <span style={{color:"red",float:"left"}}>Already used</span>}
                                        {errors.vendorEmail && errors.vendorEmail.type === "pattern" && <span style={{color:"red",float:"left"}}>Enter valid email</span>}
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <div className="row pads">
                                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"><label>Phone number <span>*</span></label></div>
                                            <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 add">
                                                <input placeholder="+91" className="form-control addition" type="text" />
                                            </div>
                                            <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10 add1">
                                                <input placeholder="Enter mobile number" className="form-control" type="number"
                                                name="vendorPhone" {...register('vendorPhone',{ required: true, validate: validateUserPhone, maxLength: 10, minLength: 10, pattern: /^[0-9\b]+$/ })} onChange={txt => setPhone(txt.target.value)} />
                                                {errors.vendorPhone && errors.vendorPhone.type === "required" && (<span style={{color:"red",float:"left"}}>This field is required</span>)}
                                                {errors.vendorPhone && errors.vendorPhone.type === "validate" && <span style={{color:"red",float:"left"}}>Already used</span>}
                                                {errors.vendorPhone && errors.vendorPhone.type === "minLength" && <span style={{color:"red",float:"left"}}>Minimum length 10</span>}
                                                {errors.vendorPhone && errors.vendorPhone.type === "pattern" && <span style={{color:"red",float:"left"}}>Enter valid number</span>}
                                                {errors.vendorPhone && errors.vendorPhone.type === "maxLength" && <span style={{color:"red",float:"left"}}>Maximum length 8</span>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <label>Password <span>*</span></label>
                                        <input placeholder="Enter password" className="form-control" type="password"
                                        name="vendorPassword" {...register('vendorPassword', { required: true, minLength: 8 })} />
                                        {errors.vendorPassword && errors.vendorPassword.type === "required" && <span style={{color:"red",float:"left"}}>This is required</span>}
                                        {errors.vendorPassword && errors.vendorPassword.type === "minLength" && <span style={{color:"red",float:"left"}}>Must minimum 8 characters</span>}
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <label>Confirm password <span>*</span></label>
                                        <input placeholder="Re-enter password" className="form-control" type="password"
                                        name="confirmPassword" {...register('confirmPassword', { validate: (value) => value === watch('vendorPassword') })} />
                                        {errors.confirmPassword && errors.confirmPassword.type === "validate" && <span style={{color:"red",float:"left"}}>Password mismatch</span>}
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <label>Date of birth <span>*</span></label>
                                        <input className="form-control" type="date"
                                        name="dob" {...register('dob',{ required: true })} 
                                        />
                                        {errors.dob && errors.dob.type === "required" && (<span style={{color:"red",float:"left"}}>This field is required</span>)}
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <label>Location <span>*</span></label>
                                        <input className="form-control" type="text"
                                        name="Enter your location" {...register('locationId',{ required: true })} 
                                        value={serchng} onChange={txt => setSerchng(txt.target.value)}
                                        />
                                        {errors.locationId && errors.locationId.type === "required" && (<span style={{color:"red",float:"left"}}>This field is required</span>)}
                                        { (serchng !== "") ? 
                                            (
                                                location.map((item) => (
                                                    <div key={item.locationName}>
                                                        <div className="local" onClick={() => change(item.locationName,item.locationId,item.status)}>{item.locationName}</div>
                                                    </div>
                                                ))
                                            ) : null
                                        }
                                    </div>
                                </div>
                            ) : null }

                            { (count === 1) ? (
                            <div className="row">
                                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                    <label>Experience <span>*</span></label>
                                    <input placeholder="Enter your experience" className="form-control" type="number"
                                    name="experience" {...register('experience',{ required: true, max: 11 })} />
                                        {errors.experience && errors.experience.type === "required" && (<span style={{color:"red",float:"left"}}>This field is required</span>)}
                                        {errors.experience && errors.experience.type === "max" && (<span style={{color:"red",float:"left"}}>Maximum experience is 11</span>)}
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                    <label>Per hour charges <span>*</span></label>
                                    <input placeholder="Enter charges" className="form-control" type="number"
                                    name="perHourChg" {...register('perHourChg',{ required: true })} />
                                    {errors.perHourChg && errors.perHourChg.type === "required" && (<span style={{color:"red",float:"left"}}>This field is required</span>)}
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                    <label>Per day charges <span>*</span></label>
                                    <input placeholder="Enter charges" className="form-control" type="number"
                                    name="perDayChg" {...register('perDayChg',{ required: true })} />
                                    {errors.perDayChg && errors.perDayChg.type === "required" && (<span style={{color:"red",float:"left"}}>This field is required</span>)}
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>Intrested field <span>*</span></label>
                                    <input type="text" className="form-control" placeholder="Search field" 
                                    name="intrestedField" {...register('intrestedField',{ required: true })}
                                    onChange={(e) => setSearch(e.target.value)} value={search} />
                                    {errors.intrestedField && errors.intrestedField.type === "required" && (<span style={{color:"red",float:"left"}}>This field is required</span>)}
                                    <ul className="list-unstyled serch">
                                        { (search !== "") ? (data && data.map((x,i) => (
                                        <li key={i} onClick={() => saves(x.serviceId,x.serviceName)}>{x.serviceName}</li>
                                        ))) : null }
                                    </ul>
                                    { (uniKeys1.length>0) ? (
                                        <ul className="list-inline serch1">
                                            { uniKeys1.map((itm,i) => (
                                                <li key={itm}>
                                                    {itm} 
                                                    <span style={{color: "#000000d6",fontSize: "12px",fontWeight: "bold"}} onClick={() => removes(i)}>
                                                        x
                                                    </span>
                                                </li>
                                            )) }
                                        </ul>
                                    ) : null }
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <label>About your work & experience</label>
                                    <textarea placeholder="Type somting about you..." className="form-control" rows="4" cols="50"
                                    name="remark" {...register('remark')}
                                    ></textarea>
                                </div>
                            </div>
                            ) : null }

                            { (count === 2) ? (
                            <>
                                { fields.map((item,index) => (
                                  <div key={item.id} className="row">
                                    <div className="col-lg-5 col-md-5 col-sm-5 col-xs-10">
                                        <label>Select proof type <span>*</span></label>
                                        <div className="row">
                                            <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                                                <select className="form-control" 
                                                name={`categoryList[${index}].proofTypeId`} 
                                                defaultValue={item.proofTypeId}
                                                {...register(`categoryList[${index}].proofTypeId`)}
                                                >
                                                    <option value="">Select Option</option>
                                                    { proof.map((item) => (
                                                        <option key={item.proofTypeId} value={item.proofTypeId}>{item.proofTypeValue}</option>
                                                    )) }
                                                </select>
                                                {errors.perDayChg && errors.perDayChg.type === "required" && (<span style={{color:"red",float:"left"}}>This field is required</span>)}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-5 col-md-5 col-sm-5 col-xs-10">
                                        <label>Upload file <span>*</span></label>
                                        <div className="row">
                                            <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                                                <input className="form-control" type="file"
                                                style={{marginBottom: "5px",padding: "10px 10px"}}
                                                name={`categoryList[${index}].user_proof`} 
                                                defaultValue={item.user_proof}
                                                {...register(`categoryList[${index}].user_proof`)}
                                                />
                                                {errors.user_proof && errors.user_proof.type === "required" && (<span style={{color:"red",float:"left"}}>This field is required</span>)}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                                      <ul className="list-inline field">
                                        <li className="btn bg-primary one" onClick={() => remove(index)}>Remove</li>
                                      </ul>
                                    </div>
                                  </div>
                                )) }
                                <ul className="list-inline field">
                                    <li className="btn bg-primary two sample" onClick={() => {
                                        append({ proofTypeId: "", user_proof: "" });
                                    }}>Add details</li>
                                </ul>
                            </>
                            ) : null }

                            <center>
                                <button className="btn btn-danger btn-block btn-lg" type="submit">{button}</button>
                            </center>
                        </form>
                        <center>
                            <p>By signing up with us, you agree to our</p>
                            <p><Link to="/signup">Terms of Use</Link> and <Link to="/signup">Privacy Policy</Link></p>
                            <hr/>
                            <p>Already have an account? <Link to="/vendorlogin">Login</Link></p>
                            <p>Sign up as <Link to="/service">Service Provider</Link></p>
                        </center>
                    </div>
                </center>
            </div>
        </div>
    )
}
export default VendorRegister;