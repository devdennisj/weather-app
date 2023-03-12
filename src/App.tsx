import weatherClient, { hourly } from './utils/weather_client';

import Card from './components/Card/Card';

import styles from './app.module.css';
import './theme.css';
import ForecastStats from './components/ForecastStats';

const getData = async () => {
  const data = await weatherClient.get(hourly({ lon: 0, lat: 0 }));

  return data;
};

function App() {
  return (
    <div className={`bg-secondary ${styles.root}`}>
      <main className={styles.main}>
        <header className={styles.header}>
          <h1 className='color-primary'>Weather App</h1>
        </header>
        <Card>
          <div className={`${styles.forecast}`}>
            <ForecastStats
              day='Sunday'
              min={25}
              max={30}
              average={27}
              median={26}
            />
            <ForecastStats
              day='Sunday'
              min={25}
              max={30}
              average={27}
              median={26}
            />
            <ForecastStats
              day='Sunday'
              min={25}
              max={30}
              average={27}
              median={26}
            />
            <ForecastStats
              day='Sunday'
              min={25}
              max={30}
              average={27}
              median={26}
            />
          </div>
        </Card>
      </main>
    </div>
  );
}

export default App;
