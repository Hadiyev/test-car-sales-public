import React from "react";

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

const { Title } = Typography;

export default function Banner() {
  return (
    <div>
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
            Ölkəmizdəki Seçilmiş Avtomobilləri Sizə Təqdim Edirik.
          </Title>
          <Title style={{ color: "white" }} level={5}>
            Bu platform ölkəmizdəki seçilmiş avtomobillərin satışı və təqdimatı
            üçün nəzərdə tutulub.
          </Title>
        </div>
      </div>
    </div>
  );
}
