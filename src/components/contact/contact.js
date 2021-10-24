import React, { useState, useEffect } from "react";
import "./contact.css";
import { db } from "../../firebaseConfig";
import {
  TextField,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Button,
} from "@mui/material";
import { CssBaseline, Container, Grid } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import firebase from "firebase";
import GeoLocation from "../GeoLocation/GeoLocation";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
}));

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bloodGroup, setBloodGroup] = useState("A+");
  const classes = useStyles();
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [authorize, setAuthorize] = useState("");

  const [available, setAvailable] = useState("");

  const [loader, setLoader] = useState(false);

  const [currentUser, setCurrentUser] = useState(null);
  const [phoneno, setPhoneno] = useState("empty");
  const handleChange = (event) => {
    setBloodGroup(event.target.value);
  };

  const handleAvailableChange = (event) => {
    setAvailable(event.target.value);
  };
  const bloodGroups = [
    {
      value: "A+",
      label: "A+",
    },
    {
      value: "A-",
      label: "A-",
    },
    {
      value: "A1+",
      label: "A1+",
    },
    {
      value: "A1-",
      label: "A1-",
    },
    {
      value: "A1B+",
      label: "A1B+",
    },
    {
      value: "A1B-",
      label: "A1B-",
    },
    {
      value: "A2+",
      label: "A2+",
    },
    {
      value: "A2-",
      label: "A2-",
    },
    {
      value: "A2B+",
      label: "A2B+",
    },
    {
      value: "A2B-",
      label: "A2B-",
    },
    {
      value: "AB+",
      label: "AB+",
    },
    {
      value: "AB-",
      label: "AB-",
    },
    {
      value: "B+",
      label: "B+",
    },
    {
      value: "B-",
      label: "B-",
    },
    {
      value: "Bombay Blood Group",
      label: "Bombay Blood Group",
    },
    {
      value: "INRA",
      label: "INRA",
    },
    {
      value: "O+",
      label: "O+",
    },
    {
      value: "O-",
      label: "O-",
    },
  ];

  const availability = [
    {
      value: "Available",
      label: "Available",
    },
    {
      value: "Unavailable",
      label: "Unavailable",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);

    db.collection("contacts")
      .add({
        name: name,
        bloodGroup: bloodGroup,
        phoneno: phoneno,
        country: country,
        state: state,
        city: city,
        address: address,
        email: email,
        authorize: authorize,
        available: available,
      })
      .then(() => {
        setLoader(false);
        alert("Your message has been submitted👍");
      })
      .catch((error) => {
        alert(error.message);
        setLoader(false);
      });

    setName("");
    setEmail("");
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
        setPhoneno(user.phoneNumber);
      } else {
        setCurrentUser(null);
        setPhoneno("empty");
      }
    });
  }, []);

  // console.log("Current User" + currentUser?.phoneNumber);

  return (
    <>
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <div className={classes.paper}>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  id="outlined-basic"
                  label="Full Name"
                  variant="outlined"
                  fullWidth="true"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Blood Group"
                  value={bloodGroup}
                  fullWidth="true"
                  onChange={handleChange}
                  helperText="Please select your Blood Group"
                >
                  {bloodGroups.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <GeoLocation
                  locationTitle="Country"
                  isCountry
                  onChange={setCountry}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <GeoLocation
                  locationTitle="State"
                  onChange={setState}
                  geoId={country}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <GeoLocation
                  locationTitle="City"
                  onChange={setCity}
                  geoId={state}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="outlined-basic"
                  label="Address"
                  variant="outlined"
                  fullWidth="true"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  helperText="Please enter your current address"
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="outlined-basic"
                  label="Email Id"
                  variant="outlined"
                  fullWidth="true"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  helperText="Please enter your email id"
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="outlined-basic"
                  label="Phone Number"
                  variant="outlined"
                  fullWidth="true"
                  placeholder="Phone Number"
                  value={currentUser?.phoneNumber}
                  disabled="disabled"
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  select
                  label="Please confirm your availability to donate blood"
                  value={available}
                  fullWidth="true"
                  onChange={handleAvailableChange}
                  helperText="Please select your Availability"
                >
                  {availability.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox />}
                  onChange={(e) => setAuthorize(e.target.value)}
                  label="I authorise this website to display my name and telephone number, so that the needy could contact me, as and when there is an emergency."
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Button type="submit" variant="contained">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
      {/* <form className="form" onSubmit={handleSubmit}>
        <h1>Contact Us 🤳</h1>
        <TextField
          id="outlined-basic"
          label="Full Name"
          variant="outlined"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          id="outlined-select-currency"
          select
          label="Blood Group"
          value={bloodGroup}
          onChange={handleChange}
          helperText="Please select your Blood Group"
        >
          {bloodGroups.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          id="outlined-select-currency"
          select
          label="Select Country"
          value={bloodGroup}
          onChange={handleChange}
          helperText="Please select your Blood Group"
        >
          {bloodGroups.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          id="outlined-select-currency"
          select
          label="Select State"
          value={bloodGroup}
          onChange={handleChange}
          helperText="Please select your Blood Group"
        >
          {bloodGroups.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          id="outlined-select-currency"
          select
          label="Blood Group"
          value={bloodGroup}
          onChange={handleChange}
          helperText="Please select your Blood Group"
        >
          {bloodGroups.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <label>Email</label>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Message</label>
        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>

        <button
          type="submit"
          style={{ background: loader ? "#ccc" : " rgb(2, 2, 110)" }}
        >
          Submit
        </button>
      </form> */}
    </>
  );
};

export default Contact;
