import React from 'react';
import 'bootstrap/dist/js/bootstrap';

function Header({ signOut, user }) {

  return (
    <header className="navbar navbar-expand-md navbar-light bg-light fixed-top">
      <a className="navbar-brand ms-2" href="#">Weekly Planner</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="#" id="aboutWidget">About</a>
          </li>
        </ul>
        <div className="btn-group dropstart ms-auto me-2">
          <a className='dropdown-toggle' data-bs-toggle='dropdown' aria-expanded="false">
            <img src={user.avatar} alt="Avatar" className="rounded-circle" width="40" height="40" />
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
