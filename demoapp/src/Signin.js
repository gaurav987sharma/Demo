import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {Link ,Redirect} from "react-router-dom";
import {signin} from "./validationJson";
import checkValidity from "./Components/Validator";
import isFormValid from "./Components/FormValidSetter";
import { Base64 } from 'js-base64';
import Cookies from 'js-cookie';
import config from './config/config.json';
const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
});

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      iForm: signin,
      formIsValid: false,
      loading: false,
      fieldData:{},
      saverStatus:{
        error:'',
        message:''
      },
      dashboard: false
    };
  }
  inputChangedHandler = (event) => {
    const inputIdentifier = event.target.name;
    //make a copy of iForm State
    const updatediForm = {
      ...this.state.iForm
    };
    // make a copy of Changed Element
    const updatedFormElement = {
      ...updatediForm[inputIdentifier]
    };
    //update changed value
    updatedFormElement.value = event.target.value;

    //check validity
    let getValidity = checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );

    updatedFormElement.valid = getValidity.isValid;
    updatedFormElement.elementConfig.helperText = getValidity.errorText;
    //updated element's touched property
    updatedFormElement.touched = true;
    updatediForm[inputIdentifier] = updatedFormElement;

    //Checking The whole form Validity
    let formIsValid = isFormValid(updatediForm);
    let clonefieldData = {...this.state.fieldData};
    clonefieldData[inputIdentifier] = event.target.value;

    this.setState({ iForm: updatediForm, formIsValid: formIsValid, fieldData:clonefieldData });
  };
  submitHandler = (event) => {
    const USERNAME =config.USERNAME;
    const PASSWORD = config.PASSWORD;
    const API_URL = config.API_URL;
    fetch(`${API_URL}/signin`, {
      "method": "POST",
      "credentials": 'include',
      "headers": {
        "Authorization": `Basic ${Base64.encode(`${USERNAME}:${PASSWORD}`)}`,
        "content-type": "application/json",
        "accept": "application/json"
      },
      "body": JSON.stringify({
        ...this.state.fieldData
      })
    })
    .then(response => response.json()).then(response => {
      const Token = response.data.result.token;
      Cookies.set('Token',Token);
        let status ={
          error:false,
          message:response.data.message,
        } 
      this.setState({saverStatus:status,iForm:signin,dashboard:true})
    })
    .catch(err => {
      console.log("DF");
      let status ={
        error:true,
        message:"Sign is not successfully",
      }
      this.setState({saverStatus:status})
    });
  };
  render() {
    const { classes } = this.props;
    if (this.state.dashboard === true) {
      return <Redirect to = {'/dashboard'} />
    }
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={ this.state.iForm.email.value}
              error={
                this.state.iForm.email.valid === false &&
                this.state.iForm.email.touched !== false
              }
              helperText={this.state.iForm.email.elementConfig.helperText}
              onChange={this.inputChangedHandler}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={ this.state.iForm.password.value}
              error={
                this.state.iForm.password.valid === false &&
                this.state.iForm.password.touched !== false
              }
              helperText={this.state.iForm.password.elementConfig.helperText}
              onChange={this.inputChangedHandler}
            />
            <Button
              onClick={this.submitHandler}
              fullWidth
              variant="contained"
              color="primary"
              disabled={!this.state.formIsValid}
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link to={"/Signup"}>{"Don't have an account? Sign Up"}</Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}

export default withStyles(styles)(SignIn);
