import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
// import IconButton from "@material-ui/core/IconButton";
import AccountCircleIcon from "@material-ui/icons/AccountCircleOutlined";
import TextField from "@material-ui/core/TextField";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import { auth } from "../../firebase";
import Swal from "sweetalert2";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    marginLeft: 5,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  avatar: {
    resizeMode: "stretch",
    width: 50,
    height: 50,
  },
}));

export const Header = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [openAbout, setOpenAbout] = React.useState(false);
  const [oldPwdErr, setOldPwdErr] = React.useState(false);
  const [newPwdErr, setNewPwdErr] = React.useState(false);
  const [confirmPwdErr, setConfirmPwdErr] = React.useState(false);
  const [oldPwd, setOldPwd] = React.useState("");
  const [newPwd, setNewPwd] = React.useState("");
  const [confirmPwd, setConfirmPwd] = React.useState("");
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@_#$%^&*])(?=.{8,})/;

  const checkOldPassword = async () => {
    // console.log(auth.currentUser().email)
    try {
      let response = await auth.doSignInWithEmailAndPassword(
        auth.currentUser().email,
        oldPwd
      );
      let user = JSON.parse(JSON.stringify(response)).user;
      // console.log(JSON.parse(JSON.stringify(response)).user)
      if (user !== null) {
        // console.log("Valid")
        setOldPwdErr(false);
        return true;
      }
      // console.log(user)
    } catch (err) {
      console.log(err);
      setOldPwdErr(true);
      return false;
    }
  };

  const validPassword = () => {
    if (newPwd.match(passwordPattern)) {
      setNewPwdErr(false);
      return true;
    }
    setNewPwdErr(true);
    return false;
  };

  const passwordsMatch = () => {
    if (confirmPwd.match(newPwd)) {
      setConfirmPwdErr(false);
      return true;
    }
    setConfirmPwdErr(true);
    return false;
  };

  const handleOldPwd = (text) => {
    // console.log(text.target.value)
    setOldPwd(text.target.value);
  };

  const handleNewPwd = (text) => {
    // console.log(text.target.value)
    setNewPwd(text.target.value);
  };

  const handleConfirmPwd = (text) => {
    // console.log(text.target.value)
    setConfirmPwd(text.target.value);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleClickOpenDialog = () => {
    setOpen(true);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changePassword = async () => {
    if (checkOldPassword() && validPassword() && passwordsMatch()) {
      try {
        await auth.updatePassword(newPwd);
        handleCloseDialog();
        Swal.fire("Suucessfull!", "Your password has been updated.", "success");
        // console.log(JSON.stringify(response))
      } catch (err) {
        console.log(err);
      }
    }
  };

  // const handleClickOpenAboutDialog = () => {
  //   setOpenAbout(true);
  // };

  const handleCloseAboutDialog = () => {
    setOpenAbout(false);
  };

  const signOut = (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    return auth
      .doSignOut()
      .then((response) => {
        console.log("successfully signed out", response);
      })
      .catch((err) => {
        console.log("failed to sign out", err);
      });
  };
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        {/* <img
          alt="logo"
          className={classes.avatar}
          src={require("../../images/logo.png")}
        /> */}
        <Typography
          className={classes.title}
          variant="button"
          display="block"
          gutterBottom
        >
          Administrator
        </Typography>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          style={{ marginTop: 30 }}
        >
          <MenuItem onClick={handleClickOpenDialog}>Password Reset</MenuItem>
          <MenuItem onClick={signOut}>Logout</MenuItem>
          {/* <MenuItem onClick={handleClickOpenAboutDialog}>About</MenuItem> */}
        </Menu>

        <AccountCircleIcon onClick={handleClick} />
        <Dialog
          onClose={handleCloseDialog}
          aria-labelledby="simple-dialog-title"
          open={open}
        >
          <DialogTitle id="simple-dialog-title">Reset Password</DialogTitle>
          <TextField
            type="password"
            helperText={oldPwdErr ? "Old password is wrong" : ""}
            error={oldPwdErr}
            onChange={(text) => handleOldPwd(text)}
            value={oldPwd}
            style={{ margin: 10, width: 500 }}
            id="outlined-basic"
            variant="outlined"
            label="Old Password"
          />
          <TextField
            type="password"
            helperText={
              newPwdErr
                ? "Password should contain minimum 8 characters with at least one uppercase, one lowercase and one special charcter(!@_#$%^&*)."
                : ""
            }
            error={newPwdErr}
            onChange={(text) => handleNewPwd(text)}
            value={newPwd}
            style={{ margin: 10, width: 500 }}
            id="outlined-basic"
            variant="outlined"
            label="New Password"
          />
          <TextField
            type="password"
            helperText={confirmPwdErr ? "Passwords does not match" : ""}
            error={confirmPwdErr}
            onChange={(text) => handleConfirmPwd(text)}
            value={confirmPwd}
            style={{ margin: 10, width: 500 }}
            id="outlined-basic"
            variant="outlined"
            label="Confirm Password"
          />
          <Button
            style={{ margin: 10, width: 500 }}
            onClick={changePassword}
            variant="contained"
            color="primary"
          >
            RESET
          </Button>
        </Dialog>
        <Dialog
          onClose={handleCloseAboutDialog}
          aria-labelledby="simple-dialog-title"
          open={openAbout}
        >
          <DialogTitle id="simple-dialog-title">About Elly</DialogTitle>
          <Grid
            alignItems="center"
            justify="center"
            container
            spacing={1}
            style={{ padding: 10 }}
          >
            <Grid item xs={12}>
              <img
                alt="elly"
                width="100"
                height="100"
                src={require("../../images/logo2.png")}
              />
            </Grid>
            <Grid item xs={12}>
              Developed By
            </Grid>
            <Grid direction="row" item xs={12}>
              <img
                alt="scorelabs"
                width="150"
                height="100"
                src={require("../../images/score.jpg")}
              />
              &
              <img
                alt="trunks and leaves"
                width="100"
                height="100"
                src={require("../../images/trunks2.png")}
              />
            </Grid>
            <Grid item xs={12}>
              This app is developed by ScoreLab origanization with the
              collaboration of Trunks & Leaves organization for elephant
              conservation purposes.
            </Grid>
            <Grid item xs={12}>
              For more information contact us:{" "}
              <a href="https://mail.google.com">elly@scorelab.org</a>
            </Grid>
            <Grid item xs={12}>
              <a href="http://www.scorelab.org/">
                Visits http://www.scorelab.org/
              </a>
            </Grid>
            <Grid item xs={12}>
              <a href="http://www.trunksnleaves.org/index.html">
                Visits http://www.trunksnleaves.org
              </a>
            </Grid>
          </Grid>
        </Dialog>
      </Toolbar>
    </AppBar>
  );
};
