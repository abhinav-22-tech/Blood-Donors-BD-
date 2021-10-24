import React, { useState } from "react";
import "./contact.css";
import { db } from "../../firebaseConfig";
import { TextField, MenuItem } from "@mui/material";
import { CssBaseline, Container, Grid } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";

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
  const [message, setMessage] = useState("");
  const [bloodGroup, setBloodGroup] = useState("A+");
  const classes = useStyles();
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  // console.log({
  //   country,
  //   state,
  //   city,
  // });

  const [loader, setLoader] = useState(false);

  const handleChange = (event) => {
    setBloodGroup(event.target.value);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);

    db.collection("contacts")
      .add({
        name: name,
        email: email,
        bloodGroup: bloodGroup,
        message: message,
        country: country,
        state: state,
        city: city,
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
    setMessage("");
  };

  return (
    <>
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <div className={classes.paper}>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              id="outlined-basic"
              label="Full Name"
              variant="outlined"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            
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
