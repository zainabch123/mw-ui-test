import React from 'react';
import { useContext, useEffect, useState } from 'react';
import { appContext } from '../app/App';
import styles from './Task2.module.scss';

// Please refer to task 2. Realtime search results of readme.md
const Task2: React.FC = () => {
  const { selectedTag } = useContext(appContext);
  const [carData, setCarData] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8000/api/cars?tag=${selectedTag}`)
      .then((res) => res.json())
      .then((data) => setCarData(data));
  }, [selectedTag]);

  console.log('car Data', carData);
  return (
    <div className={styles.Task2}>
      {
        <ul className={styles.carList}>
          {carData.map((car, index) => {
            return (
              <li className={styles.car} key={index}>
                <img src={`${car.url}.jpg`} alt="Car" />
                {/* <div>{car.description}</div> */}
              </li>
            );
          })}
        </ul>
      }
    </div>
  );
};

export default Task2;
