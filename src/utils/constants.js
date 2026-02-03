const weatherCards = {
  day: {
    clear: new URL("../assets/day/clear_day.png", import.meta.url).href,
    clouds: new URL("../assets/day/cloudy_day.png", import.meta.url).href,
    rain: new URL("../assets/day/rainy_day.png", import.meta.url).href,
    thunderstorm: new URL("../assets/day/stormy_day.png", import.meta.url).href,
    snow: new URL("../assets/day/snowy_day.png", import.meta.url).href,
    fog: new URL("../assets/day/foggy_day.png", import.meta.url).href,
  },
  night: {
    clear: new URL("../assets/night/clear_night.png", import.meta.url).href,
    clouds: new URL("../assets/night/cloudy_night.png", import.meta.url).href,
    rain: new URL("../assets/night/rainy_night.png", import.meta.url).href,
    thunderstorm: new URL("../assets/night/stormy_night.png", import.meta.url)
      .href,
    snow: new URL("../assets/night/snowy_night.png", import.meta.url).href,
    fog: new URL("../assets/night/foggy_night.png", import.meta.url).href,
  },
};

const defaultCoordinates = {
  latitude: 29.4252,
  longitude: -98.4946,
};

const apiKey = "79e5bb92d6c46bf47536631f2633f89c";

export { weatherCards, defaultCoordinates, apiKey };
