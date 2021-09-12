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

export default function Faq() {
  return (
    <div>
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
          <Col xs={24} sm={24} md={16} lg={16} xl={16}>
            <Card bordered={false}>
              <Title level={3}>Tez-tez soruşulan suallar</Title>
              <p>
                Aşağıda bəzi tez-tez soruşulan suallara cavab tapa bilərsiniz.
              </p>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={16} lg={16} xl={16}>
            <Card bordered={false}>
              <Title level={3}>1. bestcars.az nə edir?</Title>
              <p>
                bestcars.az ölkəmizdəki seçilmiş avtomobillərin satışı üçün
                yaradılmış platformdur. Biz həm bu avtomobillərin foto və video
                təqdimatlarını hazırlayır, həm də elanlarını dərc edirik.
              </p>
            </Card>
          </Col>

          <Col xs={24} sm={24} md={16} lg={16} xl={16}>
            <Card bordered={false}>
              <Title level={3}>
                2. Bu qədər elan saytı var, niyə bestcars.az?
              </Title>
              <p>
                bestcars.az bütün elanları dərc etmir. Sadəcə xüsusi
                avtomobillərin elanlarını yerləşdirir ki, bu da sizə digər
                avtomobillər arasında elan yerləşdirmə mecburiyyətindən qurtarır
                və sizin maşını düzgün kütləyə çatdırır.
              </p>
            </Card>
          </Col>

          <Col xs={24} sm={24} md={16} lg={16} xl={16}>
            <Card bordered={false}>
              <Title level={3}>3. Nəyə görə video təqdimat?</Title>
              <p>
                Seçimiş avtomobillərin dəyərini avtosevərlər bilir. Avtosevərlər
                üçün isə maşınları detallı incələmək önəmlidir. Biz bunu
                alıcıların zövq alacağı bir formata gətiririk.
              </p>
            </Card>
          </Col>

          <Col xs={24} sm={24} md={16} lg={16} xl={16}>
            <Card bordered={false}>
              <Title level={3}>
                4. Maşınımı bestcars.az ilə necə sata bilərəm?
              </Title>
              Avtomobilinizi bestcars.az saytında satmaq istəyirsinizsə
              hesabınıza
              <a href="/login"> giriş</a> edərək elan əlavə edin. Yalnız formata
              uyğun elanlar qəbul edilir.
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
