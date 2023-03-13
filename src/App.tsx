import { useEffect, useState } from 'react';

import weatherClient, { city } from './utils/weather_client';

import Card from './components/Card/Card';
import { ForecastStatsProps } from './components/ForecastStats/ForecastStats';
import ForecastStats from './components/ForecastStats';
import { ForecastDataPoint } from './data/Forecast';
import { formatDate } from './utils/date';

import styles from './app.module.css';
import './theme.css';

type DayTemperatures = Map<string, number[]>;

const config = {
  days: 4,
};

const extractTemperatures = (data: ForecastDataPoint[]) => {
  const days: DayTemperatures = new Map();

  data.map((dataPoint) => {
    const dateText = formatDate(dataPoint.dt_txt);
    const mainTemperature = dataPoint.main.temp;
    const storedDate = days.get(dateText);

    if (!storedDate) {
      days.set(dateText, [mainTemperature]);
    } else {
      days.set(dateText, [...storedDate, mainTemperature]);
    }
  });

  return days;
};

const formatDegree = (degree: number) =>
  Number(parseFloat(degree.toString()).toFixed(1));

const calculateStatistics = (dayTemperatures: DayTemperatures) => {
  const entries = dayTemperatures.entries();
  const days: ForecastStatsProps[] = [];

  for (let index = 0; index < config.days; index += 1) {
    const entry = entries.next().value;
    const value = entry[1].sort();
    const numberOfDataPoints = value.length;

    const median = () => {
      const middleValue = Math.floor(value.length / 2);

      return value.length % 2 !== 0
        ? value[middleValue]
        : (value[middleValue - 1] + value[middleValue]) / 2;
    };

    const average =
      value.reduce((acc: number, val: number) => acc + val) /
      numberOfDataPoints;

    const statistics = {
      min: formatDegree(value[0]),
      max: formatDegree(value[numberOfDataPoints - 1]),
      average: formatDegree(average),
      median: formatDegree(median()),
    };

    days.push({
      day: entry[0],
      ...statistics,
    });
  }

  return days;
};

function App() {
  const [weatherData, setWeatherData] = useState<ForecastStatsProps[]>([]);

  const getData = async () => {
    const { status, data } = await weatherClient.get(
      city({ city: 'Göteborg' })
    );

    if (status === 200) {
      const statistics = calculateStatistics(extractTemperatures(data.list));

      setWeatherData(statistics);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={`bg-secondary ${styles.root}`}>
      <main className={styles.main}>
        <header className={styles.header}>
          <h1 className='color-primary'>Weather App</h1>
        </header>
        <Card>
          <div className={`${styles.forecast}`}>
            {weatherData.map((stats) => (
              <ForecastStats
                day={stats.day}
                min={stats.min}
                max={stats.max}
                average={stats.average}
                median={stats.median}
              />
            ))}
          </div>
        </Card>
      </main>
    </div>
  );
}

export default App;
