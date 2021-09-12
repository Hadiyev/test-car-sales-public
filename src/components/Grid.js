import React, { useEffect, useState } from "react";

import firebase from "./Firestore";

import { Row, Col, Card, Tag } from "antd";
import GridItem from "./GridItem";

const { Meta } = Card;

export default function Grid(props) {
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const db = firebase.firestore();
    db.collection("listings")
      .where("body_type", "==", props.body_type)
      .orderBy("created_date", "desc")
      .limit(6)
      .get()
      .then(function (querySnapshot) {
        // console.log(querySnapshot.docs);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCars(cars.concat(data));
        setIsLoading(false);
      });
    //   .catch((error) => console.log(console.log(error)));
  }, []);

  return (
    <div>
      <Row gutter={[8, 8]}>
        {cars &&
          cars
            .filter((car) => {
              return car.id != props.car_id;
            })
            .map((car) => (
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <GridItem car={car}></GridItem>
              </Col>
            ))}
      </Row>
    </div>
  );
}
