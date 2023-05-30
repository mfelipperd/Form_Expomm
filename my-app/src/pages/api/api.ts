import axios from 'axios';
import { API_BASE_URL } from './baseUrl';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

export async function getPosts(){
  const response = await apiClient.get('user');
  return response.data;
}

export async function createPost(data: any) {
    console.log(data);
    const response = await apiClient.post('user', data );
    return response.data;
  }