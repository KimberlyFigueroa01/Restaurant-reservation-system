import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './Navbar.module.css';

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.brand}>
        🍽 ReservaFácil
      </Link>
      <ul className={styles.links}>
        <li><Link to="/restaurants">Restaurants</Link></li>
        {user ? (
          <>
            <li><Link to="/reservations">My Reservations</Link></li>
            <li><Link to="/reservations/new">Book a Table</Link></li>
            <li>
              <button onClick={logout} className={styles.logoutBtn}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
