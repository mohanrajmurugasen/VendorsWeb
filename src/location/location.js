import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import "../assets/css/location.css";
import Gua from "../assets/img/gua.svg";
import Pro from "../assets/img/pro.png";
import authAxios from "../service/axios";

export const Location = () => {
  const [serch, setSerch] = useState("");
  const [location, setLocation] = useState([]);
  const [locationId, setLocationId] = useState("");
  const [status, setStatus] = useState("");
  const { id, name, quote, quest, amount } = useParams();
  const history = useHistory();

  const navigat = () => {
    if (status === "0") {
      let path = `/question/${id}/${locationId}/${name}/${quote}/${quest}/${amount}`;
      history.push(path);
    }
  };

  const change = (e, a, b) => {
    setStatus(b);
    if (b === "0") {
      setSerch(e);
      setLocationId(a);
    } else {
      setSerch("Currently we are not providing service to this location...");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await authAxios
        .post("/cwebsite/get_location", { searchValue: serch })
        .then((res) => {
          //   console.log(res.data);
          const vari = res.data.response;
          if (serch === "") {
            setLocation([]);
          } else if (vari.code === 200) {
            setLocation(res.data.response.data);
          } else {
            setLocation([]);
          }
        })
        .catch((err) => {
          console.error(err.message);
        });
    };

    fetchData();
  }, [serch]);

  return (
    <div className="location">
      <div className="text-center">
        <h4>Office / Commercial Cleaning</h4>
      </div>
      <div className="one">
        <h3>Where do you need the service?</h3>
        <input
          placeholder="Search for your location"
          value={serch}
          onChange={(txt) => setSerch(txt.target.value)}
        />
        {serch !== ""
          ? location.map((item) => (
              <div key={item.locationName}>
                <div
                  className="local"
                  onClick={() =>
                    change(item.locationName, item.locationId, item.status)
                  }
                >
                  {item.locationName}
                </div>
              </div>
            ))
          : null}
        <button
          className={`btn btn-block ${status === "0" ? null : "disabled"}`}
          onClick={navigat}
        >
          Proceed to next step
        </button>
        <ul className="list-inline">
          <li>
            <p>Book vendors directly on Kaodim to enjoy FREE benefits like</p>
          </li>
          <li>
            <img src={Gua} alt="" />
          </li>
          <li className="las">
            <img src={Pro} alt="" />
          </li>
        </ul>
      </div>
    </div>
  );
};
