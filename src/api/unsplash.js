import axios from 'axios';

const API_URL = 'https://api.unsplash.com';
const ACCESS_KEY = 'bYc7ydOCkwsd_3rzcIsQIASIQIowuu6NJEPRGJ3Hm0w'; // Ваш Access Key

// Створення axios-інстанса
const unsplashAPI = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Client-ID ${ACCESS_KEY}`,
  },
});

// Функція для отримання зображень
export const fetchImages = async (query, page = 1, perPage = 12) => {
  try {
    const response = await unsplashAPI.get('/search/photos', {
      params: { query, page, per_page: perPage },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
};

// Експорт для тестового запиту (опціонально)
export const testUnsplashRequest = async () => {
  try {
    const response = await unsplashAPI.get('/search/photos', {
      params: { query: 'cat', page: 1, per_page: 12 },
    });
    console.log('Test Response:', response.data);
  } catch (error) {
    console.error('Test Error:', error);
  }
};
