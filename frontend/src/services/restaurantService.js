import api from './api';

export const getRestaurants = () => api.get('/restaurants').then((r) => r.data);
export const getRestaurant = (id) => api.get(`/restaurants/${id}`).then((r) => r.data);
