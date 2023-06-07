import React, { useState, useEffect } from 'react';

const ShowList = ({ onShowSelected }) => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    fetch('https://api.tvmaze.com/search/shows?q=all')
      .then(response => response.json())
      .then(data => {
        setShows(data.map(result => result.show));
      })
      .catch(error => {
        console.log('Error fetching show data:', error);
      });
  }, []);

  return (
    <div>
      <h1>TV Shows</h1>
      <ul>
        {shows.map(show => (
          <li key={show.id}>
            <h3>{show.name}</h3>
            <p>{show.summary}</p>
            <button onClick={() => onShowSelected(show)}>Summary</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowList;
