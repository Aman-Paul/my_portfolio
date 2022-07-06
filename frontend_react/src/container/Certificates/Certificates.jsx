import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

import { AppWrap, MotionWrap } from "../../wrapper";
import { urlFor, client } from "../../client";
import "./Certificates.scss";

const Certificates = () => {
  const [brands, setBrands] = useState([]);
  const [certificates, setCertificates] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(2);

  useEffect(() => {
    const query = '*[_type == "Certificates"]';
    const brandsQuery = '*[_type == "brands"]';

    client.fetch(query).then((data) => {
      console.log(data);
      setCertificates(data);
    });

    client.fetch(brandsQuery).then((data) => {
      console.log("brands", data);
      setBrands(data);
    });
  }, []);

  const handleClick = (index) => {
    setCurrentIndex(index);
  };

  const cert = certificates[currentIndex];

  return (
    <>
      <h2 className="head-name">Certificates & Brands</h2>
      {certificates.length && (
        <>
          <div className="app__certificates-item app__flex">
            <img src={urlFor(cert.imageurl)} alt="certificate" />

            <div className="app__certificates-content">
              <p className="p-text">{cert.description}</p>

              <div>
                <h4 className="bold-text">{cert.name}</h4>
                <h5 className="p-text">{cert.company}</h5>
              </div>
            </div>
          </div>
          <div className="app__certificates-btns app__flex">
            <div
              className="app__flex"
              onClick={() =>
                handleClick(
                  currentIndex === 0
                    ? certificates.length - 1
                    : currentIndex - 1
                )
              }
            >
              <HiChevronLeft />
            </div>
            <div
              className="app__flex"
              onClick={() =>
                handleClick(
                  currentIndex === certificates.length - 1
                    ? 0
                    : currentIndex + 1
                )
              }
            >
              <HiChevronRight />
            </div>
          </div>
        </>
      )}
      <div className="app__certificates-brands app__flex">
        {brands.map((brand) => (
          <motion.div
            whileInView={{ opacity: [0, 1] }}
            transition={{ duration: 0.5, type: "tween" }}
            key={brand._id}
          >
            <img src={urlFor(brand.imgUrl)} alt={brand.name} />
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Certificates, "app__certificates"),
  "Certificates",
  "app__primarybg"
);
