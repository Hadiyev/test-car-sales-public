import React, { useEffect, useState } from "react";

import { Waypoint } from "react-waypoint";

import firebase from "./Firestore";

import jsonData from "../files/car-makes.json";

import vid from "../files/bg-video.mp4";

import SellWithUs from "./SellWithUs";

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
} from "antd";
import GridItem from "./GridItem";

const { Option } = Select;

const { Meta } = Card;

const { Title } = Typography;

export default function Year({ match }) {
  const [isLoading, setIsLoading] = useState(true);

  const [cars, setCars] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);

  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const [carData, setCarData] = useState();

  const year = parseInt(match.params.year);

  const onChangeMakes = (value) => {
    setModels([]);
    console.log("entered, value: ", value);
    if (typeof value != "undefined") {
      const filtered = carData.filter((car) => car.name == value);
      filtered[0].models.map((model) => {
        setModels((models) => [
          ...models,
          { label: model.name, value: model.name },
        ]);
      });
    }
  };

  const onClickLoadMore = () => {
    setIsLoading(true);
    const db = firebase.firestore();
    db.collection("listings")
      .orderBy("created_date", "desc")
      .startAfter(lastDoc)
      .limit(10)
      .get()
      .then(function (querySnapshot) {
        // console.log(querySnapshot.docs);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCars(cars.concat(data));
        querySnapshot.docs.length == 0
          ? setLastDoc(true)
          : setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setMakes([]);
    const carMakes = JSON.parse(JSON.stringify(jsonData));
    setCarData(carMakes);
    carMakes.map((car) => {
      setMakes((makes) => [...makes, { label: car.name, value: car.name }]);
    });

    const db = firebase.firestore();
    db.collection("listings")
      .where("year", "==", year)
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
        setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
        setIsLoading(false);
      });
    //   .catch((error) => console.log(console.log(error)));
  }, []);

  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <div className="video-outer-container">
      <div className="video-container">
        <video
          playsInline
          loop
          autoPlay
          muted
          style={{
            preload: "auto",
            width: "100%",
            height: "75vh",
            objectFit: "cover",
          }}
        >
          {/* <source src="https://player.vimeo.com/external/513724976.hd.mp4?s=7f1c89ea5f4a65c9ae89a6dc76516aa3d51fa62a&amp;profile_id=175" type="video/mp4"/> */}
          <source src={vid} type="video/mp4" />
        </video>
        {/* <div style={{width: "100%", height: "75vh", objectFit:"cover"}}> */}
        {/* <div className="video-background">
          <iframe allow="autoplay" frameborder="0" allowfullscreen src="https://youtube.com/embed/rWFbKMSMwwk?controls=0&showinfo=0&rel=0&autoplay=1&loop=1&mute=1"></iframe>
        </div> */}
        <div className="semitransparent"></div>
        <div className="video-overlay">
          <Title style={{ color: "white" }}>
            Your place to buy and sell luxurious cars.
          </Title>
          <Title style={{ color: "white" }} level={5}>
            We are experts in selection and presentation of the special cars.
          </Title>
        </div>
      </div>
      {/* <Waypoint onLeave={onClickLoadMore} /> */}

      <div className="listings-container">
        <Card bordered={false}>
          <Title level={3}>Bütün {year} il avtomobillər</Title>
          <p>
            Səhifənin sonuna doğru davam edərək bütün elanlara baxa bilərsiniz.
          </p>
        </Card>
        <Row
          gutter={[
            { xs: 8, sm: 16, md: 24, lg: 32 },
            { xs: 8, sm: 16, md: 24, lg: 32 },
          ]}
        >
          {cars &&
            cars.map((car) => (
              <Col key={car.id} xs={24} sm={12} md={8} lg={6} xl={6}>
                <GridItem car={car}></GridItem>
              </Col>
            ))}

          <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            {isLoading ? <Skeleton /> : ""}
            {lastDoc === true ? <GridItem end={true}></GridItem> : ""}
          </Col>
        </Row>
        {/* <Row
          gutter={[
            { xs: 8, sm: 16, md: 24, lg: 32 },
            { xs: 8, sm: 16, md: 24, lg: 32 },
          ]}
        >
          <Col xs={8} sm={8} md={8} lg={8} xl={8}>
            {lastDoc === null ? (
              <p>end</p>
            ) : (
              <Button onClick={onClickLoadMore}>
                Digər elanları görmək üçün bura basın
              </Button>
            )}
          </Col>
        </Row> */}
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
    </div>
  );
}
