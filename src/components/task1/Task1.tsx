import React from 'react';
// import Search from '../../assets/icons/search.svg?react';
import { useState, useEffect, useContext } from 'react';
import { appContext } from '../app/App';
import styles from './Task1.module.scss';

// Please refer to task 1. Realtime search of readme.md
const Task1: React.FC = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchedTags, setSearchedTags] = useState([]);
  const { selectedTag, setSelectedTag } = useContext(appContext);

  useEffect(() => {
    fetch(`http://localhost:8000/api/tags?tag=${searchInput}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length === 0) {
          setSearchedTags(null);
        }
        setSearchedTags(data);
      });
  }, [searchInput]);

  function handleInput(event) {
    const inputValue = event.target.value;
    setSearchInput(inputValue);
  }

  function handleOnClick(tag) {
    setSelectedTag(tag);
    setSearchInput('');
  }

  console.log('selected Tag', selectedTag);
  console.log('searchedTags', searchedTags);
  return (
    <div className={styles.Task1}>
      {
        <div className={styles.searchBarWrapper}>
          {/* <div className={styles.searchIcon}>
            <Search />
          </div> */}
          <input
            className={styles.searchInput}
            type="text"
            name="search-bar-input"
            placeholder="Search"
            value={searchInput}
            onChange={handleInput}
          ></input>
          <ul className={styles.searchList}>
            {searchedTags.map((tag, index) => {
              return (
                <li key={index} onClick={() => handleOnClick(tag)}>
                  <h3>{tag}</h3>
                </li>
              );
            })}
          </ul>
        </div>
      }
    </div>
  );
};

export default Task1;
