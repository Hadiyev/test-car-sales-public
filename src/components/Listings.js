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
import Logos from "./Logos";
import Featured from "./Featured";
import Banner from "./Banner";
import Ads from "./Ads";

const { Option } = Select;

const { Meta } = Card;

const { Title } = Typography;

export default function Listings() {
  const [isLoading, setIsLoading] = useState(true);

  const [cars, setCars] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);

  const [makes, setMakes] = useState([]);
  const [selectedMake, setSelectedMake] = useState(true);
  const [selectedBody, setSelectedBody] = useState(true);
  const [models, setModels] = useState([]);
  const [carData, setCarData] = useState();

  const onChangeMakes = (value) => {
    if (typeof value != "undefined" && value != "all") {
      setSelectedMake(value);
    } else {
      setSelectedMake(true);
    }

    setModels([]);

    if (typeof value != "undefined" && value != "all") {
      const filtered = carData.filter((car) => car.name == value);
      filtered[0].models.map((model) => {
        setModels((models) => [
          ...models,
          { label: model.name, value: model.name },
        ]);
      });
    }
  };

  const onChangeBody = (value) => {
    if (typeof value != "undefined" && value != "all") {
      setSelectedBody(value);
    } else {
      setSelectedBody(true);
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
        setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
        setIsLoading(false);
      });
  }, []);

  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <div className="video-outer-container">
      {/* <Banner /> */}
      {/* <Waypoint onLeave={onClickLoadMore} /> */}

      <Ads />

      {/* <div className="my-container">
        <Logos />
      </div> */}

      <div className="listings-container">
        <Card bordered={false}>
          <Title level={3}>Ən son əlavə edilən avtomobillər</Title>
          <p>
            Səhifənin sonuna doğru davam edərək bütün elanlara baxa bilərsiniz.
          </p>
        </Card>
      </div>
      <div className="my-container">
        <Form
          name="basic"
          // initialValues={props.data}
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          layout="vertical"
        >
          <Row
            gutter={[
              { xs: 8, sm: 16, md: 24, lg: 32 },
              { xs: 8, sm: 16, md: 24, lg: 32 },
            ]}
          >
            <Col xs={24} sm={12} md={8} lg={6} xl={6}>
              <Form.Item
                // label="Marka"
                name="make"
                rules={
                  [
                    // { required: true, message: "Zəhmət olmasa marka seçin!" },
                  ]
                }
              >
                <Select
                  onChange={onChangeMakes}
                  placeholder="Marka"
                  showSearch
                  // onChange={onSelectSetMake}
                  allowClear
                >
                  <Option value="all">Bütün markalar</Option>
                  {makes &&
                    makes.map((make) => (
                      <Option value={make.value}>{make.label}</Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6} xl={6}>
              <Form.Item
                // label="Ban növü"
                name="body"
                rules={
                  [
                    // { required: true, message: "Zəhmət olmasa marka seçin!" },
                  ]
                }
              >
                <Select
                  onChange={onChangeBody}
                  placeholder="Ban növü"
                  showSearch
                  // onChange={onSelectSetMake}
                  allowClear
                >
                  <Option value="all">Bütün ban növləri</Option>
                  <Option value="Sedan">Sedan</Option>
                  <Option value="Furqon">Furqon</Option>
                  <Option value="Hetçbek">Hetçbek</Option>
                  <Option value="Kupe">Kupe</Option>
                  <Option value="Kabrio">Kabrio</Option>
                  <Option value="Rodster">Rodster</Option>
                  <Option value="SUV">SUV</Option>
                  <Option value="Van">Van</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
      <div className="listings-container">
        <Row
          gutter={[
            { xs: 8, sm: 16, md: 24, lg: 32 },
            { xs: 8, sm: 16, md: 24, lg: 32 },
          ]}
        >
          {cars &&
            cars
              .filter((car) => {
                if (selectedMake === true) {
                  if (selectedBody === true) {
                    return car;
                  } else {
                    return car.body_type == selectedBody;
                  }
                } else {
                  if (selectedBody === true) {
                    return car.make == selectedMake;
                  } else {
                    return (
                      car.make == selectedMake && car.body_type == selectedBody
                    );
                  }
                }
              })
              .map((car) => (
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
