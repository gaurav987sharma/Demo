import React from "react";
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Redirect} from "react-router-dom";
import Cookies from 'js-cookie';
import DeckIcon from '@material-ui/icons/Deck';
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

class Header extends React.Component {
    constructor(props){
        super(props);
        this.state={
          Token:Cookies.get('Token')
        }
    }
    logout = (e) => {
        Cookies.remove('Token');
        this.setState({Token:''});
    }
    render() {
      const { classes } = this.props;
      if (Cookies.get('Token') === undefined && this.state.Token === '') {
        return <Redirect to = {'/'} />
      }
      return (
          <div className={classes.root}>
          <AppBar position="static">
              <Toolbar>
              <Typography variant="h6" className={classes.title}>
              <DeckIcon fontSize="large"/>
              </Typography>
              <Button color="inherit" onClick={this.logout}>Logout</Button>
              </Toolbar>
          </AppBar>
          </div>
      );
    }
}

export default withStyles(Styles)(Header);
