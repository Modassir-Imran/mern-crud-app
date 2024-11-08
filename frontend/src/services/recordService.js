// src/services/recordService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/records';

const getAllRecords = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const getRecord = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

const createRecord = async (record) => {
  const response = await axios.post(API_URL, record);
  return response.data;
};

const updateRecord = async (id, record) => {
  const response = await axios.put(`${API_URL}/${id}`, record);
  return response.data;
};

const deleteRecord = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};

export default {
  getAllRecords,
  getRecord,
  createRecord,
  updateRecord,
  deleteRecord,
};
