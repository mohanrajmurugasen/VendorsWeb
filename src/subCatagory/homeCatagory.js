import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import "../assets/css/homeCatagory.css";
import {
  removeSelectedProduct,
  selectedProduct,
} from "../redux/action/productAction";
import Cat from "../assets/img/catag.svg";
import Tik from "../assets/img/tik.svg";
import Umb from "../assets/img/umb.svg";
import Per from "../assets/img/per.svg";
import Pay from "../assets/img/pay.svg";
import Hed from "../assets/img/hed.svg";
import authAxios from "../service/axios";
import { CImage } from "@coreui/react";

function HomeCatagory() {
  const history = useHistory();
  const product = useSelector((state) => state.products);
  // const { isLast, parentId } = product;
  const { id, name } = useParams();
  const dispatch = useDispatch();
  const [serch, setSerch] = useState("");
  const [one, setOne] = useState("");
  const [location, setLocation] = useState([]);
  const [sub, setSub] = useState([]);
  const [subid, setSubId] = useState("");
  const [status, setStatus] = useState("");
  const [locationid, setLocationId] = useState("");
  const [getSubservice, setgetSubservice] = useState([]);

  const roleRef = useRef();
  const roleRefs = useRef();

  const fetchDatas = async () => {
    const response = await authAxios
      .post("/cwebsite/get_sub_service", {
        serviceId: id,
      })
      .catch((err) => {
        console.error(err.message);
      });
    dispatch(selectedProduct(response.data.response.data[0]));
    setgetSubservice(response.data.response.data);
    // console.log(response.data.response.data);
  };

  roleRefs.current = fetchDatas;

  useEffect(() => {
    if (id && id !== "") return roleRefs.current();

    return () => {
      dispatch(removeSelectedProduct());
    };
  }, [id, dispatch]);

  const fetchData = async () => {
    await authAxios
      .post("/serviceApi/cwebsite/get_location", { searchValue: serch })
      .then((res) => {
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

    await authAxios
      .post("/serviceApi/cwebsite/get_service_by_search", { searchValue: one })
      .catch((err) => {
        console.error(err.message);
      })
      .then((res) => {
        const subi = res.data.response;
        if (one === "") {
          setSub([]);
        } else if (subi.code === 200) {
          setSub(res.data.response.data);
        } else {
          setSub([]);
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  roleRef.current = fetchData;

  useEffect(() => {
    return roleRef.current();
  }, [serch, one]);

  const changeOne = (name, id) => {
    setOne(name);
    setSubId(id);
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

  const navigat = (e) => {
    if (serch !== "" && one !== "" && status === "0") {
      let path = `/dependCatagory/${e}/${locationid}`;
      history.push(path);
    }
  };
  const checkQuote = (x, y, z, a, img, des, quote, quest, amount) => {
    if (x === "1") {
      history.push(`/location/${z}/${a}/${quote}/${quest}/${amount}`);
    } else {
      history.push(`/subservice/${z}/${name}/${a}/${img}/${des}`);
    }
  };

  return (
    <div className="homeCatagory">
      {Object.keys(product).length === 0 ? (
        <div>...Loading</div>
      ) : (
        <div>
          <div className="container one">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 sub">
                <h3>{name}</h3>
                <h2>Your {name} is our priority</h2>
                <p>
                  Whether it's cleaning, repair, installations, or moving
                  services, we can satisfy all your household needs! Rest
                  assured that our service providers are trusted and experienced
                  - satisfaction guaranteed.
                </p>
                <div className="row">
                  {getSubservice.map((itm) => (
                    <div
                      key={itm.serviceId}
                      className="col-lg-6 col-md-6 col-sm-6 col-xs-12 box"
                    >
                      <Link
                        onClick={() =>
                          checkQuote(
                            itm.isLast,
                            itm.parentId,
                            itm.serviceId,
                            itm.serviceName,
                            itm.image,
                            itm.description,
                            itm.haveQuote,
                            itm.haveQuestion,
                            itm.amount
                          )
                        }
                      >
                        <div className="row">
                          <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                            <div>
                              <CImage
                                fluid
                                src={`http://demo.cleversoindia.com/service/asset/service/${itm.image}`}
                              />
                            </div>
                            {/* <img
                              src={`http://demo.cleversoindia.com/service/asset/service/${itm.image}`}
                              alt=""
                              className="img img-responsive"
                            /> */}
                          </div>
                          <div className="col-lg-9 col-md-9 col-sm-9 col-xs-12 spa">
                            <h3>{itm.serviceName}</h3>
                            <p>{itm.description}</p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
              {/* <div className="col-lg-5 col-md-5 col-sm-5 col-xs-12">
                <img src={Img} alt="" className="img img-responsive" />
              </div> */}
            </div>
          </div>

          <div className="container two">
            <div className="text-center">
              <img src={Cat} alt="" />
              <h2>How It Works</h2>
            </div>
            <div className="row">
              <div className="col-sm-4 sec-steps-each">
                <div className="alt-card row">
                  <div className="cover-img col-xs-5 col-sm-12 ims1"></div>
                  <div className="col-xs-7 col-sm-12 text-cent">
                    <h4 className="alt-title">1. Request Services</h4>
                    <p>
                      Need some help? Tell us what services you need and where
                      do you need them - directly from our website or mobile
                      app.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-sm-4 sec-steps-each">
                <div className="alt-card row">
                  <div className="cover-img col-xs-5 col-sm-12 ims2"></div>
                  <div className="col-xs-7 col-sm-12 text-cent">
                    <h4 className="alt-title">2. Get Connected</h4>
                    <p>
                      Depending on the service, we will send quotes or assign
                      you a vendor at fixed prices. Speed, reliability, value
                      and satisfaction is our priority.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-sm-4 sec-steps-each">
                <div className="alt-card row">
                  <div className="cover-img col-xs-5 col-sm-12 ims3"></div>
                  <div className="col-xs-7 col-sm-12 text-cent">
                    <h4 className="alt-title">3. Hire &amp; Pay</h4>
                    <p>
                      Hire the right vendor for your job request. Once the
                      vendor completed the job, you can pay them directly from
                      the app.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container three">
            <div className="text-center top">
              <img src={Cat} alt="" />
              <h2>Why people are choosing us</h2>
            </div>
            <div className="row text-center botm">
              <div className="col-lg-4 col-sm-4 col-xs-12 spa">
                <img src={Tik} alt="" />
                <h3>Kaodim Guarantee</h3>
                <p>
                  Get a reservice if the service rendered is unsatisfactory*
                </p>
              </div>
              <div className="col-lg-4 col-sm-4 col-xs-12 spa">
                <img src={Umb} alt="" />
                <h3>Kaodim Protection</h3>
                <p>
                  Enjoy free protection coverage for damage and theft for Kaodim
                  Protection
                </p>
              </div>
              <div className="col-lg-4 col-sm-4 col-xs-12 spa">
                <img src={Per} alt="" />
                <h3>Kaodim Service Integrity</h3>
                <p>
                  Service providers are background checked and subject to high
                  performance standards set by Kaodim
                </p>
              </div>
              <div className="col-lg-6 col-sm-6 col-xs-12 spa">
                <img src={Pay} alt="" />
                <h3>Kaodim Service Integrity</h3>
                <p>
                  Service providers are background checked and subject to high
                  performance standards set by Kaodim
                </p>
              </div>
              <div className="col-lg-6 col-sm-6 col-xs-12 spa">
                <img src={Hed} alt="" />
                <h3>Kaodim Service Integrity</h3>
                <p>
                  Service providers are background checked and subject to high
                  performance standards set by Kaodim
                </p>
              </div>
            </div>
          </div>

          <div className="four">
            <h2>Looking for other services?</h2>
            <div className="row">
              <div className="col-lg-5 col-sm-5 col-xs-12 spi">
                <h3>SERVICE</h3>
                <input
                  placeholder="What service do you need?"
                  value={one}
                  onChange={(txt) => setOne(txt.target.value)}
                />
              </div>
              <div className="col-lg-5 col-sm-5 col-xs-12 spi">
                <h3>LOCATION</h3>
                <input
                  placeholder="Where do you need it?"
                  value={serch}
                  onChange={(txt) => setSerch(txt.target.value)}
                />
              </div>
              <div className="col-lg-2 col-sm-2 col-xs-12 spi bt">
                <button
                  className={`${status === "0" ? null : "disabled"}`}
                  onClick={() => navigat(subid)}
                >
                  FIND
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-5 col-sm-5 col-xs-12 spo">
                {one !== ""
                  ? sub.map((item) => (
                      <div key={item.serviceId}>
                        <div
                          onClick={() =>
                            changeOne(item.serviceName, item.parentId)
                          }
                        >
                          {item.serviceName}
                        </div>
                      </div>
                    ))
                  : null}
              </div>
              <div className="col-lg-5 col-sm-5 col-xs-12 spo">
                {serch !== ""
                  ? location.map((item) => (
                      <div key={item.locationName}>
                        <div
                          className="local"
                          onClick={() =>
                            change(
                              item.locationName,
                              item.locationId,
                              item.status
                            )
                          }
                        >
                          {item.locationName}
                        </div>
                      </div>
                    ))
                  : null}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomeCatagory;
