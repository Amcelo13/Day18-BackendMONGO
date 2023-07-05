import React, { useRef } from "react";
import "./Home.css";
import { Typography, Modal, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import getApi from "../services/getApi";
import axios from 'axios'
import Sun from "../assets/Sun.svg";
import Moon from "../assets/White_Moon.svg";
import Rain from "../assets/Rain.svg";
import Dust from "../assets/Dust.svg";
import Clouds from "../assets/Clouds.svg";

import Sunny from "../assets/Sunny.jpg";
import Dusty from "../assets/Dusty.jpg";
import Cloudy from "../assets/Cloudy.jpg";
import Rainy from "../assets/Rainy.jpg";
import Night from "../assets/Night.jpg";
const { Search } = Input;
const { Title } = Typography;

function Home() {
  const cityRef  = useRef()
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [day, setday] = useState("");
  const [ico, setIco] = useState(null);
  const [searchCity, setSearchCity] = useState("");
  const [weather_nature, setweather_nature] = useState("");
  const [bf, setbf] = useState(Sunny);
  const [cityUpper, setCityToUpper]  = useState("");

  //SEARCH LOGIC
  const onSearch = (value) => {
    //   console.log(cityRef.current.input.value)
    // setSearchCity(cityRef.current.input.value);
    // console.log(searchCity);
   axios.post('http://localhost:4000/weather', {
    cityName: cityRef.current.input.value
  }).then((response) => {
    // console.log(response.data);
   setData(response.data)
   setCityToUpper(response.data.city_name.charAt(0).toUpperCase() + response.data.city_name.slice(1))
  }).catch((err) => {
    alert('No data found')
  })
  // setSearchCity("")
    setOpen(false);
  };

  return (
    <div className="parent--container" style={{ height: "100%", width: "98%" }}>
      <div className="weather">
        <div className="banner" style={{ background: `url(${bf})` }}>
          <div className="info">
            <Title id="temp">{Math.round(data?.temp)}°C</Title>
            <Title level={6} id="city">
              {cityUpper}, {data?.country}
            </Title>
            <Title level={6} id="city1">
              {day}
            </Title>
            <div>
              <img
                style={{
                  height: "10rem",
                  marginTop: "-6rem",
                  paddingLeft: "3rem",
                  color: "white",
                  paddingBottom: "1rem",
                }}
                src={ico}
                alt=""
              />
            </div>
            <Title level={6} id="weather--nature">
                    {data?.weather_nature}
            </Title>
          </div>

          <div className="search" onClick={() => setOpen(true)}>
            <SearchOutlined />
          </div>
          <Modal
            title="Search for Cities"
            centered
            open={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            width={1100}
            footer={null}
            style={{
              position: "fixed",
              marginLeft: "-35rem",
              marginTop: "7rem",
            }}
          >
            <Search
              placeholder="Enter the city"
              onSearch={onSearch}
              enterButton ref={cityRef}
              style={{ height: "5rem" }}
            />
          </Modal>
        </div>

        <div className="four--days">
          <div className="day--flex">
            <Title level={6} id="day">
              Monday
            </Title>
            <div>
              <Title id="small">30°</Title>
              <Title id="small">Sunny</Title>
            </div>
          </div>
          <div className="day--flex">
            <Title level={6} id="day">
              Tuesday
            </Title>
            <div>
              <Title id="small">30°</Title>
              <Title id="small">Sunny</Title>
            </div>
          </div>
          <div className="day--flex">
            <Title level={6} id="day">
              Wednesday
            </Title>
            <div>
              <Title id="small">30°</Title>
              <Title id="small">Sunny</Title>
            </div>
          </div>
          <div className="day--flex">
            <Title level={6} id="day">
              Thursday
            </Title>
            <div>
              <Title id="small">30°</Title>
              <Title id="small">Sunny</Title>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
