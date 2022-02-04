import React, { useEffect } from 'react';
import authAxios from '../service/axios';

export const Help = () => {

  useEffect(() => {
    let searchData = {start:0,length:50};
    const fetchData = () => {
      authAxios.post("/cvendor/get_enquire",{searchData})
      .then(res => {
        console.log(res.data);
      }).catch(err => {
        console.error(err.message);
      })
    }
    fetchData();
  },[])

  return (
    <div className="help">
      <h1>Help</h1>
    </div>
  );
};