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

export default function About() {
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
            <Title style={{ color: "white" }}>BESTCARS.AZ</Title>
            <Title style={{ color: "white" }} level={5}>
              Ölkəmizdəki seçilmiş avtomobillərin alış və satışı üçün yaradılmış
              platformdur.
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
              <Title level={3}>Haqqımızda</Title>
              <p>
                bestcars.az saytında sadəcə seçilmiş avtomobillər yerləşdirilir.
                Seçimdə rol oynayan faktorlar marka, model, xüsusi buraxılış
                olması və ya avtomobilin vəziyyətidir. Əgər sizin avtomobil
                bizim saytda satışa çıxmaq ücün uyğundursa, o zaman bizim
                komanda həmin avtomobilin yüksək keyfiyyətdə və xüsusi formatda
                təqdimat videolarını hazırlayır. Yalnız bundan sonra avtomobil
                bizim platformda satışa çıxardılır. Avtomobil satılana qədər
                bizim platformda qala bilir və bu müddət ərzində avtomobilin
                düzgün kütləyə çatdırılması üçün bestcars.az komandası daim
                fəaliyyət göstərir.
              </p>
            </Card>
          </Col>

          <Col xs={24} sm={24} md={8} lg={8} xl={8}>
            <Card bordered={false}>
              <Title level={3}>Hədəf</Title>
              <p>
                Ölkəmizdə yer alan seçilmiş avtomobillərin alıcı kütləyə yüsək
                keyfiyyətdə təqdim edilməsidir.
              </p>
            </Card>
          </Col>

          <Col xs={24} sm={24} md={8} lg={8} xl={8}>
            <Card bordered={false}>
              <Title level={3}>Gözlənti</Title>
              <p>
                Dəyərli avtomobillərin layiqincə təqdim olunması və yanlış
                informasiyalardan kənar yüksək keyfiyyətli dijital alış-satış
                nöqtəsinin formalaşması.
              </p>
            </Card>
          </Col>
        </Row>
      </div>
      <div
        style={{ paddingBottom: "0", paddingTop: "0" }}
        className="listings-container"
      >
        <Card bordered={false}>
          <Title level={3}>Xidmətlər</Title>
          <p>Bu dəyərlər bizi digərlərindən fərqləndirir.</p>
        </Card>
        <Row
          gutter={[
            { xs: 8, sm: 16, md: 24, lg: 32 },
            { xs: 8, sm: 16, md: 24, lg: 32 },
          ]}
        >
          <Col xs={24} sm={24} md={8} lg={8} xl={8}>
            <Card
              bordered={false}
              cover={
                <img
                  style={styles.image}
                  alt="example"
                  src="https://i.pinimg.com/originals/f7/61/67/f76167dc6e7ed56f775c383d4028220a.jpg"
                />
              }
            >
              <h1>Video Təqdimat</h1>
              <p>
                Bizim video təqdimatımız sayəsində avtomobillər maksimum
                dərəcədə alıcıların diqqətinə çatdırılır. Videolarımız xüsusi
                format üzrə və hər bir avtomobilin özəlliklərini yansıdacaq
                şəkildə başdan sona qədər düşünülür və yüksək keyfiyyətdə tərtib
                edilir.{" "}
              </p>
            </Card>
          </Col>

          <Col xs={24} sm={24} md={8} lg={8} xl={8}>
            <Card
              bordered={false}
              cover={
                <img
                  style={styles.image}
                  alt="example"
                  // src="https://images.unsplash.com/photo-1610333248098-eef6d6ff4b31?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1789&q=80"
                  src="https://firebasestorage.googleapis.com/v0/b/test-car-sales.appspot.com/o/m8.JPG?alt=media&token=aca4502a-d175-4da6-8990-4eb4a3c6dcf1"
                />
              }
            >
              <h1>Xüsusi Platform</h1>
              <p>
                Bizim platform yalnız seçilmiş avtomobillərin satılmasına xidmət
                göstərir. Belə ki, platform istifadəçiləri bunun fərqindədir və
                bu sizə düzgün kütləyə çıxış üçün vasitədir. Avtomobilinizin çox
                insan yox, düzgün insanlara təqdim olunması xidmətlərimizdəndir.{" "}
              </p>
            </Card>
          </Col>

          <Col xs={24} sm={24} md={8} lg={8} xl={8}>
            <Card
              bordered={false}
              cover={
                <img
                  style={styles.image}
                  alt="example"
                  src="https://gtspirit.com/wp-content/uploads/2015/06/slider6.jpg"
                />
              }
            >
              <h1>Başdan Sona!</h1>
              <p>
                Birlikdə başladığımız işi birlikdə bitiririk. Avtomobiliniz
                satılana qədər bizim platformun qonağıdır!{" "}
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
