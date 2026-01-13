import "./WeatherCard.css";
import sunnyDay from "../../assets/sunny_day.png";
function WeatherCard({ weatherData }) {
  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {Math.round(weatherData.temp.F)}&deg;F
      </p>
      <img src={sunnyDay} alt="sunny" className="weather-card__image" />
    </section>
  );
}
export default WeatherCard;
