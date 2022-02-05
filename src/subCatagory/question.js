import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import "../assets/css/question.css";
import authAxios from "../service/axios";
import { CCol, CContainer, CRow } from "@coreui/react";
import { Button, Divider } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import "date-fns";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import WorkIcon from "@material-ui/icons/Work";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";

import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  root: {
    width: "100%",
    maxWidth: 375,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Question() {
  const { id, location, nam, quote, quest, amount } = useParams();
  const history = useHistory();

  const [button, setbutton] = useState("Next");
  const [length, setLength] = useState();
  const [pageOf, setpageOf] = useState(0);
  const [last, setlast] = useState(null);
  const [data, setdata] = useState([]);
  const [summary, setsummary] = useState(null);
  const [text, settext] = useState("");
  const [textId, settextId] = useState("");
  const [radio, setradio] = useState("");
  const [radioId, setradioId] = useState("");
  const [check, setcheck] = useState([]);
  const [checkId, setcheckId] = useState("");
  const [qarr, setQarr] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDate2, setSelectedDate2] = useState(null);
  const [count, setcount] = useState(0);

  const handleDateChange = (date) => {
    setSelectedDate(date.target.value);
  };

  const handleDateChange2 = (date) => {
    setSelectedDate2(date.target.value);
  };

  const classes = useStyles();

  useEffect(() => {
    authAxios
      .post("/cwebsite/get_question", { serviceId: id })
      .then((res) => {
        setLength(res.data.response.data.length);
        setdata(res.data.response.data[pageOf]);
        setcount(res.data.response.data[pageOf].question.length);
      })
      .catch((err) => console.error(err.message));
  }, [pageOf, id]);

  const back = () => {
    if (summary !== null) {
      setsummary(null);
      setlast(length + 1);
      setbutton("Next");
    } else if (pageOf !== 0) {
      setpageOf(pageOf - 1);
    } else {
      history.goBack();
    }
  };

  useEffect(() => {
    if (pageOf < length - 1) {
      setlast(null);
    }
    if (summary !== null) {
      setbutton("Submit");
    }
  }, [pageOf, length, summary]);

  const handleChange = (evt) => {
    const { value, id } = evt.target;
    setradio(value);
    setradioId(id);
  };

  const handleChange2 = (evt, index) => {
    const { checked, id, value } = evt.target;
    if (checked) {
      setcheck((check) => [...check, value]);
      setcheckId(id);
    } else {
      index = check.indexOf(value);
      check.splice(index, 1);
    }
  };

  const handleChange3 = (evt) => {
    const { value, id } = evt.target;
    settext(value);
    settextId(id);
  };

  const arr = [
    {
      inputId: radioId,
      value: radio,
    },
    {
      inputId: checkId,
      value: check,
    },
    {
      inputId: textId,
      value: text,
    },
  ];

  const newArr = arr.filter((item) => {
    return item.value !== "" && item.inputId !== "";
  });

  console.log(qarr);

  const submit = (x) => {
    if (button === "Submit") {
      if (localStorage.getItem("token") !== null) {
        authAxios
          .post("/cenquire/save_enquire", {
            enquireData: {
              serviceId: id,
              locationId: location,
              requestFromDate: selectedDate,
              requestToDate: selectedDate2,
              questionPage: qarr,
              enquireTYpe: x,
              serviceAmount: amount,
            },
          })
          .then((res) => {
            if (res.data.response.code === 200) {
              history.push(`/success/1`);
            } else {
              history.push(`/success/0`);
            }
          })
          .catch((err) => {
            console.error(err.message);
          });
      } else {
        alert("Please Login..");
        history.push("/login");
      }
    } else if (pageOf < length - 1) {
      setQarr((qarr) => [
        ...qarr,
        {
          pageId: pageOf + 1,
          questionList: newArr,
        },
      ]);
      setpageOf(pageOf + 1);
      setradio("");
      setradioId("");
      setcheck([]);
      setcheckId("");
      settext("");
      settextId("");
    } else if (last === length + 1) {
      setsummary(0);
      setradio("");
      setradioId("");
      setcheck([]);
      setcheckId("");
      settext("");
      settextId("");
    } else {
      setQarr((qarr) => [
        ...qarr,
        {
          pageId: pageOf + 1,
          questionList: newArr,
        },
      ]);
      setlast(length + 1);
      setradio("");
      setradioId("");
      setcheck([]);
      setcheckId("");
      settext("");
      settextId("");
    }
  };

  return (
    <div className="question">
      {summary === null && quest === "Yes" ? (
        <CContainer>
          <div className="tops">
            <div className="flexs">
              <div className="arrow" onClick={() => back()}>
                <ArrowBackIcon />
              </div>
              <div className="name">
                <p>{summary === null ? nam : "Request Summary"}</p>
              </div>
            </div>
            <Divider />
            <div>
              <div className="page">
                <p>
                  Question {last === null ? pageOf + 1 : last} of {length + 1}
                </p>
              </div>

              <form>
                <div className="description">
                  <p>{last === null ? data.questionTitle : null}</p>
                </div>
                {last === null ? (
                  data.question &&
                  data.question.map((itm, index) => (
                    <div key={index}>
                      {Array.isArray(itm.question) && itm.question.length ? (
                        itm.question &&
                        itm.question.map((res, index) => (
                          <div key={index}>
                            {itm.inputType === "radio" ? (
                              <div className="radios">
                                <div className="radio">
                                  <label>
                                    <input
                                      type="radio"
                                      name={itm.inputType}
                                      value={res.optionValue}
                                      id={itm.inputId}
                                      onChange={handleChange}
                                      checked={radio === "" ? false : true}
                                    />
                                    <p>{res.optionValue}</p>
                                  </label>
                                </div>
                                <div className="inr">INR120</div>
                              </div>
                            ) : itm.inputType === "checkbox" ? (
                              <div className="check">
                                <div className="checkbox">
                                  <label>
                                    <input
                                      type="checkbox"
                                      name={itm.inputType}
                                      value={res.optionValue}
                                      id={itm.inputId}
                                      onChange={handleChange2}
                                    />
                                    <p>{res.optionValue}</p>
                                  </label>
                                </div>
                              </div>
                            ) : null}
                          </div>
                        ))
                      ) : itm.inputType === "text" ? (
                        <div className="text">
                          <div className="description2">
                            <p>{itm.question}</p>
                          </div>
                          <div className="text2">
                            <input
                              type="text"
                              placeholder={itm.question}
                              name={itm.inputType}
                              value={text}
                              id={itm.inputId}
                              onChange={handleChange3}
                            />
                          </div>
                        </div>
                      ) : null}
                    </div>
                  ))
                ) : (
                  <div className="date">
                    <form className={classes.container} noValidate>
                      <TextField
                        id="datetime-local"
                        label="From Date"
                        type="datetime-local"
                        defaultValue={selectedDate}
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={selectedDate}
                        onChange={handleDateChange}
                      />
                    </form>
                    <form className={classes.container} noValidate>
                      <TextField
                        id="datetime-local"
                        label="To Date"
                        type="datetime-local"
                        defaultValue={selectedDate2}
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={selectedDate2}
                        onChange={handleDateChange2}
                      />
                    </form>
                  </div>
                )}
              </form>
            </div>

            <div className="divid">
              <Divider />
              <div className="next">
                <div className="estimate">
                  <p className="one">
                    Estimate . <span>Session</span>
                  </p>
                  <p className="two">INR {amount}</p>
                </div>
                <div className="last">
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={submit}
                    disabled={
                      last === null
                        ? newArr.length === count
                          ? false
                          : true
                        : selectedDate !== null && selectedDate2 !== null
                        ? false
                        : true
                    }
                  >
                    {button}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CContainer>
      ) : (
        <CContainer fluid>
          <CRow>
            <CCol lg={6} md={6}>
              <div className="tops another">
                <div className="flexs">
                  <div className="arrow" onClick={() => back()}>
                    <ArrowBackIcon />
                  </div>
                  <div className="name">
                    <p>{summary === null ? nam : "Request Summary"}</p>
                  </div>
                </div>
                <Divider />
                <div className="summary">
                  <List className={classes.root}>
                    <ListItem className="padingItm">
                      <ListItemText>
                        <h4 className="lis">Service</h4>
                      </ListItemText>
                      <ListItemText>
                        <h4 className="lis2">{nam}</h4>
                      </ListItemText>
                    </ListItem>
                    <ListItem className="padingItm">
                      <ListItemText>
                        <h4 className="lis">Date</h4>
                      </ListItemText>
                      <ListItemText>
                        <h4 className="lis2">Tue, 8 Feb 2022, 8:30AM</h4>
                      </ListItemText>
                    </ListItem>
                    <ListItem className="padingItm">
                      <ListItemText>
                        <h4 className="lis">Location</h4>
                      </ListItemText>
                      <ListItemText>
                        <h4 className="lis2">Brickfields</h4>
                      </ListItemText>
                    </ListItem>
                    <ListItem className="padingItm">
                      <ListItemText>
                        <h4 className="lis">Session</h4>
                      </ListItemText>
                      <ListItemText>
                        <h4 className="lis2">One Time Session</h4>
                      </ListItemText>
                    </ListItem>
                  </List>
                  <Divider />
                  <List className={classes.root}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar className="avatars">
                          <ImageIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText>
                        <h4 className="services">
                          View full service checklist
                        </h4>
                        <Link to="#" className="servicelinks">
                          See what's include in this service
                        </Link>
                      </ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar className="avatars">
                          <WorkIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText>
                        <h4 className="services2">
                          View service pricing guide
                        </h4>
                      </ListItemText>
                    </ListItem>
                  </List>
                  <Divider />
                  <br />
                  <h4>Request Details</h4>
                  <List className={classes.root}>
                    <ListItem className="padingItm">
                      <ListItemAvatar>
                        <Avatar className="avatars2">
                          <p>1</p>
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText>
                        <h4 className="services">
                          View full service checklist
                        </h4>
                        <p className="servicelinks2">
                          See what's include in this service
                        </p>
                      </ListItemText>
                    </ListItem>
                    <ListItem className="padingItm">
                      <ListItemAvatar>
                        <Avatar className="avatars2">
                          <p>2</p>
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText>
                        <h4 className="services">
                          View full service checklist
                        </h4>
                        <p className="servicelinks2">
                          See what's include in this service
                        </p>
                      </ListItemText>
                    </ListItem>
                  </List>
                </div>
              </div>
            </CCol>
            <CCol lg={4} md={4}>
              <div className="rightCol1">
                <List className={classes.root}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <BeachAccessIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText>
                      <h4>Have a Promo Code?</h4>
                      <Link to="#">Apply here to get discount</Link>
                    </ListItemText>
                  </ListItem>
                </List>
              </div>
              <br />
              <div className="rightCol2">
                <h4>Payment Details</h4>
                <Divider />
                <div className="entires">
                  <div className="estim">
                    <div className="total">Estimate Amount</div>
                    <div className="amount">INR150.00</div>
                  </div>
                  <div className="estim">
                    <div className="total">Promo discount</div>
                    <div className="amount">--</div>
                  </div>
                </div>
                <Divider />
                <br />
                <div className="estim">
                  <div className="total">Total</div>
                  <div className="amount">INR150.00</div>
                </div>
                <br />
                <Button onClick={() => submit(1)}>{button}</Button>
              </div>
              <br />
              {quote === "Yes" ? (
                <div className="rightCol3">
                  <h4>Looking for Quotes ?</h4>
                  <Button onClick={() => submit(2)}>Request Now</Button>
                </div>
              ) : null}
              <p className="lastCaption">
                By submitting your request, you agree to our Terms of Use and
                Privacy Policy.
              </p>
            </CCol>
          </CRow>
        </CContainer>
      )}
    </div>
  );
}
