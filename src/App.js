import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Footer from "./footer/footer";
import Header from "./header/header";
import { Location } from "./location/location";
import { Blog } from "./pages/blog";
import { Help } from "./pages/help";
import Home from "./pages/home";
import Login from "./pages/login";
import RequestVendor from "./pages/requestvendor";
import Service from "./pages/service";
import Signup from "./pages/signup";
import Vendor from "./pages/vendor";
import { setProducts } from "./redux/action/productAction";
import SerchCatagory from "./serchService/serchCatagory";
import Dependcatagory from "./subCatagory/dependcatagory";
import HomeCatagory from "./subCatagory/homeCatagory";
import axios from "axios";
import { Success } from "./subCatagory/success";
import History from "./subCatagory/history";
import VendorLogin from "./pages/VendorLogin";
import VendorRegister from "./pages/VendorRegister";
import About from "./pages/about";
import VendorEnquire from "./enquire/vendorEnquire";
import Customer from "./pages/Customer";
import Profile from "./profile/profile";
import SubService from "./subCatagory/subService";
import Question from "./subCatagory/question";

function App() {
  const dispatch = useDispatch();
  const roleRef = useRef();

  const fetchData = async () => {
    const response = await axios
      .post("http://demo.cleversoindia.com/serviceApi/cwebsite/get_service")
      .catch((err) => {
        console.error(err.message);
      });
    dispatch(setProducts(response.data.response.data));
  };

  roleRef.current = fetchData;

  useEffect(() => {
    return roleRef.current();
  }, []);

  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/service" component={Service} />
        <Route path="/vendor" component={Vendor} />
        <Route path="/requestVendor" component={RequestVendor} />
        <Route path="/blog/:id" component={Blog} />
        <Route path="/homeCatagory/:id/:name" component={HomeCatagory} />
        <Route
          path="/subservice/:id/:name/:catlog/:img/:des"
          component={SubService}
        />
        <Route path="/serchCatagory/:id" component={SerchCatagory} />
        <Route
          path="/dependCatagory/:product/:location"
          component={Dependcatagory}
        />
        <Route
          path="/question/:id/:location/:nam/:quote/:quest/:amount"
          component={Question}
        />
        <Route
          path="/location/:id/:name/:quote/:quest/:amount"
          component={Location}
        />
        <Route path="/help" component={Help} />
        <Route path="/success/:id" component={Success} />
        <Route path="/history" component={History} />
        <Route path="/vendorlogin" component={VendorLogin} />
        <Route path="/vendorRegister" component={VendorRegister} />
        <Route path="/about" component={About} />
        <Route path="/vendorEnquire/:id" component={VendorEnquire} />
        <Route path="/profile" component={Profile} />
        <Route path="/customer/:id" component={Customer} />
        <Route>404 Not found!</Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;

// <!doctype html><html lang="en"><head><meta charset="utf-8"/><link rel="icon" href="/favicon.ico"/><meta name="viewport" content="width=device-width,initial-scale=1"/><meta name="theme-color" content="#000000"/><meta name="description" content="Web site created using create-react-app"/><script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js"></script><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"/><script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script><script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/><link rel="preconnect" href="https://fonts.gstatic.com"/><link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet"/><link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/kenwheeler/slick@1.8.1/slick/slick-theme.css"/><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"/><script type="text/javascript" src="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script><script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script><script src="https://code.jquery.com/jquery-2.2.0.min.js" type="text/javascript"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.js"></script><script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script><link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet"><link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/><link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/><title>PROJECT</title><link href="./static/css/2.ecdd39c8.chunk.css" rel="stylesheet"><link href="./static/css/main.5b105e4f.chunk.css" rel="stylesheet"></head><body><noscript>You need to enable JavaScript to run this app.</noscript><div id="root"></div><script>!function(e){function r(r){for(var n,l,p=r[0],f=r[1],i=r[2],c=0,s=[];c<p.length;c++)l=p[c],Object.prototype.hasOwnProperty.call(o,l)&&o[l]&&s.push(o[l][0]),o[l]=0;for(n in f)Object.prototype.hasOwnProperty.call(f,n)&&(e[n]=f[n]);for(a&&a(r);s.length;)s.shift()();return u.push.apply(u,i||[]),t()}function t(){for(var e,r=0;r<u.length;r++){for(var t=u[r],n=!0,p=1;p<t.length;p++){var f=t[p];0!==o[f]&&(n=!1)}n&&(u.splice(r--,1),e=l(l.s=t[0]))}return e}var n={},o={1:0},u=[];function l(r){if(n[r])return n[r].exports;var t=n[r]={i:r,l:!1,exports:{}};return e[r].call(t.exports,t,t.exports,l),t.l=!0,t.exports}l.m=e,l.c=n,l.d=function(e,r,t){l.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:t})},l.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,r){if(1&r&&(e=l(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(l.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var n in e)l.d(t,n,function(r){return e[r]}.bind(null,n));return t},l.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return l.d(r,"a",r),r},l.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},l.p="/";var p=this.webpackJsonpmyproject=this.webpackJsonpmyproject||[],f=p.push.bind(p);p.push=r,p=p.slice();for(var i=0;i<p.length;i++)r(p[i]);var a=f;t()}([])</script><script src="./static/js/2.42f1046d.chunk.js"></script><script src="./static/js/main.51076010.chunk.js"></script></body><script>$(document).ready((function(){$(".customer-logos").slick({slidesToShow:3,slidesToScroll:1,autoplay:!1,autoplaySpeed:1500,arrows:!1,dots:!1,pauseOnHover:!1,responsive:[{breakpoint:768,settings:{slidesToShow:4}},{breakpoint:520,settings:{slidesToShow:3}}]})}))</script></html>
