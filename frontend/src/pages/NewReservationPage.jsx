import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRestaurants } from '../services/restaurantService';
import { createReservation } from '../services/reservationService';
import styles from './AuthForm.module.css';

function NewReservationPage() {
  const [restaurants, setRestaurants] = useState([]);
  const [form, setForm] = useState({
    restaurantId: '',
    reservationDate: '',
    reservationTime: '',
    partySize: 2,
    notes: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getRestaurants().then(setRestaurants).catch(() => {});
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await createReservation({
        ...form,
        restaurantId: Number(form.restaurantId),
        partySize: Number(form.partySize),
      });
      navigate('/reservations');
    } catch (err) {
      const msgs = err.response?.data?.errors?.map((e) => e.msg).join(', ');
      setError(msgs || err.response?.data?.message || 'Failed to create reservation.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit} style={{ maxWidth: 480 }}>
        <h2>Book a Table</h2>
        {error && <p className={styles.error}>{error}</p>}

        <label>
          Restaurant
          <select name="restaurantId" value={form.restaurantId} onChange={handleChange} required>
            <option value="">Select a restaurant</option>
            {restaurants.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Date
          <input
            type="date"
            name="reservationDate"
            value={form.reservationDate}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
            required
          />
        </label>

        <label>
          Time
          <input
            type="time"
            name="reservationTime"
            value={form.reservationTime}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Party size
          <input
            type="number"
            name="partySize"
            value={form.partySize}
            onChange={handleChange}
            min={1}
            max={50}
            required
          />
        </label>

        <label>
          Notes (optional)
          <input
            type="text"
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="Allergies, special requests…"
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? 'Booking…' : 'Book Table'}
        </button>
      </form>
    </div>
  );
}

export default NewReservationPage;
