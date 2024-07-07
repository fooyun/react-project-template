import { useEffect, useState } from 'react';
import { getTime } from '@/util/time';
import { fetchGoods } from '@/services/goods';
import style from './App.css';

export default function App() {
  const [time] = useState(getTime());
  const [goods, setGoods] = useState([]);

  const getGoods = () => {
    fetchGoods().then((response) => {
      response.json().then((result) => {
        setGoods(result?.data?.goods || []);
      });
    });
  };

  useEffect(() => {
    getGoods();
  }, []);

  return (
    <div>
      <h1 className={style.green}>Hello World!</h1>
      <div>
        goods num: <strong>{goods.length}</strong>
      </div>
      <div>{time}</div>
    </div>
  );
}
