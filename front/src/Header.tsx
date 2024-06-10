import React from 'react';
import {handleAuthClick, handleSignoutClick} from './calendar/GCalActions';

function Header() {

  return (
    <header className="navbar navbar-expand-md navbar-light bg-light fixed-top">
        <a className="navbar-brand" href="#">Weekly Planner</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="#" id="aboutWidget">About</a>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <button id="google-connect-btn"
                className="btn btn-primary"
                type='button'
                onClick={handleAuthClick}>
                Link to Google
              </button>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="userWidget" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <img src="avatar_placeholder.png" alt="Avatar" className="rounded-circle" width="30" height="30" />
              </a>
              <div className="dropdown-menu dropdown-menu-right" aria-labelledby="userWidget">
                <a className="dropdown-item" href="#">Profile</a>
                <a className="dropdown-item" href="#">Settings</a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">Logout</a>
              </div>
            </li>
          </ul>
        </div>
    </header>
  );
};

export default Header;
