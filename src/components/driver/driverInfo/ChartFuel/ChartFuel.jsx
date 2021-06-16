import React, { useEffect, useState } from "react";
// import DriverCSS from '../driver.module.css'
// import Chart from 'chart.js/auto';
import { Line,Chart } from "react-chartjs-2";
// import Iframe  from  '@trendmicro/react-iframe' ;
import { Drawer, List, Avatar, Divider, Col, Row } from "antd";
import FileReader from './FileReader.jsx';
import './ChartFuelCSS.css'
const ChartFuel = ({
  warningArr,
  setWarningArr,
  refuelingArr,
  setRefuelingArr,
}) => {
  useEffect((props, nextprops) => {}, [warningArr]);
  const time = [
    "0:00",
    "00:30",
    "01:00",
    "01:30",
    "02:00",
    "02:30",
    "03:00",
    "03:30",
    "04:00",
    "04:30",
    "05:00",
    "05:30",
    "06:00",
    "06:30",
    "07:00",
    "07:30",
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00",
    "22:30",
    "23:00",
    "23:30",
  ];

  const [valueOne, setvalueOne] = useState();
  const [valueTwo, setvalueTwo] = useState();
  const [timeFullArr, settimeFullArr] = useState();

  const [fuel, setfuel] = useState({
    Iune1: [
      500, 480, 460, 440, 420, 400, 380, 360, 340, 320, 300, 280, 260, 240, 220,
      200, 180, 160, 140, 120, 100, 80, 60, 500, 490, 470, 460, 450, 440, 380,
      420, 410, 400, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 280,
      270, 260, 250,
    ],
    Iune2: [
      480, 480, 480, 480, 480, 480, 480, 480, 480, 480, 480, 480, 480, 480, 480,
      480, 480, 480, 460, 444, 423, 415, 397, 381, 365, 350, 334, 319, 303, 287,
      272, 256, 200, 190, 180, 180, 180, 180, 180, 180, 180, 180, 180, 180, 180,
      180, 180, 180,
    ],
    Iune3: [
      500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500,
      500, 500, 500, 500, 483, 465, 442, 422, 402, 381, 361, 340, 320, 299, 279,
      258, 238, 217, 197, 176, 156, 135, 115, 500, 500, 500, 500, 500, 500, 500,
      500, 500, 500,
    ],
  });
  const [timeArr, settimeArr] = useState(["1 июня", "5 июня", "13 июня"]);
  const [Date, setDate] = useState(timeArr[0]);
  const [ChartFuel, setChartFuel] = useState();

  const drawChart = () => {
    const a = valueOne;
    const b = valueTwo;
    let indexOne;
    let inedexTwo;
    let i = 0;
    indexOne = time.indexOf(a);
    inedexTwo = time.indexOf(b);
    let timeFull = [];

    if (indexOne <= inedexTwo) {
      for (indexOne; indexOne <= inedexTwo; indexOne++) {
        if (time[indexOne] == undefined) {
        } else {
          timeFull[i] = time[indexOne];
          i = i + 1;
        }
      }
    } else {
      alert("Данные не правильные");
    }

    settimeFullArr(timeFull);
  };
  let Warning = []; //массив с элементами где произошел слив бензина
  let Refueling = []; //массив с элементами где произошла заправка
  const handleSubmit = async (event) => {
    drawChart();
    await update();
    let fuelArr;
    if (Date == "1 июня") {
      fuelArr = fuel.Iune1;
      setChartFuel(fuelArr);
    } else if (Date == "5 июня") {
      fuelArr = fuel.Iune2;
      setChartFuel(fuelArr);
    } else {
      fuelArr = fuel.Iune3;
      setChartFuel(fuelArr);
    }

    // for (let i = 0; i <= 47; i++) {
    //   if (fuelArr[i] - fuelArr[i + 1] > 20) {

    //     Warning[i] = fuelArr[i];
    //     Warning[i + 1] = fuelArr[i + 1];
    //   } else {
    //     if (fuelArr[i] - fuelArr[i + 1] < 0) {
    //       Refueling[i] = fuelArr[i];
    //       Refueling[i + 1] = fuelArr[i + 1];
    //     } else {
    //     }
    //   }
    // }

    for (let i = 0; i <= 47; i++) {
      if (fuelArr[i] - fuelArr[i + 1] > 20) {
        Warning[i] = fuelArr[i];
        Warning[i + 1] = fuelArr[i + 1];
      } else {
        if (fuelArr[i] - fuelArr[i + 1] < 0) {
          Refueling[i] = fuelArr[i];
          Refueling[i + 1] = fuelArr[i + 1];
        } else {
        }
      }
    }

    setWarningArr(Warning);
    setRefuelingArr(Refueling);
    // data.update()
  };
  const update = () => {
    setWarningArr(null);
    setRefuelingArr(null);
  };

  const data = {
    labels: timeFullArr,
    datasets: [
      {
        label: "Возможный слив",
        data: warningArr,
        fill: true,

        borderColor: "rgba(255,0,0,1)",
      },
      {
        label: "Заправка",
        data: refuelingArr,
        fill: true,
        backgroundColor: "rgba(0,12,192,0.1)",
        borderColor: "rgba(0,12,192,0.1)",
      },
      {
        label: "Бензин",
        data: ChartFuel,
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };
  const legend = {
    display: true,
    position: "bottom",
    labels: {
      fontColor: "#323130",
      fontSize: 14,
    },
  };

  const options = {
    title: {
      display: true,
      text: "Расход бензина",
    },
    scales: {
      yAxes: [
        {
          ticks: {
            suggestedMin: 0,
            suggestedMax: 31,
          },
        },
      ],
    },
  };

  const saveReport = () => {
    

  }
  return (
    <>
      <Row>
        {/* <button onClick={()=> update()}>обновить </button> */}
        <Col  span={24}>
          <form onSubmit={handleSubmit}>
          <div className="Chart_Row">
            <div>
              Дата:
              <select className="select_value"
                onChange={(e) => {
                  drawChart();
                  setDate(e.target.value);
                }}
              >
                {timeArr.map((value, index) => {
                  return (
                    <option
                      key={index}
                      value={value}
                      // onChange={(value) => setvalueTwo(value.target.value)}
                    >
                      {value}{" "}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              Начальное время:
              <select className="select_value"
                onChange={(e) => {
                  setvalueOne(e.target.value);
                }}
              >
                {time.map((value, index) => {
                  return (
                    <option
                      key={index}
                      value={value}
                      // onChange={(value) => setvalueTwo(value.target.value)}
                    >
                      {value}{" "}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              Конечное время:
              <select className="select_value"
                onChange={(e) => {
                  setvalueTwo(e.target.value);
                }}
              >
                {time.map((value, index) => {
                  return (
                    <option
                      key={index}
                      value={value}
                      // onChange={(value) => setvalueTwo(value.target.value)}
                    >
                      {value}{" "}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <input
                className="btn_submit"
                type="submit"
                value="Построить график"
              />
            </div>
            </div>
          </form>
          <div>
            <a className="btn_submit" onClick={()=> saveReport()}>
                Сохранить отчет
            </a>
          </div>
          <FileReader></FileReader>
          </Col>
        <Col className="Chart_Col" span={24}>
          <Line
            data={data}
            legend={legend}
            options={(options, { maintainAspectRatio: false })}
          ></Line>

          {/* <canvas id="myChart" width="400" height="400"> </canvas> */}
        </Col>
      </Row>
    </>
  );
};
export default ChartFuel;
