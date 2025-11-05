/**
 * Map WMO weather code to a short, semantic text with emojis.
 */
export const getWeatherText = (weatherCode: number | null): string => {
  if (weatherCode == null) return "";
  const code = weatherCode;

  if (code === 0) return "☀️ Clear sky";
  if (code === 1) return "🌤️ Mainly clear";
  if (code === 2) return "⛅ Partly cloudy";
  if (code === 3) return "☁️ Overcast";
  if (code === 45 || code === 48) return "🌫️ Fog";
  if ([51, 53, 55].includes(code)) return "🌦️ Drizzle";
  if ([56, 57].includes(code)) return "🌧️ Freezing drizzle";
  if ([61, 63, 65].includes(code)) return "🌧️ Rain";
  if ([66, 67].includes(code)) return "🌨️ Freezing rain";
  if ([71, 73, 75].includes(code)) return "❄️ Snow";
  if (code === 77) return "🌨️ Snow grains";
  if ([80, 81, 82].includes(code)) return "🌦️ Rain showers";
  if ([85, 86].includes(code)) return "🌨️ Snow showers";
  if (code === 95) return "⛈️ Thunderstorm";
  if ([96, 99].includes(code)) return "🌩️ Thunderstorm with hail";

  return "🌍 Unknown weather condition";
};

/**
 * Map WMO code to animated effect overlays.
 * Returns a list like ["rain"], ["snow"], ["thunder"], etc.
 */
export const getWeatherEffects = (weatherCode: number | null): string[] => {
  if (weatherCode == null) return [];
  const code = weatherCode;

  const effects: string[] = [];
  if (code === 45 || code === 48) effects.push("fog");
  if ([51, 53, 55].includes(code)) effects.push("drizzle");
  if ([56, 57].includes(code)) effects.push("drizzle"); // freezing drizzle visually similar
  if ([61, 63, 65, 80, 81, 82].includes(code)) effects.push("rain");
  if ([66, 67].includes(code)) effects.push("rain"); // freezing rain visually rain-like
  if ([71, 73, 75, 77, 85, 86].includes(code)) effects.push("snow");
  if ([95, 96, 99].includes(code)) effects.push("thunder");

  return effects;
};

/**
 * Map weather code to a CSS theme class for animated backgrounds.
 */
export const getWeatherTheme = (weatherCode: number | null): string => {
  if (weatherCode == null) return "weather-clouds";
  const code = weatherCode;
  if (code === 0) return "weather-clear"; // Clear sky
  if (code === 1) return "weather-clear"; // Mainly clear
  if (code === 2) return "weather-clouds"; // Partly cloudy
  if (code === 3) return "weather-overcast"; // Overcast
  if (code === 45 || code === 48) return "weather-fog"; // Fog
  if ([51, 53, 55].includes(code)) return "weather-drizzle"; // Drizzle
  if ([56, 57].includes(code)) return "weather-freezing"; // Freezing drizzle
  if ([61, 63, 65].includes(code)) return "weather-rain"; // Rain
  if ([66, 67].includes(code)) return "weather-freezing"; // Freezing rain
  if ([71, 73, 75].includes(code)) return "weather-snow"; // Snow
  if (code === 77) return "weather-snow"; // Snow grains
  if ([80, 81, 82].includes(code)) return "weather-showers"; // Rain showers
  if ([85, 86].includes(code)) return "weather-snow"; // Snow showers
  if (code === 95) return "weather-thunder"; // Thunderstorm
  if ([96, 99].includes(code)) return "weather-thunder"; // Thunder + hail
  return "weather-clouds";
};

