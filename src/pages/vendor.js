import React, { useEffect, useState } from 'react';
import "../assets/css/vendor.css";
import Bot from "../assets/img/ic_ppe.webp";
import Bot1 from "../assets/img/ic_miti.webp";
import Bot2 from "../assets/img/ic_champion.webp";
import authAxios from '../service/axios';
import ReactPaginate from "react-paginate";
import { useHistory } from 'react-router';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

function Vendor() {
    
    const [users,setUsers] = useState([]);
    const [pageNumber,setPageNumber] = useState(0);
    const [search,setSearch] = useState("");
    const [serviceId,setServiceId] = useState(null);
    const [locationId,setLocationId] = useState(null);
    const [list,setList] = useState("");
    const [sortBy,setSortBy] = useState(null);
    const [serch,setSerch] = useState("");
    const [location,setLocation] = useState([]);
    const [one,setOne] = useState("");
    const [sub,setSub] = useState([]);
    const [enquire,setenquire] = useState("");
    const [message1,setMessage] = useState("");

    const [open, setOpen] = useState(false);
    const handleClose = () => {
        history.push("/");
        setOpen(false);
    }
    const handleClose1 = () => {
        history.push("/login");
        setOpen(false);
    }

    const history = useHistory();

    const userPerPage = 3;
    const pagesVisited = pageNumber * userPerPage;

    const pageCount = Math.ceil(users.length / userPerPage);

    useEffect(() => {
        const fetchData = async () => {
            await authAxios.post("/cwebsite/get_location",{searchValue:serch})
            .then((res) => {
                const vari = res.data.response;
                if(serch === "") {
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

            await authAxios.post("/cwebsite/get_service_by_search",{searchValue:one}).catch(err => {
                console.error(err.message);
            }).then(res => {
                const subi = res.data.response;
                if(one === "") {
                    setSub([]);
                } else if(subi.code === 200) {
                    setSub(res.data.response.data);
                } else {
                    setSub([]);
                }
            }).catch(err => {
                console.error(err.message);
            }) 
        } 
        
        fetchData();  

    },[serch,one])

    const change = (e,a,b) => {
        if(b === "0") {
            setSerch(e);
            setLocationId(a);
        } else {
            setSerch("Currently we are not providing service to this location...");
        }
    }

    const changePage = ({selected}) => {
        setPageNumber(selected);
    }

    useEffect(() => {
        authAxios.post("/cenquire/check_enquire",{})
        .then(res => {
          setenquire(res.data.response.status);
        }).catch(err => {
          console.error(err.message);
        })
      },[])

    const request = (x) => {
        if(localStorage.getItem('token') === null) {
            setMessage("please try again after login...");
            setOpen(true);
        } else if(enquire === "Failed") {
            setMessage("Please fill the enquires...");
            setOpen(true);
        } else {
            alert("success");
            history.push(`/vendorEnquire/${x}`);
        }
    }

    const displayUsers = users.slice(pagesVisited, pagesVisited + userPerPage)
    .map(item => {
        return (
            <div className="pers" key={item.vendorId}>
                <div className="row persbot">
                    <div className="col-lg-2 col-md-2 col-sm-12 imhg">
                        <img className="img img-responsive" alt="person" src={`http://demo.cleversoindia.com/serviceApi/uploads//profile_vendor/${item.vendorProfile}`} />
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 cent">
                        <h2>{item.vendorName}</h2>
                        <ul className="list-inline lus">
                            <li>
                                <ul className="list-inline">
                                    <li><span>{item.rating}</span><i className="fa fa-star" aria-hidden="true"></i></li>
                                    <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                    <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                    <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                    <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                </ul>
                            </li>
                            <li>1007 ratings .</li>
                            <li>956 review</li>
                        </ul>
                        <p>{item.shortDescription}</p>
                        <h4><i className="fa fa-map-marker" aria-hidden="true"></i>{item.locationName}</h4>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12 buts">
                        <button onClick={() => request(item.vendorId)}>Request this vendor</button>
                    </div>
                </div>
                <ul className="list-inline las">
                    <li className="lists">
                        <ul className="list-inline las">
                            <li className="hun"><span><img className="img img-responsive" alt="person" src={Bot} /></span></li>
                            <li>Covid-19 Full PPE</li>
                        </ul>
                    </li>
                    <li className="lists">
                        <ul className="list-inline las">
                            <li className="hun"><img className="img img-responsive" alt="person" src={Bot} /></li>
                            <li>Covid-19 Trained</li>
                        </ul>
                    </li>
                    <li className="lists">
                        <ul className="list-inline las">
                            <li className="hun"><img className="img img-responsive" alt="person" src={Bot1} /></li>
                            <li>Approved by MITI</li>
                        </ul>
                    </li>
                    <li className="lists">
                        <ul className="list-inline las">
                            <li className="hun"><img className="img img-responsive" alt="person" src={Bot2} /></li>
                            <li>Champion Vendor</li>
                        </ul>
                    </li>
                </ul>
                <hr/>
                <p className="lastpara">Last service completed on 31 Jul 2021</p>
            </div>
        )
    })

    useEffect(() => {
        const fetchData = () => {
            let searchData = [{serviceId: serviceId,locationId: locationId,list: list,sortBy: sortBy,vendorName: search}];
            authAxios.post("/cwebsite/get_vendor_list",{searchData}).then(res => {
                setUsers(res.data.response.data.data);
                }).catch(err => {
                console.log(err.message);
                })   
        }

        fetchData();
    },[search,serviceId,locationId,sortBy,list])

    const changeOne = (name,id) => {
        setOne(name);
        setServiceId(id);
    }

        return (
            <div className="vendor">
                
                <div className="banner">
                    <h2>Explore Kaodim Vendor Directory</h2>
                    <span>Hire verified vendors, trained & certified to keep you safe</span>
                    <p>Get covered with FREE benefits like</p>
                </div>

                <div className="search">
                    <div className="container">

                        <div className="box">
                            <form>
                                <div className="form-group row">
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 paad">
                                        <label>SEARCH BY SERVICE</label>
                                        <input className="form-control" placeholder="Service type (optional)" value={one} onChange={txt => setOne(txt.target.value)} type="text"/>
                                        { (one !== "") ? 
                                            (
                                                sub.map((item) => (
                                                    <div key={item.serviceId}>
                                                        <div className="local" onClick={() => changeOne(item.serviceName,item.parentId)}>{item.serviceName}</div>
                                                    </div>
                                                ))
                                            ) : null
                                        }
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 paad">
                                        <label>LOCATION</label>
                                        <input className="form-control" placeholder="Your location (optional)" value={serch} onChange={txt => setSerch(txt.target.value)} type="text"/>
                                        { (serch !== "") ? 
                                            (
                                                location.map((item) => (
                                                    <div key={item.locationName}>
                                                        <div className="local" onClick={() => change(item.locationName,item.locationId,item.status)}>{item.locationName}</div>
                                                    </div>
                                                ))
                                            ) : null
                                        }
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 paad">
                                        <button type="submit" className="btn btn-default">SHOW VENDORS</button>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="box1">
                            <form autoComplete="off" className="form-group">
                                <ul className="list-inline">
                                    <li><button type="submit" className="btn btn-block one">Sort by</button></li>
                                    <li className="dropdown">
                                        <select className="form-control sort" onChange={txt => setSortBy(txt.target.value)}>
                                            <option>--Select--</option>
                                            <option value="3">Avarage Rated Worker</option>
                                            <option value="4">Excelent Rated Worker</option>
                                        </select>
                                    </li>
                                    <li className="lef">
                                        <input className="form-control" placeholder="Search by vendor name" onChange={txt => setSearch(txt.target.value)} type="text"/>
                                    </li>
                                    <li>
                                        <select className="form-control sort" onChange={txt => setList(txt.target.value)}>
                                            <option>--Select--</option>
                                            <option value="0-50">50</option>
                                            <option value="50-100">100</option>
                                            <option value="All">All</option>
                                        </select>
                                    </li>
                                </ul>
                            </form>
                        </div>
                        <div className="clearfix"></div>

                        <div className="box2">
                            <div className="first">

                                { displayUsers }

                            </div>

                            <div className="number">
                                <ReactPaginate 
                                    previousLabel={"Previous"}
                                    nextLabel={"Next"}
                                    pageCount={pageCount}
                                    onPageChange={changePage}
                                    containerClassName={"paginationBttns"}
                                    previousLinkClassName={"previousBttn"}
                                    nextLinkClassName={"nextBttn"}
                                    disabledClassName={"paginationDisabled"}
                                    activeClassName={"paginationActive"}
                                />
                            </div>

                        </div>

                    </div>
                </div>

                <Modal
                    open={open}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        <h2 style={{color: "darkgray",letterSpacing: "1px"}}>Oops! Sorry</h2>
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <h5 style={{color: "gray",letterSpacing: "1px"}}>{message1}</h5>
                    </Typography>
                    { (message1 === "please try again after login...") ? (
                        <Button onClick={handleClose1} variant="contained" style={{width: 200,float: "left",marginTop: 20}} color="warning"><h5>Ok</h5></Button>
                    ) : (
                        <Button onClick={handleClose} variant="contained" style={{width: 200,float: "left",marginTop: 20}} color="warning"><h5>Ok</h5></Button>
                    )}
                    </Box>
                </Modal>

            </div>
        )
}
export default Vendor;

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