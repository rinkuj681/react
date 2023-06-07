import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import axios from 'axios';



const ShowList = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    axios
      .get('https://api.tvmaze.com/search/shows?q=all')
      .then(response => {
        setShows(response.data);
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
          <li key={show.show.id}>
            <h3>{show.show.name}</h3>
            <p>{show.show.summary}</p>
            <Link to={`/summary/${show.show.id}`}>
              <button>Summary</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const ShowSummary = ({ match }) => {
  const [show, setShow] = useState(null);

  useEffect(() => {
    const showId = match.params.id;
    axios
      .get(`https://api.tvmaze.com/shows/${showId}`)
      .then(response => {
        setShow(response.data);
      })
      .catch(error => {
        console.log('Error fetching show summary:', error);
      });
  }, [match.params.id]);

  return (
    <div>
      {show ? (
        <div>
          <h1>{show.name}</h1>
          <p>{show.summary}</p>
          <Link to={`/booking/${show.id}`}>
            <button>Book Ticket</button>
          </Link>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

const BookingForm = ({ match }) => {
  const [movieName, setMovieName] = useState('');
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    const showId = match.params.id;
    axios
      .get(`https://api.tvmaze.com/shows/${showId}`)
      .then(response => {
        setMovieName(response.data.name);
      })
      .catch(error => {
        console.log('Error fetching show name:', error);
      });
  }, [match.params.id]);

  const handleInputChange = event => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    // Perform the necessary action with user data (e.g., save to local/session storage)
    console.log('User Data:', userData);
  };

  return (
    <div>
      <h1>Booking Form</h1>
      <p>Movie: {movieName}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={userData.phone}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ShowList} />
        <Route path="/summary/:id" component={ShowSummary} />
        <Route path="/booking/:id" component={BookingForm} />
      </Switch>
    </Router>
  );
};

export default App;

