import React, { useState, useEffect } from "react";

import { NavLink, Redirect } from "react-router-dom";

import firebase from "./Firestore";

import ReactBnbGallery from "react-bnb-gallery";
import SmartGallery from "react-smart-gallery";

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
  Skeleton,
} from "antd";
import PhotoGrid from "./PhotoGrid";
import CarInfoTable from "./CarInfoTable";
import Grid from "./Grid";
import SellWithUs from "./SellWithUs";

const { Title, Paragraph, Text, Link } = Typography;

const PHOTOS = [
  "https://media.wired.com/photos/5d09594a62bcb0c9752779d9/1:1/w_1500,h_1500,c_limit/Transpo_G70_TA-518126.jpg",
  "https://images.cars.com/cldstatic/wp-content/uploads/img579850503-1550692697330.jpg",
  "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2019-genesis-g70-ltupdate-109-1596114887.jpg?crop=1xw:1xh;center,top&resize=480:*",
  "https://cdcssl.ibsrv.net/cimg/www.carsdirect.com/580x375_85/525/Large-1420-GenesisG70-600525.jpg",
  "https://www.thetorquereport.com/wp-content/uploads/2019/03/2019-Genesis-G70-Review-0005.jpg",
  "https://www.netcarshow.com/Genesis-G70-2019-1024-05.jpg",
  "https://www.netcarshow.com/Genesis-G70-2019-1024-1c.jpg",
  "https://www.netcarshow.com/Genesis-G70-2019-1024-33.jpg",
  "https://www.netcarshow.com/Genesis-G70-2019-1024-02.jpg",
  "https://www.netcarshow.com/Genesis-G70-2019-1024-35.jpg",
  "https://www.netcarshow.com/Genesis-G70-2019-1024-46.jpg",
];

export default function Detail({ match }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [carData, setCarData] = useState({});

  const id = match.params.id;

  useEffect(() => {
    const db = firebase.firestore();
    db.collection("listings")
      .doc(id)
      .get()
      .then(function (doc) {
        const data = doc.data();
        setCarData(data);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div>
        <Row gutter={[8, 8]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <div style={{ backgroundColor: "black", height: "60vh" }}>
              <iframe
                className="iframe-center"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </Col>
        </Row>
        <Row gutter={[8, 8]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <div className="listings-container">
              <Skeleton></Skeleton>
            </div>
          </Col>
        </Row>
      </div>
    );
  } else if (carData) {
    return (
      <div>
        {carData.video && (
          <div style={{ backgroundColor: "black", height: "60vh" }}>
            <iframe
              className="iframe-center"
              src={carData.video}
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        )}

        <div className="my-container">
          <br />
          <Typography>
            <Title level={3}>
              <NavLink to={"/cars/year/" + carData.year}>
                {carData.year}{" "}
              </NavLink>
              <NavLink to={"/cars/make/" + carData.make}>
                {carData.make}{" "}
              </NavLink>
              <NavLink to={"/cars/model/" + carData.model}>
                {carData.model}
              </NavLink>
            </Title>
            <Paragraph>
              {carData.milage + " KM yürüş, " + carData.location + " şəhəri "}
            </Paragraph>
          </Typography>
          <Row gutter={[8, 8]}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <div>
                <PhotoGrid
                  photos={carData.images}
                  onClick={(event, src) => setIsOpen(true)}
                ></PhotoGrid>
              </div>
            </Col>

            <Col xs={24} sm={24} md={16} lg={16} xl={16}>
              <PageHeader
                className="site-page-header-responsive"
                style={{ paddingTop: "0px" }}
              >
                <Row>
                  <Col>
                    <Statistic
                      title={carData.seller}
                      value={carData.phone}
                      style={{
                        marginRight: 32,
                      }}
                    />
                  </Col>
                  <Col>
                    <Statistic
                      title="Qiymət"
                      suffix={carData.currency}
                      value={carData.price}
                    />
                  </Col>
                </Row>
              </PageHeader>
              <br />
              <CarInfoTable carData={carData}></CarInfoTable>
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <PageHeader
                className="site-page-header-responsive"
                style={{ paddingTop: "0px" }}
              >
                <Statistic
                  title="Bənzəri ban növündəki mövcud digər avtomobillər"
                  value="Bənzəri ban növündəki digər avtomobillər"
                />
              </PageHeader>
              <br />
              <Grid car_id={id} body_type={carData.body_type}></Grid>
            </Col>
          </Row>
          <ReactBnbGallery
            show={isOpen}
            photos={carData.images}
            onClose={() => setIsOpen(false)}
          />
          <br />
          <br />
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
          <br />
          <br />
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <Redirect to="/notfound" />
      </div>
    );
  }
}
