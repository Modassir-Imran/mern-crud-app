import api from './axios';

export const getAllRecords = async () => {
  try {
    const response = await api.get('/records');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createRecord = async (record) => {
  try {
    const response = await api.post('/records', record);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateRecord = async (id, record) => {
  try {
    const response = await api.put(`/records/${id}`, record);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteRecord = async (id) => {
  try {
    const response = await api.delete(`/records/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}; 