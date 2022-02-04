import React, { useEffect, useRef, useState } from "react";
import "../assets/css/home.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import New from "../assets/img/icon-mini-new.svg";
import { useSelector } from "react-redux";
import Cat from "../assets/img/catag.svg";
import Tik from "../assets/img/tik.svg";
import Umb from "../assets/img/umb.svg";
import Per from "../assets/img/per.svg";
import Pay from "../assets/img/pay.svg";
import Hed from "../assets/img/hed.svg";
import Hmflow from "../assets/img/hmflow.svg";
import House from "../assets/img/housecl.jpeg";
import { Carousel } from "./carousel";
import authAxios from "../service/axios";

const Home = () => {
  const product = useSelector((state) => state.allProduct.product);
  const [serch, setSerch] = useState("");
  const [location, setLocation] = useState([]);
  const [locationid, setLocationId] = useState("");
  const [one, setOne] = useState("");
  const [sub, setSub] = useState([]);
  const [subid, setSubId] = useState("");
  const [store, setstore] = useState({});
  const [store1, setstore1] = useState({});
  const [store2, setstore2] = useState({});
  const [status, setStatus] = useState("");
  const [PopularService, setPopularService] = useState([]);

  const roleRef = useRef();

  const history = useHistory();

  useEffect(() => {
    authAxios
      .post("/cwebsite/get_service")
      .then((res) => {
        setPopularService(res.data.response.data);
        // console.log(res.data.response.data);
      })
      .catch((err) => console.error(err.message));
  }, []);

  const renderList = PopularService.map((products) => {
    return (
      <li key={products.serviceId}>
        <p>
          <Link
            to={
              products.isLast === "0"
                ? `homeCatagory/${products.serviceId}/${products.serviceName}`
                : `/`
            }
          >
            {products.serviceName}
          </Link>
        </p>
      </li>
    );
  });

  const renderList2 = product.map((products) => {
    const { serviceName, serviceId, isLast } = products;
    return (
      <li key={serviceId}>
        <Link
          to={isLast === "0" ? `homeCatagory/${serviceId}/${serviceName}` : `/`}
        >
          <img src={House} className="img img-responsive" alt="kl" />
          <p>{serviceName}</p>
        </Link>
      </li>
    );
  });

  // useEffect(() => {
  //     window.location.reload(false);
  // },[])

  const renderList3 = product.map((products) => {
    const { serviceName, serviceId } = products;
    return (
      <div key={serviceId} className="col-lg-4 col-md-4 col-xs-12">
        <div className="totl">
          <div className="back">
            <div className="grad">{serviceName}</div>
          </div>
          <ul className="list-unstyled">
            {serviceName === "Home" ? (
              <li>
                <Link
                  to={
                    store.isLast === "1" ? `/location/${store.parentId}` : "/"
                  }
                >
                  {store.serviceName}
                </Link>
              </li>
            ) : null}
            {serviceName === "Electrical" ? (
              <li>
                <Link
                  to={
                    store1.isLast === "1" ? `/location/${store1.parentId}` : "/"
                  }
                >
                  {store1.serviceName}
                </Link>
              </li>
            ) : null}
            {serviceName === "Saloon" ? (
              <li>
                <Link
                  to={
                    store2.isLast === "1" ? `/location/${store2.parentId}` : "/"
                  }
                >
                  {store2.serviceName}
                </Link>
              </li>
            ) : null}
          </ul>
          <ul className="list-unstyled">
            <li className="las">
              <Link to="/">
                View all{" "}
                <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  });

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

  const fetchData = async () => {
    await authAxios
      .post("/cwebsite/get_location", { searchValue: serch })
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
      .post("/cwebsite/get_service_by_search", { searchValue: one })
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

  useEffect(() => {
    const subData = async () => {
      const response = await authAxios
        .post("/cwebsite/get_sub_service", { serviceId: 15 })
        .catch((err) => {
          console.error(err.message);
        });
      setstore(response.data.response.data[0]);
    };
    const subData1 = async () => {
      const response = await authAxios
        .post("/cwebsite/get_sub_service", { serviceId: 17 })
        .catch((err) => {
          console.error(err.message);
        });
      setstore1(response.data.response.data[0]);
    };
    const subData2 = async () => {
      const response = await authAxios
        .post("/cwebsite/get_sub_service", { serviceId: 18 })
        .catch((err) => {
          console.error(err.message);
        });
      setstore2(response.data.response.data[0]);
    };

    subData();
    subData1();
    subData2();
  }, []);

  return (
    <div className="home">
      <div className="banner">
        <Link to="/">
          <p>Covid-19: Safety Begins Together</p>
        </Link>
        <h2>Hire the best service providers for your everyday needs</h2>
        <div className="four">
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
        <div className="list">
          <ul className="list-inline">
            <li>
              <h3>Popular:</h3>
            </li>
            {renderList}
          </ul>
        </div>
        <div className="learn container">
          <ul className="list-inline">
            <li>
              <img src={New} alt="new" />
            </li>
            <li>
              <p>
                Reschedule cleaning session instead of cancelling to support our
                vendors.
              </p>
            </li>
            <li>
              <Link to="/">Learn More</Link>
            </li>
            <li>
              <Link to="/">
                <i className="fa fa-chevron-right" aria-hidden="true"></i>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <Carousel />

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
                  Need some help? Tell us what services you need and where do
                  you need them - directly from our website or mobile app.
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
                  Depending on the service, we will send quotes or assign you a
                  vendor at fixed prices. Speed, reliability, value and
                  satisfaction is our priority.
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
                  Hire the right vendor for your job request. Once the vendor
                  completed the job, you can pay them directly from the app.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid fours">
        <div className="text-center">
          <img src={Hmflow} alt="" />
          <h2 className="hss">Popular services on Kaodim</h2>
        </div>
        <div className="ten-columns">
          <ul className="list-inline">{renderList2}</ul>
        </div>
      </div>

      <div className="fives">
        <div className="text-center">
          <h2 className="hss">
            Get instant access to reliable professionals for these services
          </h2>
        </div>
        <div className="container">
          <div className="row">{renderList3}</div>
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
            <p>Get a reservice if the service rendered is unsatisfactory*</p>
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

      <div className="sixs">
        <div className="text-center">
          <h2 className="hss">
            Need tips on home maintenance and more? Read our blog!
          </h2>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <div className="totl">
                <div className="back1 ba"></div>
                <ul className="list-unstyled">
                  <li>
                    <Link to="/">Show your support for lokal businesses!</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <div className="totl">
                <div className="back2 ba"></div>
                <ul className="list-unstyled">
                  <li>
                    <Link to="/">
                      List of the National Recovery Plan SOPs [Updated: 30th
                      September 2021]
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <div className="totl">
                <div className="back3 ba"></div>
                <ul className="list-unstyled">
                  <li>
                    <Link to="/">
                      Kaodim’s top service providers for June 2021!
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <div className="totl">
                <div className="back4 ba"></div>
                <ul className="list-unstyled">
                  <li>
                    <Link to="/">
                      Know your rights to claim your 31 days warranty!
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <div className="totl">
                <div className="back5 ba"></div>
                <ul className="list-unstyled">
                  <li>
                    <Link to="/">
                      Booking a service provider has never been easier.
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <div className="totl">
                <div className="back6 ba"></div>
                <ul className="list-unstyled">
                  <li>
                    <Link to="/">How to double mask properly?</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <div className="totl">
                <div className="back7 ba"></div>
                <ul className="list-unstyled">
                  <li>
                    <Link to="/">Ways to set up an effective home office</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <div className="totl">
                <div className="back8 ba"></div>
                <ul className="list-unstyled">
                  <li>
                    <Link to="/">Why do light bulbs flicker?</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
