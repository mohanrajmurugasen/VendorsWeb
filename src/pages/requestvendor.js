import React, { Component } from 'react';
import "../assets/css/requestvendor.css";
import Bantop from "../assets/img/person2.png";
import Verify from "../assets/img/verify.svg";
import Cond from "../assets/img/cond.jpg";
import Cond1 from "../assets/img/cond1.jpg";
import Cond2 from "../assets/img/cond2.jpg";
import Play from "../assets/img/play.svg";
import Play2 from "../assets/img/play2.svg";
import Images from "../assets/img/image.jpeg";
import Pers from "../assets/img/pers.svg";

class RequestVendor extends Component {
    render () {
        return (
            <div className="requestvendor">
                <div className="container">

                    <div className="banner">
                        <div className="imgs">
                            <ul className="list-inline">
                                <li>
                                    <button><i className="fa fa-bookmark-o" aria-hidden="true"></i>Add as favourite</button>
                                </li>
                                <li>
                                    <button><i className="fa fa-share-alt-square" aria-hidden="true"></i>Share profile</button>
                                </li>
                            </ul>
                        </div>
                        <div className="one">
                            <img className="img img-responsive banns" alt="banner" src={Bantop} ></img>
                            <ul className="list-inline">
                                <li>
                                    <div className="content">
                                        <h1>USG Proservice Sdn Bhd</h1>
                                        <ul className="list-inline">
                                            <li>Serving since April 2016</li>
                                            <li><img className="img img-responsive" alt="banner" src={Verify} ></img></li>
                                            <li><span>Verified</span></li>
                                        </ul>
                                        <span className="conlast">Last service completed on 2 Aug 2021</span>
                                    </div>
                                </li>
                                <li className="righ">
                                    <ul className="list-inline">
                                        <li className="bod"><span>3781</span><br/>Jobs completed</li>
                                        <li><span><i className="fa fa-star" aria-hidden="true"></i>4.6</span><br/>Rating</li>
                                        <li><span>1189</span><br/>Review</li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="banbotm">
                        <div className="row raws">
                            <div className="col-lg-8 col-md-8 col-sm-12 one">
                                {/* <ul className="row nav nav-pills nav-justified">
                                    <li className="col-lg-3 active lan">
                                        <a data-toggle="pill" href="#home">Overview</a>
                                    </li>
                                    <li className="col-lg-3 lan">
                                        <a data-toggle="pill" href="#menu1">Photos</a>
                                    </li>
                                    <li className="col-lg-3 lan">
                                        <a data-toggle="pill" href="#menu2">Services</a>
                                    </li>
                                    <li className="col-lg-3 lan">
                                        <a data-toggle="pill" href="#menu3">Reviews</a>
                                    </li>
                                </ul> */}
                                {/* <ul class="row nav nav-pills nav-justified list-inline">
                                    <li class="active col-lg-3 col-md-3 col-sm-6 col-xs-6"><a data-toggle="pill" href="#home">Overview</a></li>
                                    <li className="col-lg-3 col-md-3 col-sm-6 col-xs-6"><a data-toggle="pill" href="#menu1">Photos</a></li>
                                    <li className="col-lg-3 col-md-3 col-sm-6 col-xs-6"><a data-toggle="pill" href="#menu2">Services</a></li>
                                    <li className="col-lg-3 col-md-3 col-sm-6 col-xs-6"><a data-toggle="pill" href="#menu3">Reviews</a></li>
                                </ul>                                 */}
                                <div className="row nav nav-pills nav-justified">
                                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6 active">
                                        <a data-toggle="pill" href="#home">Overview</a>
                                    </div>
                                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                        <a data-toggle="pill" href="#menu1">Photos</a>
                                    </div>
                                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                        <a data-toggle="pill" href="#menu2">Services</a>
                                    </div>
                                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6">
                                        <a data-toggle="pill" href="#menu3">Reviews</a>
                                    </div>
                                </div>
                                <div className="tab-content">

                                    <div id="home" className="tab-pane fade in active">
                                    <h3>About</h3>
                                    <p>Kepakaran kami adalah didalam membantu menyelesaikan 
                                        masalah ketakutan bila elektrik boleh mengancam nyawa
                                         dan juga aircond taidak sejuk yang dihadapi oleh ramai pemilik - pemilik
                                          rumah dengan kaedah bimbingan KAUNSELING elektrik dan aircond.</p>
                                    <p>Berapa ramai yang ingin tahu bagaimana menyelesaikan masalah elektrik
                                         yang bahaya itu juga cara mudah mencuci aircond</p>
                                    <h3>Services</h3>
                                    <p>Elektrikal / Aircond</p>
                                    <h3>Achievements</h3>
                                    <p>"Kepuasan pelanggan matlamat kami"<br/>
                                        Saya nak ucap terima kasih kepada Rizqin Aircond Specialist, 
                                        sangat puas hati dengan hasil kerja..dan yang paling penting siap
                                         seperti yang di janjikan,harga pun memang berbaloi..keep it up anak
                                          muda. Saya bagi ????? - Mohamad Ridzwan</p>
                                    <hr/>
                                    <h3>Photos</h3>
                                    <ul className="list-inline imgu">
                                        <li><img className="img img-responsive" alt="banner" src={Cond} ></img></li>
                                        <li><img className="img img-responsive" alt="banner" src={Cond1} ></img></li>
                                        <li><img className="img img-responsive" alt="banner" src={Cond2} ></img></li>
                                        <li><img className="img img-responsive" alt="banner" src={Cond} ></img></li>
                                    </ul>
                                    <hr/>
                                    <h3>Services</h3>
                                    <ul className="list-inline boxes">
                                        <li>Aircond Servicing</li>
                                        <li>3 Phase Wiring</li>
                                        <li>Aircond Repair</li>
                                        <li>Lighting Installation</li>
                                        <li>Aircond Installation</li>
                                        <li className="more">+3 more</li>
                                    </ul>
                                    <hr/>
                                    <h3>Ratings & reviews</h3>
                                    <ul className="list-inline rewq">
                                        <li className="col-lg-9 col-md-9 col-sm-9 col-xs-6">
                                            <ul className="list-inline">
                                                <li>5</li>
                                                <li className="meter">
                                                </li>
                                            </ul>
                                            <ul className="list-inline">
                                                <li>4</li>
                                                <li className="meters">
                                                </li>
                                            </ul>
                                            <ul className="list-inline">
                                                <li>3</li>
                                                <li className="meters">
                                                </li>
                                            </ul>
                                            <ul className="list-inline">
                                                <li>2</li>
                                                <li className="meters">
                                                </li>
                                            </ul>
                                            <ul className="list-inline">
                                                <li>1</li>
                                                <li className="meters">
                                                </li>
                                            </ul>
                                        </li>
                                        <li className="col-lg-3 col-md-3 col-sm-3 col-xs-6 text-center">
                                            <h2>5.0</h2>
                                            <ul className="list-inline starts">
                                                <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                                <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                                <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                                <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                                <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                            </ul>
                                            <p>1 ratings</p>
                                        </li>
                                    </ul>
                                    <hr/>
                                    <div className="row">
                                        <div className="col-lg-2">
                                            <img className="img img-responsive" alt="pers" src={Pers} />
                                        </div>
                                        <div className="col-lg-10">
                                            <ul className="list-inline gam">
                                                <li>
                                                    <ul className="list-inline">
                                                        <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                                        <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                                        <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                                        <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                                        <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                                    </ul>
                                                </li>
                                                <li className="zul">zulaika</li>
                                                <li><p>about 4 years ago</p></li>
                                            </ul>
                                            <p>Good company and good services.nice price😊😊</p>
                                            <div className="miss">
                                                <p>Rizqin Aircond Specialist replied:</p>
                                                <p>Tq miss...😊😊</p>
                                            </div>
                                        </div>
                                    </div>
                                    <hr/>
                                    <div className="show">
                                        <h2>Show all Reviews</h2>
                                    </div>
                                    </div>

                                    <div id="menu1" className="tab-pane fade">
                                        <ul className="list-inline imgus">
                                            <li><img className="img img-responsive" alt="banner" src={Cond} ></img></li>
                                            <li><img className="img img-responsive" alt="banner" src={Cond1} ></img></li>
                                            <li><img className="img img-responsive" alt="banner" src={Cond2} ></img></li>
                                            <li><img className="img img-responsive" alt="banner" src={Cond} ></img></li>
                                            <li><img className="img img-responsive" alt="banner" src={Cond} ></img></li>
                                            <li><img className="img img-responsive" alt="banner" src={Cond1} ></img></li>
                                            <li><img className="img img-responsive" alt="banner" src={Cond2} ></img></li>
                                            <li><img className="img img-responsive" alt="banner" src={Cond} ></img></li>
                                            <li><img className="img img-responsive" alt="banner" src={Cond} ></img></li>
                                            <li><img className="img img-responsive" alt="banner" src={Cond1} ></img></li>
                                            <li><img className="img img-responsive" alt="banner" src={Cond2} ></img></li>
                                            <li><img className="img img-responsive" alt="banner" src={Cond} ></img></li>
                                            <li><img className="img img-responsive" alt="banner" src={Cond} ></img></li>
                                            <li><img className="img img-responsive" alt="banner" src={Cond1} ></img></li>
                                            <li><img className="img img-responsive" alt="banner" src={Cond2} ></img></li>
                                            <li><img className="img img-responsive" alt="banner" src={Cond} ></img></li>
                                        </ul>
                                    </div>
                                    <div id="menu2" className="tab-pane fade">
                                    <h3>Home Improvement & Maintenance</h3>
                                    <p>11 services</p>
                                    <ul className="list-inline boxes">
                                        <li>Electrical Wiring / Power Point</li>
                                        <li>Aircond Servicing</li>
                                        <li>3 Phase Wiring</li>
                                        <li>Aircond Repair</li>
                                        <li>Water Heater Installation</li>
                                        <li>Water Heater Repair</li>
                                        <li>Lighting Installation</li>
                                        <li>Aircond Installation</li>
                                        <li>Electrical Wiring / Power Point</li>
                                        <li>Aircond Repair</li>
                                        <li>3 Phase Wiring</li>
                                    </ul>
                                    </div>
                                    <div id="menu3" className="tab-pane fade">
                                        <h3>Ratings & reviews</h3>
                                        <ul className="list-inline rewq">
                                            <li className="col-lg-9 col-md-9 col-sm-9 col-xs-6">
                                                <ul className="list-inline">
                                                    <li>5</li>
                                                    <li className="meter">
                                                    </li>
                                                </ul>
                                                <ul className="list-inline">
                                                    <li>4</li>
                                                    <li className="meters">
                                                    </li>
                                                </ul>
                                                <ul className="list-inline">
                                                    <li>3</li>
                                                    <li className="meters">
                                                    </li>
                                                </ul>
                                                <ul className="list-inline">
                                                    <li>2</li>
                                                    <li className="meters">
                                                    </li>
                                                </ul>
                                                <ul className="list-inline">
                                                    <li>1</li>
                                                    <li className="meters">
                                                    </li>
                                                </ul>
                                            </li>
                                            <li className="col-lg-3 col-md-3 col-sm-3 col-xs-6 text-center">
                                                <h2>5.0</h2>
                                                <ul className="list-inline starts">
                                                    <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                                    <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                                    <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                                    <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                                    <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                                </ul>
                                                <p>1 ratings</p>
                                            </li>
                                        </ul>
                                        <ul className="list-inline revs">
                                            <li><h3>Review</h3></li>
                                            <li className="rit">
                                                <div className="dropdown">
                                                <button className="btn btn-lg dropdown-toggle" type="button" data-toggle="dropdown">Default: All Ratings
                                                <i className="fa fa-chevron-down" aria-hidden="true"></i></button>
                                                <ul className="dropdown-menu">
                                                    <li>Default: All Ratings</li>
                                                    <li>5 star</li>
                                                    <li>4 star</li>
                                                    <li>3 star</li>
                                                    <li>2 star</li>
                                                    <li>1 star</li>
                                                </ul>
                                                </div>
                                            </li>
                                        </ul>
                                        <hr/>
                                        <div className="row">
                                            <div className="col-lg-2">
                                                <img className="img img-responsive" alt="pers" src={Pers} />
                                            </div>
                                            <div className="col-lg-10">
                                                <ul className="list-inline gam">
                                                    <li>
                                                        <ul className="list-inline">
                                                            <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                                            <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                                            <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                                            <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                                            <li><i className="fa fa-star" aria-hidden="true"></i></li>
                                                        </ul>
                                                    </li>
                                                    <li className="zul">zulaika</li>
                                                    <li><p>about 4 years ago</p></li>
                                                </ul>
                                                <p>Good company and good services.nice price😊😊</p>
                                                <div className="miss">
                                                    <p>Rizqin Aircond Specialist replied:</p>
                                                    <p>Tq miss...😊😊</p>
                                                </div>
                                            </div>
                                        </div>
                                        <hr className="hariz"/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-12 two">
                                <div className="top">
                                    <h3>Like this vendor?</h3>
                                    <p>Book this vendor by sending a private request</p>
                                    <button className="btn btn-block btn-lg">Request this vendor<i className="fa fa-arrow-right" aria-hidden="true"></i></button>
                                    <p>Enjoy these perks when you privately book a vendor</p>
                                    <p><i className="fa fa-check" aria-hidden="true"></i>Coverage by FREE Kaodim Protection</p>
                                    <p><i className="fa fa-check" aria-hidden="true"></i>Get a re-service or your money back if service is unsatisfactory</p>
                                    <p><i className="fa fa-check" aria-hidden="true"></i>Connect to other vendors if this vendor does not respond</p>
                                </div>
                                <div className="top">
                                    <h3>Stay connected on the go!</h3>
                                    <div className="row">
                                        <div className="col-lg-10">
                                            <p>Download the app, and stay connected to our vendors through secure chat and private calls</p>
                                        </div>
                                        <div className="col-lg-2">
                                            <i className="fa fa-thumbs-up" aria-hidden="true"></i>
                                        </div>
                                    </div>
                                    <ul className="list-inline">
                                        <li><button><img className="img img-responsive" alt="banner" src={Play} /></button></li>
                                        <li><button><img className="img img-responsive" alt="banner" src={Play2} /></button></li>
                                    </ul>
                                </div>
                                <div className="lasss">
                                    <h3>Related services</h3>
                                    <ul className="list-unstyled">
                                        <li>
                                            <ul className="list-inline">
                                                <li><img className="img img-responsive" alt="banner" src={Images} /></li>
                                                <li className="air">Aircond Servicing</li>
                                            </ul>
                                        </li>
                                        <li>
                                            <ul className="list-inline">
                                                <li><img className="img img-responsive" alt="banner" src={Images} /></li>
                                                <li className="air">3 Phase Wiring</li>
                                            </ul>
                                        </li>
                                        <li>
                                            <ul className="list-inline">
                                                <li><img className="img img-responsive" alt="banner" src={Images} /></li>
                                                <li className="air">Aircond Repair</li>
                                            </ul>
                                        </li>
                                        <li>
                                            <ul className="list-inline">
                                                <li><img className="img img-responsive" alt="banner" src={Images} /></li>
                                                <li className="air">Lighting Installation</li>
                                            </ul>
                                        </li>
                                        <li>
                                            <ul className="list-inline">
                                                <li><img className="img img-responsive" alt="banner" src={Images} /></li>
                                                <li className="air">Aircond Installation</li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}
export default RequestVendor;