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

export default function WhyUs() {
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
              height: "50vh",
              objectFit: "cover",
            }}
          >
            <source src={vid} type="video/mp4" />
          </video>
          <div
            style={{ height: "50vh", opacity: "0.9" }}
            className="semitransparent"
          ></div>
          <div className="video-overlay">
            <Title style={{ color: "white" }}>Nəyə Görə Biz?</Title>
            <Title style={{ color: "white" }} level={5}>
              Avtomobilinizi bestcars.az saytında satmaq üçün tutarlı səbəblər.
            </Title>
          </div>
        </div>
      </div>

      <div
        style={{ paddingBottom: "0", paddingTop: "0" }}
        className="listings-container"
      >
        <Row
          gutter={[
            { xs: 8, sm: 16, md: 24, lg: 32 },
            { xs: 8, sm: 16, md: 24, lg: 32 },
          ]}
        >
          <Col xs={24} sm={24} md={8} lg={8} xl={8}>
            <Card bordered={false}>
              <Title level={3}>1. Avtomobilinizə layiq platform</Title>
              <p>
                Seçilmiş maşınların bir yerdə olması bu tip avtomobil
                alıcılarına rahatlıq yaradır.
              </p>
            </Card>
          </Col>

          <Col xs={24} sm={24} md={8} lg={8} xl={8}>
            <Card bordered={false}>
              <Title level={3}>2. Video Təqdimat</Title>
              <p>
                Avtombilinizin düzgün təqdimatı potensiyal alıcılara avtomobil
                ilə daha yaxından tanış olmağa yardımcı olur. Belə ki, siz
                potensiyal alıcıları itirmir, digər tipli müştərilər ilə isə
                zaman itirmirsiniz.
              </p>
            </Card>
          </Col>

          <Col xs={24} sm={24} md={8} lg={8} xl={8}>
            <Card bordered={false}>
              <Title level={3}>3. Detallara Önəm</Title>
              <p>
                Hər bir maşının təqdimatı həmin avotomobilin özəlliklərinə və
                dizaynına uyğun tərtib edilir, bu da avtomobilin düzgün bir
                şəkildə təqdim edilməsinə gətirir.
              </p>
            </Card>
          </Col>

          <Col xs={24} sm={24} md={8} lg={8} xl={8}>
            <Card bordered={false}>
              <Title level={3}>4. Elanların Daim Öndə Olması</Title>
              <p>
                Bizim öz kanallarımız vasitəsi ilə bestcars.az saytında olan
                bütün avtomobillər daim reklam edilir ve önə çəkilir.
              </p>
            </Card>
          </Col>

          <Col xs={24} sm={24} md={8} lg={8} xl={8}>
            <Card bordered={false}>
              <Title level={3}>5. Elanın Ömrü</Title>
              <p>
                Sizin avtomobil yalnız siz elanı silmək istədiyinizdə silinir.
                Başqa bir deyişlə, maşın satılana qədər saytımızda aktiv qalır.
              </p>
            </Card>
          </Col>

          <Col xs={24} sm={24} md={8} lg={8} xl={8}>
            <Card bordered={false}>
              <Title level={3}>6. Elə isə</Title>
              <p>
                Əgər siz də satmaq istədiyniz avtomobilin bizim platforma layiq
                olduğunu düşünürsünüzsə, hesabınıza giriş edərək elan əlavə
                edin.
              </p>
            </Card>
          </Col>
        </Row>
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
