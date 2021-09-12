import React from "react";

import firebase from "./Firestore";

import { Card, Tag, Skeleton, Statistic, Switch } from "antd";

import {
  EditOutlined,
  EditFilled,
  EllipsisOutlined,
  SettingOutlined,
  PhoneOutlined,
  ClockCircleOutlined,
  HomeOutlined,
  CloseOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import CarStatus from "./CarStatus";

const { Meta } = Card;

const styles = {
  price: {
    float: "left",
    position: "absolute",
    left: "5px",
    top: "calc(30vh - 40px)",
    zIndex: "1000",
    backgroundColor: "#222222",
    color: "white",
    fontSize: "1em",
    paddingTop: "5px",
    paddingBottom: "8px",
    paddingLeft: "12px",
    paddingRight: "12px",
    borderRadius: "4px",
    fontWeight: "600",
  },
  image: {
    objectFit: "cover",
    width: "100%",
    height: "30vh",
    borderRadius: "4px",
  },
  description: { margin: "0px" },
  title: { margin: "0px", fontWeight: "bold" },
};

export default function GridItem(props) {
  const onChange = (checked) => {
    firebase.firestore().collection("listings").doc(props.car.id).update({
      isActive: checked,
    });
  };

  if (props.end && props.end == true) {
    return (
      <div>
        <Card
          bordered={false}
          cover={
            <div>
              <img
                style={styles.image}
                alt="example"
                src={
                  "https://assets.materialup.com/uploads/c83a9663-be0b-4397-b1af-67f520e44ef1/preview.png"
                }
                // src={
                //   "https://i.pinimg.com/originals/05/c7/9e/05c79ee812c45a7535f749cf5e49e94e.png"
                // }
              />
            </div>
          }
        >
          <Meta
            title={<p style={styles.title}>Son!</p>}
            description={
              <div>
                <p style={styles.description}>
                  Son elana catdiniz. Basqa elan yoxdur.
                </p>
              </div>
            }
          />
        </Card>
      </div>
    );
  } else if (props.auth) {
    return (
      <Card
        bordered={true}
        cover={
          <div>
            <Statistic
              valueStyle={styles.price}
              suffix={props.car.currency}
              value={props.car.price}
            />

            <a target="_blank" href={"/car/" + props.car.id}>
              <img
                style={styles.image}
                alt="example"
                src={props.car.images[0]}
              />
            </a>
          </div>
        }
        actions={[
          <CarStatus isApproved={props.car.isApproved} />,
          <CloseOutlined
            key="delete"
            onClick={() => {
              props.setIsDeleting(true);
              props.setDeletingCar(props.car);
            }}
          />,
          <Switch defaultChecked={props.car.isActive} onChange={onChange} />,
          <EditOutlined
            key="edit"
            onClick={() => {
              props.setIsEditing(true);
              props.setEditingCar(props.car);
            }}
          />,
        ]}
      >
        <Meta
          title={
            <a
              target="_blank"
              href={"/car/" + props.car.id}
              style={styles.title}
            >
              {props.car.year} {props.car.make} {props.car.model}
            </a>
          }
          description={
            <div>
              <p style={styles.description}>
                {props.car.engine} L, {props.car.horsepower} At Gücü,{" "}
                {props.car.milage} KM Yürüş,{" "}
              </p>
              <p style={styles.description}>{props.car.location} Şəhərində</p>
            </div>
          }
        />
      </Card>
    );
  } else {
    return (
      <Card
        bordered={false}
        cover={
          <div>
            <Statistic
              valueStyle={styles.price}
              suffix={props.car.currency}
              value={props.car.price}
            />

            <a target="_blank" href={"/car/" + props.car.id}>
              <img
                style={styles.image}
                alt="example"
                src={props.car.images[0]}
              />
            </a>
          </div>
        }
      >
        <Meta
          title={
            <a
              target="_blank"
              href={"/car/" + props.car.id}
              style={styles.title}
            >
              {props.car.year} {props.car.make} {props.car.model}
            </a>
          }
          description={
            <div>
              <p style={styles.description}>
                {props.car.engine} L, {props.car.horsepower} At Gücü,{" "}
                {props.car.milage} KM Yürüş,{" "}
              </p>
              <p style={styles.description}>{props.car.location} Şəhərində</p>
            </div>
          }
        />
      </Card>
    );
  }
}
