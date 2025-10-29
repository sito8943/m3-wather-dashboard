/**
 *
 * @param weatherCode weather code to parse
 * @returns semantic text of given weather code with emojis
 */
export const getWeatherText = (weatherCode: number | null): string => {
  if (weatherCode == null) return "";
  const code = weatherCode;

  // Basic WMO weather code mapping (EN + emojis)
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