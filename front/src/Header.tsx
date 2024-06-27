import React from 'react';
import 'bootstrap/dist/js/bootstrap';

function Header({ signOut, user, changeWeek }) {

  return (
    <header className="navbar navbar-expand-md navbar-light bg-light">
      <a className="navbar-brand ms-2" href="#">Week Planner</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="btn btn-light" href="#" id="aboutWidget">
              About
            </a>
          </li>
          <li className="nav-item">
            <a className="btn btn-light" href="https://docs.google.com/forms/d/e/1FAIpQLSe_VOaZU7HzO7Natn2TNHtQMJkJcW8MixDdI8dmdSy9n2OJNA/viewform?usp=sf_link"
              id="feedbackWidget">
              Feedback
            </a>
          </li>
          <li className="nav-item">
            <button className='btn btn-light' onClick={() => changeWeek("backward")}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
              </svg>
            </button>
          </li>
          <li className="nav-item">
            <button className='btn btn-light ms-1' onClick={() => changeWeek("forward")}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708" />
              </svg>
            </button>
          </li>
        </ul>
        <div className="btn-group dropstart ms-auto me-2">
          <a className='dropdown-toggle' data-bs-toggle='dropdown' aria-expanded="false">
            <img src={user.avatar} crossOrigin='anonymous' alt="Avatar" className="rounded-circle" width="40" height="40" />
          </a>
          <ul className="dropdown-menu" aria-labelledby="userWidget">
            <li><a className="dropdown-item" href="#">Settings</a></li>
            <button className="dropdown-item"
              id="google-connect-btn"
              type='button'
              onClick={signOut}>
              Switch Account
            </button>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
