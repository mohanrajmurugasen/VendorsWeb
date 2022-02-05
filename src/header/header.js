import React from "react";
import { Link, useHistory } from "react-router-dom";
import "../assets/css/header.css";
import Logo from "../assets/img/logo.svg";

import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
// import Typography from '@mui/material/Typography';
import Tooltip from "@mui/material/Tooltip";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import ArticleIcon from "@mui/icons-material/Article";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import BookmarkIcon from "@mui/icons-material/Bookmark";

const Header = () => {
  const history = useHistory();

  const profile = () => {
    window.location.href = "/profile";
  };

  const remove = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const remove1 = () => {
    localStorage.removeItem("vendor");
    window.location.href = "/";
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  if (localStorage.getItem("token") !== null) {
    return (
      <div className="header">
        <nav className="navbar navbar-fixed-top">
          <div className="container-fluid">
            <div className="navbar-header">
              <button
                type="button"
                className="navbar-toggle"
                data-toggle="collapse"
                data-target="#myNavbar"
              >
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <Link to="/" className="navbar-brand">
                <img src={Logo} alt="logo" className="img img-responsive" />
              </Link>
            </div>
            <div className="collapse navbar-collapse" id="myNavbar">
              <ul className="nav navbar-nav">
                <li className="dropdown">
                  <Link
                    to="/#"
                    className="dropdown-toggle"
                    data-toggle="dropdown"
                  >
                    Who's it for{" "}
                    <i className="fa fa-chevron-down" aria-hidden="true"></i>
                  </Link>
                  <ul className="dropdown-menu">
                    <li>
                      <Link to="/#">
                        <i className="fa fa-heart" aria-hidden="true"></i>{" "}
                        Healthcare
                      </Link>
                    </li>
                    <li>
                      <Link to="/#">
                        <i className="fa fa-heart" aria-hidden="true"></i>{" "}
                        Healthcare
                      </Link>
                    </li>
                    <li>
                      <Link to="/#">
                        <i className="fa fa-heart" aria-hidden="true"></i>{" "}
                        Healthcare
                      </Link>
                    </li>
                    <li>
                      <Link to="/#">
                        <i className="fa fa-heart" aria-hidden="true"></i>{" "}
                        Healthcare
                      </Link>
                    </li>
                    <li>
                      <Link to="/#">
                        <i className="fa fa-heart" aria-hidden="true"></i>{" "}
                        Healthcare
                      </Link>
                    </li>
                    <li>
                      <Link to="/#">
                        <i className="fa fa-heart" aria-hidden="true"></i>{" "}
                        Healthcare
                      </Link>
                    </li>
                    <li>
                      <Link to="/#">
                        <i className="fa fa-heart" aria-hidden="true"></i>{" "}
                        Healthcare
                      </Link>
                    </li>
                    <li>
                      <Link to="/#">
                        <i className="fa fa-heart" aria-hidden="true"></i>{" "}
                        Healthcare
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="/blog/2">Blog</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
                <li>
                  <Link to="/help/15/2">Help</Link>
                </li>
                <li>
                  <Link to="/#">Contact</Link>
                </li>
                <li>
                  <Link to="/requestVendor">Pricing</Link>
                </li>
              </ul>
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <Link to="/vendor">Browse Vendor Directory</Link>
                </li>
                {/* <li><button className="btn sin navbar-btn" onClick={remove}><Link to="#">LogOut as User</Link></button></li> */}
                <li className="expand">
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <ChatBubbleIcon
                      style={{
                        marginRight: "20px",
                        marginTop: "6px",
                        color: "#8e949a",
                      }}
                    />
                    <NotificationsIcon
                      style={{ marginTop: "3px", color: "#8e949a" }}
                    />
                    <Tooltip title="Account settings">
                      <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? "account-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                      >
                        <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                        <ExpandMoreIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        "&:before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <MenuItem onClick={profile}>
                      <ArticleIcon
                        style={{ color: "#8e949a", marginRight: "15px" }}
                      />{" "}
                      <h5>Request</h5>
                    </MenuItem>
                    <MenuItem>
                      <AccessTimeIcon
                        style={{ color: "#8e949a", marginRight: "15px" }}
                      />{" "}
                      <h5>Request History</h5>
                    </MenuItem>
                    <MenuItem>
                      <LocationOnIcon
                        style={{ color: "#8e949a", marginRight: "15px" }}
                      />{" "}
                      <h5>Saved Location</h5>
                    </MenuItem>
                    <MenuItem>
                      <GroupRoundedIcon
                        style={{ color: "#8e949a", marginRight: "15px" }}
                      />{" "}
                      <h5>Browse Vendor Directory</h5>
                    </MenuItem>
                    <MenuItem>
                      <BookmarkIcon
                        style={{ color: "#8e949a", marginRight: "15px" }}
                      />{" "}
                      <h5>Preffered Vendors</h5>
                    </MenuItem>
                    <Divider />
                    <MenuItem>
                      <ListItemIcon>
                        <Settings
                          style={{
                            fontSize: "20px",
                            color: "#8e949a",
                            marginRight: "15px",
                          }}
                        />
                      </ListItemIcon>
                      <h5>Settings</h5>
                    </MenuItem>
                    <MenuItem onClick={remove}>
                      <ListItemIcon>
                        <Logout
                          style={{
                            fontSize: "20px",
                            color: "#8e949a",
                            marginRight: "15px",
                          }}
                        />
                      </ListItemIcon>
                      <h5>Logout</h5>
                    </MenuItem>
                  </Menu>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  } else if (localStorage.getItem("vendor") !== null) {
    return (
      <div className="header">
        <nav className="navbar navbar-fixed-top">
          <div className="container-fluid">
            <div className="navbar-header">
              <button
                type="button"
                className="navbar-toggle"
                data-toggle="collapse"
                data-target="#myNavbar"
              >
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <Link to="/" className="navbar-brand">
                <img src={Logo} alt="logo" className="img img-responsive" />
              </Link>
            </div>
            <div className="collapse navbar-collapse" id="myNavbar">
              <ul className="nav navbar-nav">
                <li className="dropdown">
                  <Link
                    to="/#"
                    className="dropdown-toggle"
                    data-toggle="dropdown"
                  >
                    Who's it for{" "}
                    <i className="fa fa-chevron-down" aria-hidden="true"></i>
                  </Link>
                  <ul className="dropdown-menu">
                    <li>
                      <Link to="/#">
                        <i className="fa fa-heart" aria-hidden="true"></i>{" "}
                        Healthcare
                      </Link>
                    </li>
                    <li>
                      <Link to="/#">
                        <i className="fa fa-heart" aria-hidden="true"></i>{" "}
                        Healthcare
                      </Link>
                    </li>
                    <li>
                      <Link to="/#">
                        <i className="fa fa-heart" aria-hidden="true"></i>{" "}
                        Healthcare
                      </Link>
                    </li>
                    <li>
                      <Link to="/#">
                        <i className="fa fa-heart" aria-hidden="true"></i>{" "}
                        Healthcare
                      </Link>
                    </li>
                    <li>
                      <Link to="/#">
                        <i className="fa fa-heart" aria-hidden="true"></i>{" "}
                        Healthcare
                      </Link>
                    </li>
                    <li>
                      <Link to="/#">
                        <i className="fa fa-heart" aria-hidden="true"></i>{" "}
                        Healthcare
                      </Link>
                    </li>
                    <li>
                      <Link to="/#">
                        <i className="fa fa-heart" aria-hidden="true"></i>{" "}
                        Healthcare
                      </Link>
                    </li>
                    <li>
                      <Link to="/#">
                        <i className="fa fa-heart" aria-hidden="true"></i>{" "}
                        Healthcare
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="/blog/2">Blog</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
                <li>
                  <Link to="/help/15/2">Help</Link>
                </li>
                <li>
                  <Link to="/#">Contact</Link>
                </li>
                <li>
                  <Link to="/requestVendor">Pricing</Link>
                </li>
              </ul>
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <Link to="/customer/2">Browse Customer Directory</Link>
                </li>
                {/* <li><button className="btn sin navbar-btn" onClick={remove1}><Link to="#">LogOut as Vendor</Link></button></li> */}
                <li className="expand">
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <ChatBubbleIcon
                      style={{
                        marginRight: "20px",
                        marginTop: "6px",
                        color: "#8e949a",
                      }}
                    />
                    <NotificationsIcon
                      style={{ marginTop: "3px", color: "#8e949a" }}
                    />
                    <Tooltip title="Account settings">
                      <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? "account-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                      >
                        <Avatar sx={{ width: 32, height: 32 }}>V</Avatar>
                        <ExpandMoreIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        "&:before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <MenuItem onClick={profile}>
                      <ArticleIcon
                        style={{ color: "#8e949a", marginRight: "15px" }}
                      />{" "}
                      <h5>Request</h5>
                    </MenuItem>
                    <MenuItem>
                      <AccessTimeIcon
                        style={{ color: "#8e949a", marginRight: "15px" }}
                      />{" "}
                      <h5>Request Completed</h5>
                    </MenuItem>
                    <MenuItem>
                      <LocationOnIcon
                        style={{ color: "#8e949a", marginRight: "15px" }}
                      />{" "}
                      <h5>Saved Location</h5>
                    </MenuItem>
                    <MenuItem>
                      <GroupRoundedIcon
                        style={{ color: "#8e949a", marginRight: "15px" }}
                      />{" "}
                      <h5>Browse Vendor Directory</h5>
                    </MenuItem>
                    <MenuItem>
                      <BookmarkIcon
                        style={{ color: "#8e949a", marginRight: "15px" }}
                      />{" "}
                      <h5>Preffered Vendors</h5>
                    </MenuItem>
                    <Divider />
                    <MenuItem>
                      <ListItemIcon>
                        <Settings
                          style={{
                            fontSize: "20px",
                            color: "#8e949a",
                            marginRight: "15px",
                          }}
                        />
                      </ListItemIcon>
                      <h5>Settings</h5>
                    </MenuItem>
                    <MenuItem onClick={remove1}>
                      <ListItemIcon>
                        <Logout
                          style={{
                            fontSize: "20px",
                            color: "#8e949a",
                            marginRight: "15px",
                          }}
                        />
                      </ListItemIcon>
                      <h5>Logout</h5>
                    </MenuItem>
                  </Menu>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  } else {
    return (
      <div className="header">
        <nav className="navbar navbar-fixed-top">
          <div className="container-fluid">
            <div className="navbar-header">
              <button
                type="button"
                className="navbar-toggle"
                data-toggle="collapse"
                data-target="#myNavbar"
              >
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <Link to="/" className="navbar-brand">
                <img src={Logo} alt="logo" className="img img-responsive" />
              </Link>
            </div>
            <div className="collapse navbar-collapse" id="myNavbar">
              <ul className="nav navbar-nav">
                <li className="dropdown">
                  <Link
                    to="/#"
                    className="dropdown-toggle"
                    data-toggle="dropdown"
                  >
                    Who's it for{" "}
                    <i className="fa fa-chevron-down" aria-hidden="true"></i>
                  </Link>
                  <ul className="dropdown-menu">
                    <li>
                      <Link to="/#">
                        <i className="fa fa-heart" aria-hidden="true"></i>{" "}
                        Healthcare
                      </Link>
                    </li>
                    <li>
                      <Link to="/#">
                        <i className="fa fa-heart" aria-hidden="true"></i>{" "}
                        Healthcare
                      </Link>
                    </li>
                    <li>
                      <Link to="/#">
                        <i className="fa fa-heart" aria-hidden="true"></i>{" "}
                        Healthcare
                      </Link>
                    </li>
                    <li>
                      <Link to="/#">
                        <i className="fa fa-heart" aria-hidden="true"></i>{" "}
                        Healthcare
                      </Link>
                    </li>
                    <li>
                      <Link to="/#">
                        <i className="fa fa-heart" aria-hidden="true"></i>{" "}
                        Healthcare
                      </Link>
                    </li>
                    <li>
                      <Link to="/#">
                        <i className="fa fa-heart" aria-hidden="true"></i>{" "}
                        Healthcare
                      </Link>
                    </li>
                    <li>
                      <Link to="/#">
                        <i className="fa fa-heart" aria-hidden="true"></i>{" "}
                        Healthcare
                      </Link>
                    </li>
                    <li>
                      <Link to="/#">
                        <i className="fa fa-heart" aria-hidden="true"></i>{" "}
                        Healthcare
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="/blog/2">Blog</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
                <li>
                  <Link to="/help">Help</Link>
                </li>
                <li>
                  <Link to="/#">Contact</Link>
                </li>
                <li>
                  <Link to="/requestVendor">Pricing</Link>
                </li>
              </ul>
              <ul className="nav navbar-nav navbar-right list-inline">
                <li>
                  <button className="btn sin navbar-btn">
                    <Link to="/vendorlogin">Sign up as Vendor</Link>
                  </button>
                </li>
                <li>
                  <button className="btn danger navbar-btn">
                    <Link to="/login">Sign up as User</Link>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
};
export default Header;
