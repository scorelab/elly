import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { auth } from "../../firebase";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Copyright from "../../components/Copyright/Copyright";
var firebase = require("firebase");

const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh"
  },
  image: {
    backgroundImage: `url(${require("../../images/banner.jpeg")})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.grey[900]
        : theme.palette.grey[50],
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%" // Fix IE 11 issue.
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function LoginPage(props) {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [pass, setPassword] = useState("");
  const [err, setErr] = useState("");

  const onEmailChange = e => {
    setEmail(e.target.value);
  };

  const onPasswordChange = e => {
    setPassword(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    handleSubmit({
      email: email,
      password: pass
    }).catch(err => {
      setErr(err);
    });
  };

  const onErr = err => {
    setErr(err);
  };
  const handleSubmit = ({ email, password }) => {
    return auth
      .doSignInWithEmailAndPassword(email, password)
      .then(response => {
        console.log("Successful Sign In");
        const uid = JSON.parse(JSON.stringify(response)).user.uid;

        console.log(JSON.parse(JSON.stringify(response)).user);
        firebase
          .database()
          .ref()
          .child("users")
          .child(uid)
          .child("profile")
          .once("value")
          .then(snapshot => {
            const result = snapshot.val();
            console.log(result);
            if (result !== "admin") {
              this.setState({
                err: "This account does not have admin priviledges",
                loading: false
              });
            } else {
              props.history.push("/home/approved");
            }
          });
      })
      .catch(err => {
        console.log("Failed Sign In", err);
        onErr(err.message);
        throw err;
      });
  };
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Administrator Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={onSubmit}>
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
              value={email}
              onChange={onEmailChange}
            />
            <Typography
              color="error"
              variant="caption"
              display="block"
              gutterBottom
            >
              {err}
            </Typography>
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
              value={pass}
              onChange={onPasswordChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            {/* <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid> */}
            <Box mt={5}></Box>
          </form>
        </div>
      </Grid>
      <Copyright />
    </Grid>
  );
}
