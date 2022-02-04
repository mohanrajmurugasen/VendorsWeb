import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "../assets/css/profile.css";
import Button from "@mui/material/Button";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CheckIcon from "@mui/icons-material/Check";
import GroupIcon from "@mui/icons-material/Group";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonIcon from "@mui/icons-material/Person";
import Grid from "@mui/material/Grid";
import { CardActionArea } from "@mui/material";
import authAxios from "../service/axios";
import { useHistory } from "react-router-dom";
import ReactPaginate from "react-paginate";
import Modal from "@mui/material/Modal";

export default function Users(props) {
  const datas = [
    { no: 1 },
    { no: 1 },
    { no: 1 },
    { no: 1 },
    { no: 1 },
    { no: 1 },
    { no: 1 },
    { no: 1 },
    { no: 1 },
    { no: 1 },
  ];

  const [users, setUsers] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [search, setSearch] = useState("");
  const [serviceId, setServiceId] = useState(null);
  const [locationId, setLocationId] = useState(null);
  const [list, setList] = useState("");
  const [sortBy, setSortBy] = useState(null);
  const [serch, setSerch] = useState("");
  const [location, setLocation] = useState([]);
  const [one, setOne] = useState("");
  const [sub, setSub] = useState([]);
  const [enquire, setenquire] = useState("");
  const [message1, setMessage] = useState("");

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    history.push("/");
    setOpen(false);
  };
  const handleClose1 = () => {
    history.push("/login");
    setOpen(false);
  };

  const history = useHistory();

  const userPerPage = 3;
  const pagesVisited = pageNumber * userPerPage;

  const pageCount = Math.ceil(users.length / userPerPage);

  useEffect(() => {
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

    fetchData();
  }, [serch, one]);

  const change = (e, a, b) => {
    if (b === "0") {
      setSerch(e);
      setLocationId(a);
    } else {
      setSerch("Currently we are not providing service to this location...");
    }
  };

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    authAxios
      .post("/cenquire/check_enquire", {})
      .then((res) => {
        setenquire(res.data.response.status);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);

  const request = (x) => {
    if (localStorage.getItem("token") === null) {
      setMessage("please try again after login...");
      setOpen(true);
    } else if (enquire === "Failed") {
      setMessage("Please fill the enquires...");
      setOpen(true);
    } else {
      alert("success");
      history.push(`/vendorEnquire/${x}`);
    }
  };

  useEffect(() => {
    const fetchData = () => {
      let searchData = [
        {
          serviceId: serviceId,
          locationId: locationId,
          list: list,
          sortBy: sortBy,
          vendorName: search,
        },
      ];
      authAxios
        .post("/cwebsite/get_vendor_list", { searchData })
        .then((res) => {
          setUsers(res.data.response.data.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    };

    fetchData();
  }, [search, serviceId, locationId, sortBy, list]);

  const changeOne = (name, id) => {
    setOne(name);
    setServiceId(id);
  };

  const displayUsers = datas
    .slice(pagesVisited, pagesVisited + userPerPage)
    .map((_, index) => {
      return (
        <Grid
          item
          xs={2}
          sm={4}
          md={4}
          key={index}
          style={{ cursor: "pointer" }}
        >
          <Card sx={{ width: "100%" }}>
            <CardActionArea>
              <CardContent>
                <Typography
                  style={{ display: "flex", color: "red" }}
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  <GroupIcon />{" "}
                  <h4
                    style={{
                      marginTop: "5px",
                      marginLeft: "5px",
                      fontWeight: "400",
                    }}
                  >
                    Compare
                  </h4>
                </Typography>
                <h3 style={{ color: "#625e5e", fontWeight: "400" }}>
                  House Cleaning Services
                </h3>
                <Typography
                  style={{ display: "flex", marginTop: "15px" }}
                  variant="h5"
                  component="div"
                >
                  <CalendarTodayIcon
                    style={{ color: "#99a2a9", width: "20px" }}
                  />
                  <h5
                    style={{
                      fontSize: "16px",
                      marginTop: "5px",
                      marginLeft: "5px",
                      color: "gray",
                      fontWeight: "400",
                    }}
                  >
                    12/03/2022
                  </h5>
                </Typography>
                <Typography
                  style={{ display: "flex" }}
                  variant="h5"
                  component="div"
                >
                  <LocationOnIcon style={{ color: "#99a2a9", width: "20px" }} />
                  <h5
                    style={{
                      fontSize: "16px",
                      marginTop: "5px",
                      marginLeft: "5px",
                      color: "gray",
                      fontWeight: "400",
                    }}
                  >
                    Jalan Kahan Lamba / OUG
                  </h5>
                </Typography>
                <Typography
                  style={{ display: "flex" }}
                  variant="h5"
                  component="div"
                >
                  <PersonIcon style={{ color: "#99a2a9", width: "20px" }} />
                  <h5
                    style={{
                      fontSize: "16px",
                      marginTop: "5px",
                      marginLeft: "5px",
                      color: "gray",
                      fontWeight: "400",
                    }}
                  >
                    Easwaran
                  </h5>
                </Typography>
                <Typography
                  variant="body2"
                  style={{ fontSize: "16px", paddingTop: "8px" }}
                >
                  Service has been discontinued
                </Typography>
              </CardContent>
              <CardActions style={{ paddingTop: "75px" }}>
                <Button className="request">
                  <CheckIcon />
                  <h4>Job Request Completed</h4>
                </Button>
              </CardActions>
            </CardActionArea>
          </Card>
        </Grid>
      );
    });

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          style={{ paddingBottom: 25 }}
        >
          {displayUsers}
        </Grid>
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
        <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <h2 style={{ color: "darkgray", letterSpacing: "1px" }}>
                Oops! Sorry
              </h2>
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <h5 style={{ color: "gray", letterSpacing: "1px" }}>
                {message1}
              </h5>
            </Typography>
            {message1 === "please try again after login..." ? (
              <Button
                onClick={handleClose1}
                variant="contained"
                style={{ width: 200, float: "left", marginTop: 20 }}
                color="warning"
              >
                <h5>Ok</h5>
              </Button>
            ) : (
              <Button
                onClick={handleClose}
                variant="contained"
                style={{ width: 200, float: "left", marginTop: 20 }}
                color="warning"
              >
                <h5>Ok</h5>
              </Button>
            )}
          </Box>
        </Modal>
      </Box>
    </div>
  );
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};
