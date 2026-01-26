import "./WeatherCard.css";
import { weatherCards } from "../../utils/constants.js";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.js";

const DEFAULT_DAY = new URL("../../assets/day/clear_day.png", import.meta.url)
  .href;

const DEFAULT_NIGHT = new URL(
  "../../assets/night/clear_night.png",
  import.meta.url,
).href;

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const timeOfDay = weatherData.isDay ? "day" : "night";

  const imageUrl =
    weatherCards[timeOfDay]?.[weatherData.condition] ??
    (weatherData.isDay ? DEFAULT_DAY : DEFAULT_NIGHT);

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {weatherData.temp[currentTemperatureUnit]}&deg;{currentTemperatureUnit}
      </p>
      <img
        src={imageUrl}
        alt={weatherData.condition || "weather"}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
