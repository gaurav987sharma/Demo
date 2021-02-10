import React from "react";
import { withStyles } from '@material-ui/core/styles';
import { Redirect} from "react-router-dom";
import { Base64 } from 'js-base64';
import Cookies from 'js-cookie';
import config from './config/config.json';
import Card from './Components/card';
import Header from './Components/header';
const Styles = (theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
});

class Dashboard extends React.Component {
    constructor(props){
        super(props);
        this.state={
          Token:Cookies.get('Token'),
          customerData:{}
        }
    }
    logout = (e) => {
        Cookies.remove('Token');
        this.setState({Token:''});
    }
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
          this.setState({customerData:response.data.result})
      })
      .catch(err => {
       
      });
    }
    render() {
      const { classes } = this.props;
      if (Cookies.get('Token') === undefined || this.state.Token === '') {
        return <Redirect to = {'/'} />
      }
      return (
          <div className={classes.root}>
            <Header />
          <Card customerData={this.state.customerData} token={this.state.Token}/>
          </div>
      );
    }
}

export default withStyles(Styles)(Dashboard);
