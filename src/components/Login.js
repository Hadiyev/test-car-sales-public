import React, { useEffect, useState } from "react";

import { Redirect } from "react-router-dom";

import firebase from "./Firestore";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

import {
  Card,
  Tag,
  Skeleton,
  Statistic,
  Switch,
  Row,
  Col,
  Typography,
} from "antd";
import SellWithUs from "./SellWithUs";

const { Title } = Typography;

const uiConfig = {
  signInFlow: "popup",
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    signInSuccessWithAuthResult: (currentUser, credential, redirectUrl) => {
      const docRef = firebase
        .firestore()
        .collection("usersCollection")
        .doc(currentUser.user.uid);

      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            docRef
              .update({
                uid: currentUser.user.uid,
                displayName: currentUser.user.displayName,
                logged_in_date:
                  firebase.firestore.FieldValue.serverTimestamp() || null,
              })
              .then(function () {
                console.log("SUCCESS");
              })
              .catch(function (error) {
                console.log("ERROR");
                //   console.error("Error adding document: ", error);
              });
          } else {
            // doc.data() will be undefined in this case
            docRef
              .set({
                uid: currentUser.user.uid,
                displayName: currentUser.user.displayName,
                created_date:
                  firebase.firestore.FieldValue.serverTimestamp() || null,
              })
              .then(function () {
                console.log("SUCCESS");
              })
              .catch(function (error) {
                console.log("ERROR");
                //   console.error("Error adding document: ", error);
              });
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });

      return false;
    },
  },
};

export default function Login() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userId, setUserId] = useState();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setIsSignedIn(!!user);
    });
  }, []);

  return (
    <div className="listings-container">
      <Row
        style={{ textAlign: "center" }}
        gutter={[
          { xs: 8, sm: 16, md: 24, lg: 32 },
          { xs: 8, sm: 16, md: 24, lg: 32 },
        ]}
      >
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Card bordered={false}>
            <Title level={3}>Giriş/Qeydiyyat</Title>
            <p>
              Aşağıdakı yollardan birini seçərək giriş edin və ya hesab yaradın.
            </p>
            <p>
              Hesabınız yoxdursa giriş etməyə çalışdığınız zaman qeydiyyata
              yönləndiriləcəksiniz.
            </p>
          </Card>
        </Col>
      </Row>
      {isSignedIn ? (
        <Redirect to={`/users/${firebase.auth().currentUser.uid}`} />
      ) : (
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      )}
      <br />
      <Row
        gutter={[
          { xs: 8, sm: 16, md: 24, lg: 32 },
          { xs: 8, sm: 16, md: 24, lg: 32 },
        ]}
      >
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <SellWithUs></SellWithUs>
        </Col>
      </Row>
    </div>
  );
}
