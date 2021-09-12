import React, { useEffect, useState } from "react";

import { Waypoint } from "react-waypoint";

import firebase from "./Firestore";

import jsonData from "../files/car-makes.json";

import vid from "../files/bg-video.mp4";

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
import SellWithUs from "./SellWithUs";

const { Option } = Select;

const { Meta } = Card;

const { Title } = Typography;

const styles = {
  image: {
    borderRadius: "5px",
    height: "40vh",
    objectFit: "cover",
    width: "100%",
  },
};

export default function NotFound() {
  return (
    <div>
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
              height: "85vh",
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
          <div
            style={{ height: "85vh", opacity: "1" }}
            className="semitransparent"
          ></div>
          <div className="video-overlay">
            <Title style={{ color: "white" }}>Bu səhifə mövcud deyil</Title>
            <Title style={{ color: "white" }} level={5}>
              Daxil olmaq istədiyiniz səhifə mövcud deyil. Başqa bir səhifə
              seçərək davam edin.
            </Title>
          </div>
        </div>
      </div>
    </div>
  );
}
