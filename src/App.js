import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./App.css";
import moment from "moment";
import { MdLocationCity } from "react-icons/md";
import main from "./main.svg";

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false,
    },
  },
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function App() {
  const [chartData, setChartData] = useState({});

  const fetchWeather = async () => {
    const resp = await fetch(
      "https://api.openweathermap.org/data/2.5/onecall?lat=52.3676&lon=4.9041&cnt=8&units=metric&exclude=current,minutely,hourly&appid=c49d7fa41a70d804968610b1411abd4b"
    );
    const data = await resp.json();

    const labels = data.daily.map((s) =>
      moment(new Date(s.dt * 1000)).format("dddd")
    );

    setChartData({
      labels: labels,
      datasets: [
        {
          label: "Max. Temperature in °C",
          data: data.daily.map((s) => Math.round(s.temp.max)),
          backgroundColor: ["#91b2c7", "#8e8baf"],
        },
      ],
    });
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <div className="App">
      <span className="city">
        <MdLocationCity /> Amsterdam
      </span>
      <h1>Daily temperature check for your bike rides</h1>
      <div className="wrapper">
        <div className="img-wrapper">
          <img src={main} alt="Lady riding a bicycle" className="main" />
        </div>
        <div>
          {chartData.labels ? (
            <Bar data={chartData} options={options} />
          ) : (
            "Loading"
          )}
        </div>
      </div>
    </div>
  );
}
