import React, { useState, useEffect } from "react";

import { Row, Col } from "antd";

export default function PhotoGrid(props) {
  const [isDesktop, setDesktop] = useState(window.innerWidth > 1450);

  const updateMedia = () => {
    setDesktop(window.innerWidth > 1450);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });
  //   return (
  //     <div>
  //       <Row gutter={[8, 8]}>
  //         <Col span={24}>
  //           <img className="photo-grid-image-main" src={PHOTOS[0]} />
  //         </Col>

  //         {PHOTOS.map((photo) => (
  //           <Col span={8}>
  //             <img className="photo-grid-image" src={photo} />
  //           </Col>
  //         ))}
  //       </Row>
  //     </div>
  //   );
  return (
    <div onClick={props.onClick}>
      {isDesktop ? (
        <Row gutter={[8, 8]}>
          <Col xs={24} sm={24} md={16} lg={16} xl={16}>
            <img className="photo-grid-image-main" src={props.photos[0]} />
          </Col>
          <Col xs={24} sm={24} md={8} lg={8} xl={8}>
            <Row gutter={[8, 8]}>
              {props.photos.slice(0, 7).map((photo) => (
                <Col span={12}>
                  <img className="photo-grid-image" src={photo} />
                </Col>
              ))}
              <Col span={12}>
                <div style={{ position: "relative" }}>
                  <div className="overlay photo-grid-image">
                    <p>+{props.photos.length - 4}</p>
                  </div>
                  <img className="photo-grid-image" src={props.photos[7]} />
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      ) : (
        <Row gutter={[8, 8]}>
          <Col xs={24} sm={24} md={16} lg={16} xl={16}>
            <img className="photo-grid-image-main" src={props.photos[0]} />
          </Col>
          <Col xs={24} sm={24} md={8} lg={8} xl={8}>
            <Row gutter={[8, 8]}>
              {props.photos.slice(0, 3).map((photo) => (
                <Col span={12}>
                  <img className="photo-grid-image" src={photo} />
                </Col>
              ))}
              <Col span={12}>
                <div style={{ position: "relative" }}>
                  <div className="overlay photo-grid-image">
                    <p>+{props.photos.length - 3}</p>
                  </div>
                  <img className="photo-grid-image" src={props.photos[3]} />
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      )}
    </div>
  );
}
