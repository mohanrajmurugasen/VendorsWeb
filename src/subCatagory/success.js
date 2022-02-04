import React from 'react';
import "../assets/css/success.css";
import { useHistory, useParams } from 'react-router';
import Img from "../assets/img/Success.png";

export function Success() {
  // const lo = localStorage.getItem('token');
  const history = useHistory();
  const { id } = useParams();

  const view = () => {
    history.push("/history");
  }

  const back = () => {
    history.goBack();
  }

  if(id === "1") {
    return (
      <div className="blog">
        <img src={Img} className="img img-responsive" alt="imh" />
        <div className="text-center"><button onClick={view}>View Enquires</button></div>
      </div>
    );
  } else {
    return (
      <div className="blog2">
        <div>
          <h2>Error</h2>
          <p>Oops, Something went wrong.Please try again later.</p>
          <button className="btn btn-block" onClick={back}>ok</button>
        </div>
      </div>
    );
  }
};