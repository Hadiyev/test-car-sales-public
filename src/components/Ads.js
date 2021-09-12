import React from "react";

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
  Divider,
  Carousel,
} from "antd";
import Banner from "./Banner";

const contentStyle = {
  height: "50vh",
  color: "#fff",
  lineHeight: "50vh",
  textAlign: "center",
  background: "#364d79",
};

const styles = {
  image_full: {
    // width: "100%",
    objectFit: "cover",
    // objectPosition: "50% 50%",
  },
};

export default function Ads() {
  return (
    <div>
      <Carousel autoplay autoplaySpeed={7000}>
        {/* <div>
          <h3 style={contentStyle}>
            <div className="video-outer-container">
              <div className="video-container">
                <img
                  style={{
                    width: "100%",
                    height: "75vh",
                    objectFit: "cover",
                  }}
                  src="https://w.wallhaven.cc/full/wy/wallhaven-wyodr7.jpg"
                />
                <div className="semitransparent"></div>
                <div className="video-overlay"></div>
              </div>
            </div>
          </h3>
        </div> */}
        <div>
          <h3 style={contentStyle}>
            <div className="video-outer-container">
              <Banner />
            </div>
          </h3>
        </div>
      </Carousel>
    </div>
  );
}
