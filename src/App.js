import "./App.css";
import "antd/dist/antd.css";
import "react-bnb-gallery/dist/style.css";

import { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import firebase from "./components/Firestore";

import Listings from "./components/Listings";
import Add from "./components/Add";
import NavBar from "./components/NavBar";
import Detail from "./components/Detail";
import Footer from "./components/Footer";
import About from "./components/About";
import WhyUs from "./components/WhyUs";
import Make from "./components/Make";
import Model from "./components/Model";
import Year from "./components/Year";
import Sell from "./components/Sell";
import Faq from "./components/Faq";
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import Profile from "./components/Profile";

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setIsSignedIn(!!user);
    });
  }, []);

  console.log("hi this is app js");
  console.log(process.env);
  return (
    <Router>
      <NavBar isSignedIn={isSignedIn}></NavBar>
      <Switch>
        <Route exact path="/" component={Listings} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/users/:uid" component={Profile} />
        <Route exact path="/car/add" component={Add} />
        <Route exact path="/car/:id" component={Detail} />
        <Route exact path="/cars/make/:make" component={Make} />
        <Route exact path="/cars/model/:model" component={Model} />
        <Route exact path="/cars/year/:year" component={Year} />
        <Route exact path="/about" component={About} />
        <Route exact path="/why" component={WhyUs} />
        <Route exact path="/sell" component={Sell} />
        <Route exact path="/faq" component={Faq} />
        <Route component={NotFound} />
      </Switch>
      <Footer></Footer>
    </Router>
  );
}

export default App;
