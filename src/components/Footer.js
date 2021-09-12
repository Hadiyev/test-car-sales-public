import React from "react";

import { NavLink } from "react-router-dom";

import {
  Breadcrumb,
  PageHeader,
  Row,
  Col,
  Descriptions,
  Tabs,
  Button,
  Statistic,
  Typography,
  Card,
  Tag,
} from "antd";

import { InstagramOutlined, YoutubeOutlined } from "@ant-design/icons";

const { Title } = Typography;

export default function Footer() {
  return (
    <div>
      <div
        style={{ minHeight: "35vh", backgroundColor: "black", color: "white" }}
      >
        <div className="my-container">
          <Row
            gutter={[
              { xs: 8, sm: 16, md: 24, lg: 32 },
              { xs: 8, sm: 16, md: 24, lg: 32 },
            ]}
          >
            <Col xs={24} sm={12} md={8} lg={6} xl={6}>
              <Title level={3} style={{ color: "white", paddingTop: "20px" }}>
                Yardım
              </Title>
              <a href="/faq">
                <p>Tez-tez Soruşulan Suallar</p>
              </a>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6} xl={6}>
              <Title level={3} style={{ color: "white", paddingTop: "20px" }}>
                Əlaqə
              </Title>
              <a href="/sell">
                <p>Bizimlə Sat!</p>
              </a>
              <a href="/about">
                <p>Haqqımızda</p>
              </a>
              <a href="/why">
                <p>Niyə Biz?</p>
              </a>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6} xl={6}>
              <Title level={3} style={{ color: "white", paddingTop: "20px" }}>
                Sosyal
              </Title>
              <a target="_blank" href="https://www.instagram.com/mr.bestcars/">
                <Tag icon={<InstagramOutlined />} color="#3f729b">
                  Instagram
                </Tag>
              </a>
              {/* <br /> */}
              <a
                target="_blank"
                href="https://www.youtube.com/channel/UCH1QTlMMlBmutPb3c9tUglQ"
              >
                <Tag icon={<YoutubeOutlined />} color="#cd201f">
                  Youtube
                </Tag>
              </a>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6} xl={6}>
              <Title level={3} style={{ color: "white", paddingTop: "20px" }}>
                bestcars.az
              </Title>
              <p>
                Biz ölkəmizdəki dəyərli avtomobillərin yüksək səviyyədə
                təqdimatlarını hazırlayırıq.
              </p>
            </Col>
          </Row>
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <p> www.bestcars.az - All rights reserved 2021.</p>
      </div>
    </div>
  );
}
