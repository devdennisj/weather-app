import { ReactNode } from 'react';
import styles from './card.module.css';

interface CardProps {
  children: ReactNode;
}

function Card({ children }: CardProps) {
  return (
    <div className={`${styles.card} elevation bg-primary`}>{children}</div>
  );
}

export default Card;
