import api from '../../lib/api';

export const getDomains = (options = {}) => api.get('/domains', options);
export const getDomain = (id, options = {}) => api.get(`/domain/${id}`, options);
export const createDomain = (data) => api.post('/domain-create', data);
export const updateDomain = (id, data) => api.put(`/domain-update/${id}`, data);
export const deleteDomain = (id) => api.delete(`/domain-delete/${id}`);
export const getUser = (options = {}) => api.get('/user', options);