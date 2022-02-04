import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "../assets/css/footer.css"
import Logo from "../assets/img/logo2.svg";

class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <div className="container">

                    <div className="one">
                        <div className="row">
                            <div className="col-lg-6">
                                <h1>Want to hear first about new<br/>features and surprises? Sign up!</h1>
                            </div>
                            <div className="col-lg-6">
                                <form className="form-inline">
                                    <div className="form-group">
                                        <input type="email" className="form-control" id="email" placeholder="Your email address" name="email" />
                                    </div>
                                    <button type="submit" className="btn">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>

                    <hr/>

                    <div className="two">
                        <div className="row">
                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                <img src={Logo} alt="logo" className="img img-responsive" />
                                <div className="pad">
                                    <p>Contact</p>
                                    <ul className="list-unstyled con">
                                        <li><Link to="/#">help@trafft.com</Link></li>
                                        <li><Link to="/#">+381 (607) 033-964</Link></li>
                                    </ul>
                                    <ul className="list-inline media">
                                        <li><Link to="/#"><i className="fa fa-facebook" aria-hidden="true"></i></Link></li>
                                        <li><Link to="/#"><i className="fa fa-instagram" aria-hidden="true"></i></Link></li>
                                        <li><Link to="/#"><i className="fa fa-twitter" aria-hidden="true"></i></Link></li>
                                        <li><Link to="/#"><i className="fa fa-linkedin" aria-hidden="true"></i></Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-6">
                                <p>Who's it for</p>
                                <ul className="list-unstyled con">
                                    <li><Link to="/#">Adminstration and Officials</Link></li>
                                    <li><Link to="/#">Education and Consulting</Link></li>
                                    <li><Link to="/#">Sports and Training</Link></li>
                                    <li><Link to="/#">Events and Entertainment <span>Soon</span></Link></li>
                                    <li><Link to="/#">Salons</Link></li>
                                    <li><Link to="/#">Healthcare</Link></li>
                                    <li><Link to="/#">Professional Services</Link></li>
                                    <li><Link to="/#">Personal Services</Link></li>
                                </ul>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-6">
                                <p>Product</p>
                                <ul className="list-unstyled con">
                                    <li><Link to="/#">Help Center</Link></li>
                                    <li><Link to="/#">Suggest a Feature</Link></li>
                                    <li><Link to="/#">Blog</Link></li>
                                    <li><Link to="/#">About</Link></li>
                                    <li><Link to="/#">Contact us</Link></li>
                                    <li><Link to="/#">Investors</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="three">
                        <p>All Rights Reserved ® Trafft 2019-2021</p>
                    </div>
                    <div className="four">
                        <ul className="list-inline">
                            <li><Link to="/#">Terms of Service</Link></li>
                            <li><Link to="/#">Privacy Policy</Link></li>
                        </ul>
                    </div>

                </div>

            </div>
        )
    }
}
export default Footer;