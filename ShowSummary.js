import React from 'react';

const ShowSummary = ({ show }) => {
  return (
    <div>
      <h1>{show.name}</h1>
      <p>{show.summary}</p>
    </div>
  );
};

export default ShowSummary;
