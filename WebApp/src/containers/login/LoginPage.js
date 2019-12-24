import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { auth } from "../../firebase";

var firebase = require("firebase");
var sectionStyle = {
  width: "100%",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat"
};

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      err: "",
      loading: false
    };
  }

  onEmailChange = e => {
    this.setState({ email: e.target.value });
  };

  onPasswordChange = e => {
    this.setState({ password: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    this.handleSubmit({
      email: this.state.email,
      password: this.state.password
    }).catch(err => {
      this.setState({ err: err.message });
    });
  };
  handleSubmit = ({ email, password }) => {
    this.setState({ loading: true });
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
              this.props.history.push("/home/approved");
            }
          });
      })
      .catch(err => {
        console.log("Failed Sign In", err);
        this.setState({ err: err.message, loading: false });
        throw err;
      });
  };

  render() {
    return (
      <div style={sectionStyle}>
        <Container style={{ padding: 10 }} component="main" maxWidth="xs">
          <CssBaseline />
          <div
            style={{ display: "flex", alignItems: "center", height: "100vh" }}
          >
            <form
              noValidate
              onSubmit={this.onSubmit}
              style={{
                backgroundColor: "rgba(247, 247, 247, 0.8)",
                borderRadius: "25px",
                padding: "20px"
              }}
            >
              <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <Typography component="h1" variant="h4">
                  Sign in
                </Typography>
              </div>
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
                value={this.state.email}
                onChange={this.onEmailChange}
              />
              <Typography
                color="error"
                variant="caption"
                display="block"
                gutterBottom
              >
                {this.state.err}
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
                value={this.state.password}
                onChange={this.onPasswordChange}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={this.state.loading}
              >
                Sign In
              </Button>
            </form>
          </div>
        </Container>
      </div>
    );
  }
}
export default Login;
