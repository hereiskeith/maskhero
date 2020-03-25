import React, { useState, useEffect, useLayoutEffect } from "react";
import logo from "./images/logo.png";
import avatar from "./images/avatar.png";
import ICBC from "./images/ICBC.png";
import icon1 from "./images/icon1.png";
import icon2 from "./images/icon2.png";
import icon3 from "./images/icon3.png";
import icon4 from "./images/icon4.png";
import footerImg from "./images/footer-img.png";
import title from "./images/title.png";
import "./App.scss";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { buildChart } from "./utils/chartUtils";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import heroine from "./images/heroine.png";
import axios from "axios";

am4core.useTheme(am4themes_animated);

const API_KEY = process.env.REACT_APP_JINSHUJU_API_KEY;
const API_SECRET = process.env.REACT_APP_JINSHUJU_API_SECRET;
const API_BASE = "https://jinshuju.net/api/v1";
const DOMESTIC_ENDPOINT = "/forms/HAKraV/entries";
const FOREIGN_ENDPOINT = "/forms/DecUHn/entries";
const VOLUNTEER_ENDPOINT = "/forms/qrIApg/entries";
const DONATOR_ENDPOINT = "/forms/gFPs9s/entries";
const SPONSER_ENDPOINT = "/forms/zMk7kx/entries";
const DOMESTIC_FORM_LINK = "https://jinshuju.net/f/HAKraV";
const FOREIGN_FORM_LINK = "https://jinshuju.net/f/DecUHn";
const VOLUNTEER_FORM_LINK = "https://jinshuju.net/f/qrIApg";
const SPONSER_FORM_LINK = "https://jinshuju.net/f/zMk7kx";

const App = () => {
  const [chart, setChart] = useState();
  const [maskCount, setMaskCount] = useState(0);
  const [helpCount, setHelpCount] = useState(0);
  const [volunteerCount, setVolunteerCount] = useState(0);
  const [domesticData, setDomesticData] = useState([]);
  const [foreignData, setForeignData] = useState([]);
  const [volunteerData, setVolunteerData] = useState([]);
  const [donatorData, setDonatorData] = useState([]);
  const [sponserData, setSponserData] = useState([]);

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  useLayoutEffect(() => {
    if (
      domesticData.length > 0 &&
      foreignData.length > 0 &&
      volunteerData.length > 0
    ) {
      const chart = am4core.create("chartdiv", am4maps.MapChart);
      buildChart(chart, domesticData, foreignData, volunteerData);
      setChart(chart);
    }
    return () => {
      chart && chart.dispose();
    };
  }, [domesticData, foreignData, volunteerData]);

  useEffect(() => {
    const authObj = {
      auth: {
        username: API_KEY,
        password: API_SECRET
      }
    };

    axios
      .get(`${API_BASE}${DOMESTIC_ENDPOINT}`, { ...authObj })
      .then(response => {
        const { data } = response.data;
        setDomesticData(data);
        setMaskCount(
          data.reduce((total, currentValue) => {
            // field_10 means masks
            return total + currentValue["field_10"];
          }, 0)
        );
      })
      .catch(error => console.log(error));

    axios
      .get(`${API_BASE}${FOREIGN_ENDPOINT}`, { ...authObj })
      .then(response => {
        const { data } = response.data;
        setForeignData(data);
        setHelpCount(data.length);
      })
      .catch(error => console.log(error));

    axios
      .get(`${API_BASE}${VOLUNTEER_ENDPOINT}`, { ...authObj })
      .then(response => {
        const { data } = response.data;
        setVolunteerData(data);
        setVolunteerCount(data.length);
      })
      .catch(error => console.log(error));

    axios
      .get(`${API_BASE}${DONATOR_ENDPOINT}`, { ...authObj })
      .then(response => {
        const { data } = response.data;
        setDonatorData(data);
      })
      .catch(error => console.log(error));

    axios
      .get(`${API_BASE}${SPONSER_ENDPOINT}`, { ...authObj })
      .then(response => {
        const { data } = response.data;
        setSponserData(data);
      })
      .catch(error => console.log(error));
  }, []);

  const list = [];
  for (let i = 0; i < 16; i++) {
    list.push(
      <div className="avatar">
        <img src={avatar} alt="avatar" />
        <div className="cover"></div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="header">
        <img src={logo} className="logo" alt="logo" />
        <img src={title} className="title" alt="title" />
        <h1>海外的亲们，是时候让我们陪你们打下半场了！</h1>
        <p>
          这场疫情，国内打下半场，国外打下半场，海外华人打全场。”这话于国内的我们而言是段子，于国外的你们是猝不及防的遭遇。
          在倾力支援国内之后，异国他乡的土地上的你们，除了对抗病毒本身，还要替我们承受“Chinese
          Virus”的污名乃至这背后的威胁、暴力。
          这一切，国内的亲们，不会坐视。岂曰无衣，与子同袍！我们一起来打下半场。
        </p>
        <div className="wrapper">
          <div className="tile">
            <div className="name">捐赠口罩</div>
            <div className="data">
              {maskCount}
              <span className="unit">个</span>
            </div>
          </div>
          <div className="tile">
            <div>收到捐款</div>
            <div className="data">
              <span className="red">3930</span>
              <span className="unit">元</span>
            </div>
          </div>
          <div className="tile">
            <div>求助信息</div>
            <div className="data">
              {helpCount}
              <span className="unit">条</span>
            </div>
          </div>
          <div className="tile">
            <div>志愿者</div>
            <div className="data">
              {volunteerCount}
              <span className="unit">人</span>
            </div>
          </div>
          <div className="tile">
            <div>援助海外城市</div>
            <div className="data">
              <span className="red">3</span>
              <span className="unit">个</span>
            </div>
          </div>
        </div>
      </header>
      <section className="support">
        <h1>援助信息</h1>
        <p className="text">
          我们正在以城市为单位，接收海外华人的援助申请，同时在国内募集物资，实施援助。
        </p>
        <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
        <div className="info">
          <div>
            <div>
              <p>
                凡华人组织和个人都可以通过这里申请口罩援助，我们会认真对待每一条申请。
              </p>
              <a
                className="btn"
                target="_blank"
                rel="noopener noreferrer"
                href={FOREIGN_FORM_LINK}
                type="button"
              >
                申请援助
              </a>
            </div>
            <div>
              {foreignData.map(data => (
                <div className="requester">
                  <div className="content">{data["field_7"]}</div>
                  <div className="requester-info">
                    <p>{`${data["field_1"]}`}</p>
                    <p>{`${data["field_2"]}-${data["field_3"]}`}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div>
              <table className="pure-table pure-table-striped">
                {donatorData.map(data => (
                  <tr>
                    <td>{data["field_1"]}</td>
                    <td>{data["field_7"]}</td>
                    <td>{data["created_at"]}</td>
                  </tr>
                ))}
              </table>
            </div>
            <div className="align-right">
              <p>我们目前急需口罩和采购口罩的资金。多少不限，请勿坐视。</p>
              <a
                className="btn"
                target="_blank"
                rel="noopener noreferrer"
                href={DOMESTIC_FORM_LINK}
                type="button"
              >
                提供援助
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="highlights">
        <h1>援助图记</h1>
        <p className="text">这里，是我们随手记录的一些真实瞬间。</p>
        <Slider {...carouselSettings}>
          <div className="carousel-images">
            <img src={heroine} alt="heroine"></img>
            <img src={heroine} alt="heroine"></img>
            <img src={heroine} alt="heroine"></img>
            <img src={heroine} alt="heroine"></img>
          </div>
          <div className="carousel-images">
            <img src={heroine} alt="heroine"></img>
            <img src={heroine} alt="heroine"></img>
            <img src={heroine} alt="heroine"></img>
            <img src={heroine} alt="heroine"></img>
          </div>
          <div className="carousel-images">
            <img src={heroine} alt="heroine"></img>
            <img src={heroine} alt="heroine"></img>
            <img src={heroine} alt="heroine"></img>
            <img src={heroine} alt="heroine"></img>
          </div>
        </Slider>
        <div className="volunteers">
          <div className="column left">
            <h2>默默付出着的志愿者们</h2>
            <p>
              坦诚的讲，做这样的公益太累了。如果没有这帮志愿者的陆续加入，我和@Char根本坚持不下来。
            </p>
            <p>要感谢的人太多，但我更想对这些同志们说——辛苦了！</p>
            <p>Respect!</p>
            <a
              className="btn"
              target="_blank"
              rel="noopener noreferrer"
              href={VOLUNTEER_FORM_LINK}
              type="button"
            >
              加入我们
            </a>
          </div>
          <div className="column right">{list}</div>
        </div>
      </section>
      <section className="sponsers">
        <h1>值得尊敬的伙伴们</h1>
        <p className="text">
          与子偕行，共赴国殇！这次行动中，以下这些无私有爱的合作伙伴们，也在发光发热。
        </p>
        <div>
          <img className="sponser" src={ICBC} alt="icbc" />
          <img className="sponser" src={ICBC} alt="icbc" />
          <img className="sponser" src={ICBC} alt="icbc" />
          <img className="sponser" src={ICBC} alt="icbc" />
          <img className="sponser" src={ICBC} alt="icbc" />
          <img className="sponser" src={ICBC} alt="icbc" />
          <img className="sponser" src={ICBC} alt="icbc" />
          <img className="sponser" src={ICBC} alt="icbc" />
          <img className="sponser" src={ICBC} alt="icbc" />
          <img className="sponser" src={ICBC} alt="icbc" />
          <img className="sponser" src={ICBC} alt="icbc" />
          <img className="sponser" src={ICBC} alt="icbc" />
          <img className="sponser" src={ICBC} alt="icbc" />
          <img className="sponser" src={ICBC} alt="icbc" />
          <img className="sponser" src={ICBC} alt="icbc" />
        </div>
        <center>
          <span>
            与子偕行，共赴国殇！这次行动中，以下这些无私有爱的合作伙伴们，也在发光发热。
          </span>
          <a
            className="btn"
            target="_blank"
            rel="noopener noreferrer"
            href={SPONSER_FORM_LINK}
            type="button"
          >
            合作联系
          </a>
        </center>
      </section>

      <section className="helpus">
        <h1>希望您能这样帮助我们</h1>
        <p className="text">我们每个人的顺手贡献，都将漂洋过海，温暖人心</p>
        <div className="qrcodes">
          <div className="qrcode">
            <img src={icon1} alt="qrcode" />
            <p>不在多少，但求有心</p>
            <a
              className="btn"
              target="_blank"
              rel="noopener noreferrer"
              href={SPONSER_FORM_LINK}
              type="button"
            >
              合作联系
            </a>
          </div>
          <div className="qrcode">
            <img src={icon2} alt="qrcode" />
            <p>不在多少，但求有心</p>
            <button type="button">爱心捐赠</button>
          </div>
          <div className="qrcode">
            <img src={icon3} alt="qrcode" />
            <p>转发就是很好的支持</p>
            <button type="button">分享</button>
          </div>
          <div className="qrcode">
            <img src={icon4} alt="qrcode" />
            <p>如果你是开发者</p>
            <button type="button">参与开源</button>
          </div>
        </div>
      </section>
      <footer>
        <img src={footerImg} alt="footer" />
        <center>Eleduck.com With Love.</center>
      </footer>
    </div>
  );
};

export default App;