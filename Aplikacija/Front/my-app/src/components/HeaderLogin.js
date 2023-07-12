import React from 'react';
import IkonicaHome from './ikonicaHome';
import { useNavigate } from 'react-router-dom';
export default function HeaderLogin() {
  const navigate = useNavigate();
  return (
    <header
      style={{ display: 'flex', width: '100%' }}
      id="header"
      className="fixed-top d-flex align-items-center header-transparent"
    >
      <div className="container d-flex justify-content-between align-items-center">
        <div id="logo">
          <a href="index.html">
            <img src="assets/img/logo.png" alt="" />
          </a>
          <h1>
            <a href="/">FindProfessor</a>
          </h1>
        </div>

        <nav id="navbar" className="navbar">
          <ul>
            <li>
              <a className="nav-link scrollto" href="/">
                Home
                <IkonicaHome style={{ color: 'white' }} />
              </a>
            </li>
          </ul>
          <i className="bi bi-list mobile-nav-toggle"></i>
        </nav>
      </div>
    </header>
  );
}
