import api from './api';

export const getReservations = () => api.get('/reservations').then((r) => r.data);
export const getReservation = (id) => api.get(`/reservations/${id}`).then((r) => r.data);
export const createReservation = (data) => api.post('/reservations', data).then((r) => r.data);
export const updateReservation = (id, data) =>
  api.put(`/reservations/${id}`, data).then((r) => r.data);
export const deleteReservation = (id) => api.delete(`/reservations/${id}`);
