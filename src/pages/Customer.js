import React, { useState } from 'react';
import "../assets/css/customer.css";
import { useForm, useFieldArray } from 'react-hook-form';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

export default function Customer() {

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
    } = useForm();

    const {
        fields,
        append,
        remove
    } = useFieldArray({ control, name: "reason" });

    const data = [
        {enquireId: '1', serviceId: '15', requestFromDate: '2021-11-15', requestToDate: '2021-11-15', serviceName: 'Home', shortDescription: "Test", image: "dummy.jpg", locationName: "Coimbatore,vadavalli"},
        {enquireId: '3', serviceId: '15', requestFromDate: '2021-11-04', requestToDate: '2021-11-15', serviceName: 'Home', shortDescription: "Test", image: "dummy.jpg", locationName: "Coimbatore,vadavalli"},
        {enquireId: '4', serviceId: '15', requestFromDate: '2021-11-17', requestToDate: '2021-11-17', serviceName: 'Home', shortDescription: "Test", image: "dummy.jpg", locationName: "Coimbatore,vadavalli"},
        {enquireId: '5', serviceId: '15', requestFromDate: '2021-11-23', requestToDate: '2021-11-18', serviceName: 'Home', shortDescription: "Test", image: "dummy.jpg", locationName: "Coimbatore,vadavalli"},
    ];

    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    // const [tools,setTools] = useState("");
    // const [amount,setAmount] = useState("");
    const [eId,setEId] = useState("");

    const getEnquire = (x) => {
        setOpen(true);
        setEId(x);
    }

    const handleClose1 = () => {
        setOpen1(false);
    }

    // const a = [];
    // const b = [];

    const onSubmit = (data) => {
      // for(let i=0;i<data.reason.length;i++) {
      //   a.push({tools: data.reason[i].tools});
      //   b.push({amount: data.reason[i].amount});
      // }
      // let list = {
      //   enquireId: eId,
      //   reason: [{tools:a},{amount:b}]
      // }
      let list = {
        enquireId: eId,
        reason: data.reason
      }
      console.log(list);
    }

    return (
        <div className="customerEnquire">
            <h2 className="head">List By Enquires</h2>
            <ul className="list-unstyled">
                { data.map(itm => (
                <li className="list" key={itm.enquireId} onClick={() => getEnquire(itm.enquireId)}>
                    <div className="row enq list-inline">
                        <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">
                            <h3 className="profile">Profile</h3>
                            <div className="imgs">
                                <img src={`http://demo.cleversoindia.com/service/asset/service/${itm.image}`} className="img img-responsive" alt="ko" />
                            </div>
                        </div>
                        <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                            <ul className="list-inline las">
                                <li><span>LocationName :</span> {itm.locationName}</li>
                                <li><span>RequestFromDate :</span> {itm.requestFromDate}</li>
                                <li><span>RequestToDate :</span> {itm.requestToDate}</li>
                                <li><span>ServiceName :</span> {itm.serviceName}</li>
                                <li><span>ShortDescription :</span> {itm.shortDescription}</li>
                            </ul>
                        </div>
                    </div>
                </li>
                )) }
            </ul>
                <Modal
                    open={open}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" style={{color: "darkgray",letterSpacing: "1px",fontSize:"25px"}}>
                        Reason for payments
                    </Typography>
                    <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} style={{paddingTop:"25px"}} className="form-group lastForm">
                                { fields.map((item,index) => (
                                  <div key={item.id} className="row" style={{paddingBottom:"20px"}}>
                                    <div className="col-lg-5 col-md-5 col-sm-5 col-xs-10">
                                        <label
                                        style={{fontSize:"17px",color:"gray"}}
                                        >Choose Tools <span></span></label>
                                        <div className="row">
                                            <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                                              <input className="form-control" type="text" placeholder="Enter tools name"
                                                style={{marginBottom: "5px",padding: "10px 10px"}}
                                                name={`reason[${index}].tools`}
                                                {...register(`reason[${index}].tools`)}
                                                />
                                                {errors.proofTypeId && errors.proofTypeId.type === "required" && (<span style={{color:"red",float:"left"}}>This field is required</span>)}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-5 col-md-5 col-sm-5 col-xs-10">
                                        <label
                                        style={{fontSize:"17px",color:"gray",paddingBottom:"5px"}}
                                        >Valuable Amount <span></span></label>
                                        <div className="row">
                                            <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                                                <input className="form-control" type="number" placeholder="Emter amount"
                                                style={{marginBottom: "5px",padding: "10px 10px"}}
                                                name={`reason[${index}].amount`}
                                                {...register(`reason[${index}].amount`)}
                                                />
                                                {errors.user_proof && errors.user_proof.type === "required" && (<span style={{color:"red",float:"left"}}>This field is required</span>)}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                                      <ul className="list-inline field">
                                        <li style={{marginTop:"25px"}} className="btn bg-primary remove" onClick={() => remove(index)}>Remove</li>
                                      </ul>
                                    </div>
                                  </div>
                                )) }
                                <ul className="list-inline field">
                                    <li className="btn bg-primary add" style={{float:"right",marginTop:"20px",marginBottom:"30px"}} onClick={() => {
                                        append({ tools: "", amount: "" });
                                    }}>Add details</li>
                                </ul>
                                <center>
                                    <button className="btn btn-danger btn-block btn-lg" type="submit">Submit</button>
                                </center>
                    </form>
                    </Box>
                </Modal>
                <Modal
                    open={open1}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" style={{color: "darkgray",letterSpacing: "1px",fontSize:"25px"}}>
                        Your request is done successfully.
                    </Typography>
                    <Button onClick={handleClose1} variant="contained" style={{width: 200,float: "left",marginTop: 20}} color="success"><h5>Submit</h5></Button>
                    </Box>
                </Modal>
        </div>
    )
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 5,
  };