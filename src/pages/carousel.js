import * as React from 'react';
import "../assets/css/carousel.css"
import Cr1 from "../assets/img/carousel/cr1.png";
import Cr2 from "../assets/img/carousel/cr2.gif";
import Cr3 from "../assets/img/carousel/cr3.png";
import Cr4 from "../assets/img/carousel/cr4.gif";
import Cr5 from "../assets/img/carousel/cr5.gif";
import Top from "../assets/img/carousel/top.svg";

export function Carousel() {
  return (
    <div className="carousel">
        <div className="container">
            <div className="text-center">
                <img src={Top} alt="ko" />
            </div>
            <h2>Latest updates</h2>
            <section className="customer-logos slider">
                <div className="slide"><img src={Cr1} className="img img-responsive" alt="hi" /></div>
                <div className="slide"><img src={Cr2} className="img img-responsive" alt="hi" /></div>
                <div className="slide"><img src={Cr3} className="img img-responsive" alt="hi" /></div>
                <div className="slide"><img src={Cr4} className="img img-responsive" alt="hi" /></div>
                <div className="slide"><img src={Cr5} className="img img-responsive" alt="hi" /></div>
                <div className="slide">
                    <div className="view">
                        <i className="fa fa-arrow-right" aria-hidden="true"></i>
                        <p>View more</p>
                    </div>
                </div>
            </section>
        </div>
    </div>
  );
};