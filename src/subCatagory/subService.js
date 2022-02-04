import {
  CImage,
  CBreadcrumb,
  CBreadcrumbItem,
  CContainer,
  CRow,
  CCol,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import "../assets/css/subservice.css";
import im from "../assets/img/housecl.jpeg";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import authAxios from "../service/axios";
import CIcon from "@coreui/icons-react";
import * as icon from "@coreui/icons";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function SubService() {
  const { id, name, catlog, img, des } = useParams();
  const classes = useStyles();
  const history = useHistory();
  const [serviceId, setServiceId] = useState(null);
  const [serviceImg, setServiceImg] = useState(null);
  const [serviceDes, setServiceDes] = useState(null);
  const [serviceName, setServiceName] = useState(null);
  const [data, setdata] = useState([]);

  useEffect(() => {
    authAxios
      .post("/cwebsite/get_sub_service", {
        serviceId: serviceId === null ? id : serviceId,
      })
      .then((res) => {
        setdata(res.data.response.data);
        // console.log(res.data);
      })
      .catch((err) => console.error(err.message));
  }, [id, serviceId]);

  const submit = (x, y, z, nam, img, des, quote, quest, amount) => {
    if (x === "1") {
      history.push(`/location/${z}/${nam}/${quote}/${quest}/${amount}`);
    } else {
      setServiceId(z);
      setServiceDes(des);
      setServiceImg(img);
      setServiceName(nam);
    }
  };

  return (
    <div className="subservice">
      <div className="banner">
        <div className="ban2"></div>
      </div>
      <CContainer fluid className="cont">
        <div className="entire">
          <div className="imgs">
            <CImage
              src={`http://demo.cleversoindia.com/service/asset/service/${
                serviceImg === null ? img : serviceImg
              }`}
            />
          </div>
          <h1>{serviceName === null ? catlog : serviceName}</h1>
          <div className="bred">
            <CBreadcrumb>
              <CBreadcrumbItem>Traft</CBreadcrumbItem>
              <CBreadcrumbItem>{name}</CBreadcrumbItem>
              <CBreadcrumbItem active>{catlog}</CBreadcrumbItem>
              {serviceName === null ? null : (
                <CBreadcrumbItem active>{serviceName}</CBreadcrumbItem>
              )}
            </CBreadcrumb>
          </div>
          <p className="subpara">{serviceDes === null ? des : serviceDes}</p>
          <div className="cards">
            <CRow>
              {data &&
                data.map((itm) => (
                  <CCol key={itm.serviceId} lg={3} md={6} sm={6} xs={6}>
                    <Card
                      className={classes.root}
                      onClick={() =>
                        submit(
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
                      <CardActionArea>
                        <CardMedia
                          className={classes.media}
                          image={im}
                          title="Contemplative Reptile"
                          style={{ backgroundSize: "cover" }}
                        />
                        <CardContent>
                          <Typography
                            gutterBottom
                            variant="h4"
                            component="h2"
                            style={{ fontWeight: "bold" }}
                          >
                            {itm.serviceName}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                            style={{ fontSize: "revert", fontWeight: "400" }}
                          >
                            {itm.description}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActions>
                        <Button
                          size="large"
                          color="primary"
                          style={{
                            fontSize: "15px",
                            color: "red",
                            textTransform: "capitalize",
                          }}
                        >
                          {itm.haveQuote === "Yes" ? "Request Quote" : "Submit"}
                          <CIcon
                            icon={icon.cilArrowRight}
                            style={{ width: "20px", marginLeft: "13px" }}
                          />
                        </Button>
                      </CardActions>
                    </Card>
                  </CCol>
                ))}
            </CRow>
          </div>
        </div>
      </CContainer>
    </div>
  );
}
