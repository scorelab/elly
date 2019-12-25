import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import TextField from '@material-ui/core/TextField';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { auth } from "../../firebase";

const useStyles = makeStyles(theme => ({
 menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    marginLeft: 5
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: 'green'
  },
  avatar: {
    resizeMode: 'stretch',
    width: 50,
    height: 50,
  }
}));

export const Header =()=>{
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleClickOpenDialog = () => {
    setOpen(true);
  };

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changePassword = () => {

  }
 
  const signOut = e => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    return auth
      .doSignOut()
      .then(response => {
        console.log("successfully signed out", response);
      })
      .catch(err => {
        console.log("failed to sign out", err);
      });
  };
  return  <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
                <img alt='logo' className={classes.avatar} src={require("../../images/logo.png")}/>
                <Typography className={classes.title} variant="button" display="block" gutterBottom>
                Elly - Admin
                </Typography>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClickOpenDialog}>Password Reset</MenuItem>
                  <MenuItem onClick={signOut}>Logout</MenuItem>
                </Menu>
                <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} style={{backgroundColor: 'white'}}>
                  <AccountCircleIcon />
                </IconButton>
                <Dialog onClose={handleCloseDialog} aria-labelledby="simple-dialog-title" open={open}>
                  <DialogTitle id="simple-dialog-title">Reset Password</DialogTitle>
                  <TextField style={{margin: 10, width: 500}} id="outlined-basic" variant="outlined" label="Old Password" />
                  <TextField style={{margin: 10, width: 500}} id="outlined-basic" variant="outlined" label="New Password" />
                  <TextField style={{margin: 10, width: 500}} id="outlined-basic" variant="outlined" label="Confirm Password" />
                  <Button style={{margin: 10, width: 500}} onClick={changePassword} variant="contained" color="primary">RESET</Button>
                </Dialog>
            </Toolbar>
          </AppBar>
}