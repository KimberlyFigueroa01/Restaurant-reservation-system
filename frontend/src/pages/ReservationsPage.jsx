import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getReservations, deleteReservation } from '../services/reservationService';
import styles from './ReservationsPage.module.css';

function ReservationsPage() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = () => {
    setLoading(true);
    getReservations()
      .then(setReservations)
      .catch(() => setError('Failed to load reservations.'))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleCancel = async (id) => {
    if (!window.confirm('Cancel this reservation?')) return;
    try {
      await deleteReservation(id);
      setReservations((prev) => prev.filter((r) => r.id !== id));
    } catch {
      alert('Failed to cancel reservation.');
    }
  };

  if (loading) return <p className={styles.message}>Loading…</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>My Reservations</h1>
        <Link to="/reservations/new" className={styles.btnPrimary}>
          + New Reservation
        </Link>
      </div>
      {reservations.length === 0 ? (
        <p>You have no reservations yet.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Restaurant</th>
              <th>Date</th>
              <th>Time</th>
              <th>Party</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((r) => (
              <tr key={r.id}>
                <td>{r.restaurant_name}</td>
                <td>{r.reservation_date}</td>
                <td>{r.reservation_time}</td>
                <td>{r.party_size}</td>
                <td>
                  <span className={`${styles.badge} ${styles[r.status]}`}>{r.status}</span>
                </td>
                <td>
                  {r.status !== 'cancelled' && (
                    <button
                      className={styles.cancelBtn}
                      onClick={() => handleCancel(r.id)}
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ReservationsPage;
