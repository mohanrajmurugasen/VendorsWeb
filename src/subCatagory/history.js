import React, { useEffect, useState } from 'react';
import "../assets/css/history.css";
import authAxios from '../service/axios';

function History() {

  const [data,setData] = useState([]);

  useEffect(() => {
    authAxios.post("/cenquire/get_customer_enquire",{}).then(res => {
      setData(res.data.response.data);
    }).catch(err => {
      console.error(err.message);
    })
  },[])

  return (
    <div className="help">
      <h2 className="head">List of Enquires</h2>
      <ul className="list-inline text-center">
        { data.map(itm => (
          <li className="list" key={itm.enquireId}>
            <div className="enq">
              <p><span>ServiceId :</span> {itm.serviceId}</p>
              <div>
                <span>Image : </span>
              <img src={`http://demo.cleversoindia.com/service/asset/service/${itm.image}`} className="img img-responsive" alt="ko" />
              </div>
              <p><span>LocationName :</span> {itm.locationName}</p>
              <p><span>RequestFromDate :</span> {itm.requestFromDate}</p>
              <p><span>RequestToDate :</span> {itm.requestToDate}</p>
              <p><span>ServiceId :</span> {itm.serviceId}</p>
              <p><span>ServiceName :</span> {itm.serviceName}</p>
              <p><span>ShortDescription :</span> {itm.shortDescription}</p>
            </div>
          </li>
        )) }
      </ul>
    </div>
  );
};

export default History;