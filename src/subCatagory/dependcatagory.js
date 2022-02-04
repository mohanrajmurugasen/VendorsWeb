import React, { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router";
import "../assets/css/dependCatagory.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import authAxios from "../service/axios";

const Dependcatagory = () => {
  const { handleSubmit } = useForm();

  const { product, location } = useParams();
  const history = useHistory();

  const roleRef = useRef();
  const roleRefs = useRef();

  const [startDate, setStartDate] = useState(new Date());
  const [startDate1, setStartDate1] = useState(new Date());
  const [arr1, setArr1] = useState([]);
  const [type, settype] = useState("Next");
  const [itm, setitm] = useState(0);
  const [page, setPage] = useState(0);
  const [sname, setSname] = useState("Sample");
  const [one, setOne] = useState("");
  const [one1, setOne1] = useState("");
  const [two, setTwo] = useState([]);
  const [two1, setTwo1] = useState("");
  const [four, setFour] = useState([]);
  const [four1, setFour1] = useState("");
  const [question, setQuestion] = useState();
  const [five, setFive] = useState("");
  const [five1, setFive1] = useState("");
  const [qarr, setQarr] = useState([]);

  const service = async () => {
    const respo = await authAxios
      .post("/cwebsite/get_sub_service", { serviceId: product })
      .catch((err) => {
        console.error(err.message);
      });
    setSname(respo.data.response.data[0].serviceName);
  };

  roleRefs.current = service;

  const fetchData = async () => {
    const response = await authAxios
      .post("/cwebsite/get_question", { serviceId: product })
      .catch((err) => {
        console.error(err.message);
      });
    console.log(response.data);
    const res = response.data.response;
    const lngth = res.data;
    if (res.code === 200) {
      setPage(res.data.length);
      if (itm < lngth.length - 1) {
        setArr1(res.data[0].question);
      } else {
        setArr1(res.data[itm].question);
        settype("Submit");
      }
    } else {
      console.log("Error");
    }
  };

  roleRef.current = fetchData;

  useEffect(() => {
    return roleRef.current();
  }, [itm]);

  useEffect(() => {
    return roleRefs.current();
  }, [itm]);

  const arr = [
    {
      inputId: one1,
      value: one,
    },
    {
      inputId: four1,
      value: four,
    },
    {
      inputId: two1,
      value: two,
    },
    {
      inputId: five1,
      value: five,
    },
  ];

  const newArr = arr.filter((item) => {
    return item.value !== "";
  });

  useEffect(() => {
    setQuestion({
      enquireData: {
        serviceId: product,
        locationId: location,
        requestFromDate: startDate1,
        requestToDate: startDate,
        questionPage: qarr,
        enquireTYpe: 2,
        serviceAmount: 600,
      },
    });
  }, [qarr, product, location, startDate, startDate1]);

  const onSubmit = async () => {
    setQarr((qarr) => [
      ...qarr,
      {
        pageId: itm + 1,
        questionList: newArr,
      },
    ]);

    if (type === "Next") {
      setitm(itm + 1);
      setOne("");
      setFour([]);
      setFive("");
      setOne1("");
      setTwo1("");
      setFour1("");
      setFive1("");
    } else if (type === "Submit") {
      if (localStorage.getItem("token") !== null) {
        authAxios
          .post("/cenquire/save_enquire", question)
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
    }
  };

  const back = () => {
    if (itm !== 0) {
      setitm(itm - 1);
      settype("Next");
    } else {
      history.goBack();
    }
  };

  const handleChange = (evt) => {
    const { name, value, id } = evt.target;
    if (name === "radio") {
      setOne(value);
      setOne1(id);
    } else if (name === "checkbox") {
      setFour((four) => [...four, value]);
      setFour1(id);
    }
  };

  const handleChanges = (evt) => {
    const { value, id } = evt.target;
    setFive(value);
    setFive1(id);
  };

  const handleChangess = (evt) => {
    const { value, id } = evt.target;
    setTwo(value);
    setTwo1(id);
  };

  return (
    <div className="dependCatagory">
      <div className="containe">
        <div className="top">
          <ul className="list-inline">
            <li className="lef" onClick={() => back()}>
              <i className="fa fa-arrow-left" aria-hidden="true"></i>
            </li>
            <li>
              <p>{sname}</p>
            </li>
          </ul>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="botm">
            <p className="para">
              Question {itm + 1} of {page}
            </p>

            {arr1.map((item) => (
              <div key={item.inputId}>
                <p className="tit">{item.question}</p>
                {item.option && item.option.length > 0 ? (
                  item["option"].map((k) => (
                    <div className="loop" key={k.optionId}>
                      {item.isRequired === "Yes" ? (
                        <div>
                          <input
                            type={item.inputType}
                            name={item.inputType}
                            value={k.optionValue}
                            id={item.inputId}
                            onChange={handleChange}
                            required
                          />
                          <label>{k.optionValue}</label>
                        </div>
                      ) : (
                        <div>
                          <input
                            type={item.inputType}
                            name={item.inputType}
                            value={k.optionValue}
                            id={item.inputId}
                            onChange={handleChange}
                          />
                          <label>{k.optionValue}</label>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="loop">
                    {item.inputType === "text" ? (
                      <div>
                        {item.isRequired === "Yes" ? (
                          <input
                            type={item.inputType}
                            id={item.inputId}
                            onChange={handleChangess}
                            placeholder={item.questionTitle}
                            required
                          />
                        ) : (
                          <input
                            type={item.inputType}
                            id={item.inputId}
                            onChange={handleChangess}
                            placeholder={item.questionTitle}
                          />
                        )}
                      </div>
                    ) : (
                      <div>
                        {item.isRequired === "Yes" ? (
                          <select
                            className="form-control"
                            id={item.inputId}
                            value={five}
                            required
                            onChange={handleChanges}
                          >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                          </select>
                        ) : (
                          <select
                            className="form-control"
                            id={item.inputId}
                            value={five}
                            onChange={handleChanges}
                          >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                          </select>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}

            {itm === page - 1 ? (
              <div>
                <ul className="date list-unstyled">
                  <li>
                    <h3>When would you like to have the cleaners over?</h3>
                  </li>
                  <li>
                    <h4>
                      Your chances of getting cleaners are higher if you set the
                      preferred date to be at least 48 hours from now.
                    </h4>
                  </li>
                  <li>
                    <p>Preferred Date</p>
                    <DatePicker
                      className="dat"
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      showTimeSelect
                      dateFormat="Pp"
                    />
                  </li>
                  <li>
                    <p>Alternative Date (Optional)</p>
                    <DatePicker
                      className="dat"
                      selected={startDate1}
                      onChange={(date) => setStartDate1(date)}
                      showTimeSelect
                      dateFormat="Pp"
                    />
                  </li>
                </ul>
              </div>
            ) : null}
          </div>
          <div className="last">
            <button>{type}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Dependcatagory;
