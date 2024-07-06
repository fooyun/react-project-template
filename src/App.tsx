import { useState } from 'react';
import { getTime } from '@/util/time';
import style from './App.css';

export default function App() {
  const [time] = useState(getTime());

  return (
    <div>
      <h1 className={style.green}>Hello World!</h1>
      <h3>{time}</h3>
    </div>
  );
}
