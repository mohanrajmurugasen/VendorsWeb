import axios from 'axios';
import React, { useEffect } from 'react';
import "../assets/css/allVendorList.css";

export const AllVendorList = () => {

  useEffect(() => {
    axios.post("http://demo.cleversoindia.com/serviceApi/cwebsite/get_vendor_list",{}).then(res => {
      console.log(res.data);
    }).catch(err => {
      console.error(err.message);
    })
  },[])

  return (
    <div className="allVendorList">
      AllVendorList
    </div>
  );
};