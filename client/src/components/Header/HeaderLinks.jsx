/*!

=========================================================
* Material Kit React - v1.7.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-kit-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*eslint-disable*/
import React, { Component } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";

// core components
import CustomDropdown from "./../CustomDropdown/CustomDropdown.jsx";
import Button from "./../CustomButtons/Button.jsx";

import headerLinksStyle from "./../../assets/jss/material-kit-react/components/headerLinksStyle.jsx";


class HeaderLinks extends Component {
  constructor(props) {
    super(props);
  }

  handleButtonClick = (event) => {
    // this.props.logout();
    console.log("CLICKY CLICKY")
  }
  render () {
  const { classes } = this.props;
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          buttonText="Vice Cracker"
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          buttonIcon={Apps}
          dropdownList={[
            <Link to="/Vices" className={classes.dropdownLink}>
              Vices
            </Link>,
            <Link to="/Settings" className={classes.dropdownLink}>
            Settings
          </Link>,
          ]}
        />
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          type="button" onClick={this.handleButtonClick}
          color="transparent"
          className={classes.navLink}
        >
       Log Out
        </Button>
      </ListItem>

</List>
  );
}}



export default withStyles(headerLinksStyle)(HeaderLinks);
