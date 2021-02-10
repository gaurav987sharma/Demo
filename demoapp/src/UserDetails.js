import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import BorderColorIcon from '@material-ui/icons/BorderColor';
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import {userJson} from "./validationJson";
import checkValidity from "./Components/Validator";
import isFormValid from "./Components/FormValidSetter";
import MuiAlert from '@material-ui/lab/Alert';
import { Base64 } from 'js-base64'
import config from './config/config.json';
import { deepOrange } from '@material-ui/core/colors';
import Header from './Components/header';
import { Redirect} from "react-router-dom";
import Cookies from 'js-cookie';
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const style = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
});

class UserDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      iForm: userJson,
      customerData: {},
      formIsValid: true,
      loading: false,
      fieldData:{},
      saverStatus:{
        error:'',
        message:''
      },
      Token:Cookies.get('Token'),
      dashboard:false
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
  componentDidMount(){
    const USERNAME =config.USERNAME;
    const PASSWORD = config.PASSWORD;
    const API_URL = config.API_URL;
    const token = this.state.Token;
    fetch(`${API_URL}/${token}`, {
      "method": "GET",
      "credentials": 'include',
      "headers": {
        "Authorization": `Basic ${Base64.encode(`${USERNAME}:${PASSWORD}`)}`,
        "content-type": "application/json",
        "accept": "application/json"
      }
    })
    .then(response => response.json()).then(response => {
        let customerData = response.data.result;
        let iForm = {...this.state.iForm};
        for(let key in iForm){
          iForm[key].value = customerData[key];
          iForm[key].valid = true;
        }
        this.setState({iForm:iForm, customerData:customerData,fieldData:customerData});
    })
    .catch(err => {
     
    });
  }
  submitHandler = (event) => {
    const token =  this.state.Token;
    const USERNAME =config.USERNAME;
    const PASSWORD = config.PASSWORD;
    const API_URL = config.API_URL;
    fetch(`${API_URL}/updateCustomer/${token}`, {
      "method": "Put",
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
        let status ={
          error:false,
          message:response.data.message,
        }
        this.setState({dashboard:true})
    })
    .catch(err => {
      let status ={
        error:true,
        message:"Signup  is not successfully",
      }
      this.setState({saverStatus:status})
    });
  };
  render() {
    const { classes } = this.props;
    if (Cookies.get('Token') === undefined) {
        return <Redirect to = {'/'} />
    }
    if (this.state.dashboard === true) {
        return <Redirect to = {'/dashboard'} />
    }
    return (
        <>
        <Header />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.orange}>
            <BorderColorIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Edit User Details
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={ this.state.iForm.firstName.value}
                  error={
                    this.state.iForm.firstName.valid === false &&
                    this.state.iForm.firstName.touched !== false
                  }
                  helperText={
                    this.state.iForm.firstName.elementConfig.helperText
                  }
                  onChange={this.inputChangedHandler}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  value={ this.state.iForm.lastName.value}
                  error={
                    this.state.iForm.lastName.valid === false &&
                    this.state.iForm.lastName.touched !== false
                  }
                  helperText={
                    this.state.iForm.lastName.elementConfig.helperText
                  }
                  onChange={this.inputChangedHandler}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={ this.state.iForm.email.value}
                  error={
                    this.state.iForm.email.valid === false &&
                    this.state.iForm.email.touched !== false
                  }
                  helperText={this.state.iForm.email.elementConfig.helperText}
                  onChange={this.inputChangedHandler}
                />
              </Grid>
            </Grid>
            <Button
              onClick={this.submitHandler}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={!this.state.formIsValid}
            >
              Save
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link to={"/"}>Already have an account? Sign in</Link>
              </Grid>
            </Grid>
          </form>
          {/* <Snackbar autoHideDuration={6000}> */}
              {(this.state.saverStatus.error===false)?
              <Alert severity="success">
              {this.state.saverStatus.message}
              </Alert>:''}
  {/* </Snackbar> */}
        </div>
      </Container>
      </>
    );
  }
}

export default withStyles(style)(UserDetails);
