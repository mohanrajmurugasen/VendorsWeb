import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import "../assets/css/vendorEnquire.css";
import authAxios from '../service/axios';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';

export default function VendorEnquire() {

    const [data,setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [remark,setRemark] = useState("");
    const [vId,setVId] = useState("");

    const { id } = useParams();

    const handleClose = () => {
        if(remark === "") {

        }else {
            setOpen(false);
            authAxios.post("/cenquire/give_request_to_vendor",{"requestData":{
                "enquireId": vId,
                "remark":remark,
                "vendorId":id,
             }}).then(res => {
                 if(res.data.response.status === "Success"){
                     setOpen1(true);
                 }
             }).catch(err => {
                 console.error(err.message);
             })
        }
    }

    useEffect(() => {
        authAxios.post("/cenquire/get_customer_enquire",{}).then(res => {
            setData(res.data.response.data);
        }).catch(err => {
            console.error(err.message);
        })
    },[]);

    const getEnquire = (x) => {
        setOpen(true);
        setVId(x);
    }

    const handleClose1 = () => {
        setOpen1(false);
    }

    return (
        <div className="vendorEnquire">
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
                        Fill The Remark
                    </Typography>
                    <TextField id="standard-basic" onChange={txt => setRemark(txt.target.value)} label="Standard" variant="standard" style={{width:"100%",marginTop:"10px",marginBottom:"10px"}} />
                    { remark === "" ? (
                        <Button onClick={handleClose} disabled variant="contained" style={{width: 200,float: "left",marginTop: 20}} color="warning"><h5>Submit</h5></Button>
                    ) : (
                        <Button onClick={handleClose} variant="contained" style={{width: 200,float: "left",marginTop: 20}} color="warning"><h5>Submit</h5></Button>
                    ) }
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
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
  };