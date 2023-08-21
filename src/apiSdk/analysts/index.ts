import axios from 'axios';
import queryString from 'query-string';
import { AnalystInterface, AnalystGetQueryInterface } from 'interfaces/analyst';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getAnalysts = async (query?: AnalystGetQueryInterface): Promise<PaginatedInterface<AnalystInterface>> => {
  const response = await axios.get('/api/analysts', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createAnalyst = async (analyst: AnalystInterface) => {
  const response = await axios.post('/api/analysts', analyst);
  return response.data;
};

export const updateAnalystById = async (id: string, analyst: AnalystInterface) => {
  const response = await axios.put(`/api/analysts/${id}`, analyst);
  return response.data;
};

export const getAnalystById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/analysts/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteAnalystById = async (id: string) => {
  const response = await axios.delete(`/api/analysts/${id}`);
  return response.data;
};
