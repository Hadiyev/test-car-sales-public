import React, { useState, useEffect } from "react";

import firebase from "./Firestore";

import {
  Row,
  Col,
  Card,
  Button,
  Tag,
  Form,
  Select,
  Input,
  InputNumber,
  Typography,
  PageHeader,
  Skeleton,
  Avatar,
  Modal,
  Result,
  message,
} from "antd";

import GridItem from "./GridItem";
import Edit from "./Edit";

export default function DealerListings(props) {
  const [cars, setCars] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [editingCar, setEditingCar] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletingCar, setDeletingCar] = useState();

  const deleteCar = (id) => {
    firebase
      .firestore()
      .collection("listings")
      .doc(id)
      .delete()
      .then(() => {
        message.success("Elan silindi.");
      })
      .catch(() => {
        message.error("Xəta baş verdi.");
      });
  };

  useEffect(() => {
    if (
      firebase.auth().currentUser &&
      firebase.auth().currentUser.uid == props.uid
    ) {
      const db = firebase.firestore();
      db.collection("listings")
        .where("uid", "==", props.uid)
        .orderBy("created_date", "desc")
        // .limit(10)
        .get()
        .then(function (querySnapshot) {
          // console.log(querySnapshot.docs);
          const data = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setCars(cars.concat(data));
          setIsAuth(true);
          // setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
          setIsLoading(false);
        });
    } else {
      const db = firebase.firestore();
      db.collection("listings")
        .where("uid", "==", props.uid)
        .where("isActive", "==", true)
        .where("isApproved", "==", true)
        .orderBy("created_date", "desc")
        // .limit(10)
        .get()
        .then(function (querySnapshot) {
          // console.log(querySnapshot.docs);
          const data = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setCars(cars.concat(data));
          setIsAuth(false);
          // setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
          setIsLoading(false);
        });
    }
  }, []);

  if (!isEditing) {
    return (
      <div>
        <Row
          gutter={[
            { xs: 8, sm: 16, md: 24, lg: 32 },
            { xs: 8, sm: 16, md: 24, lg: 32 },
          ]}
        >
          {cars &&
            cars.map((car) => (
              <Col key={car.id} xs={24} sm={12} md={8} lg={6} xl={6}>
                <GridItem
                  auth={isAuth}
                  car={car}
                  isEditing={isEditing}
                  setIsEditing={setIsEditing}
                  editingCar={editingCar}
                  setEditingCar={setEditingCar}
                  setIsDeleting={setIsDeleting}
                  deletingCar={deletingCar}
                  setDeletingCar={setDeletingCar}
                ></GridItem>
              </Col>
            ))}
          {isLoading && (
            <Col xs={24} sm={12} md={8} lg={6} xl={6}>
              <Skeleton />
            </Col>
          )}
        </Row>
        <br />
        {deletingCar && (
          <Modal
            title={
              deletingCar.year +
              " " +
              deletingCar.make +
              " " +
              deletingCar.model
            }
            visible={isDeleting}
            onCancel={() => {
              setIsDeleting(false);
            }}
            footer={[
              <Button
                key="no"
                onClick={() => {
                  setIsDeleting(false);
                }}
              >
                Xeyr
              </Button>,
              <Button
                danger
                key="yes"
                onClick={() => {
                  deleteCar(deletingCar.id);
                  setIsDeleting(false);
                }}
              >
                Bəli
              </Button>,
            ]}
          >
            <Result
              status="warning"
              title="Elanı silmək istədiyinizdən əminsinizmi?"
            />
          </Modal>
        )}
      </div>
    );
  } else if (isEditing) {
    return <Edit car={editingCar} setIsEditing={setIsEditing} />;
  }
}
