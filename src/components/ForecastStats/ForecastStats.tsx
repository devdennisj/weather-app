import styles from './forecast.module.css';

export interface ForecastStatsProps {
  day: string;
  min: number;
  max: number;
  average: number;
  median: number;
}

function ForecastStats({ day, min, max, average, median }: ForecastStatsProps) {
  return (
    <div>
      <h6 className={styles.day}>{day}</h6>
      <ul>
        <li className={`${styles.stat} row color-secondary`}>
          <span className={styles.label}>Min.</span>
          <span>{min}</span>
        </li>
        <li className={`${styles.stat} row`}>
          <span className={styles.label}>Max.</span>
          <span>{max}</span>
        </li>
        <li className={`${styles.stat} row`}>
          <span className={styles.label}>Average</span>
          <span>{average}</span>
        </li>
        <li className={`${styles.stat} row`}>
          <span className={styles.label}>Median</span>
          <span>{median}</span>
        </li>
      </ul>
    </div>
  );
}

export default ForecastStats;
