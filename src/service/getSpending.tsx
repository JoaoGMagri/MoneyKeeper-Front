import api from './api';

export async function getSpendingService(token: any) {
    const response = await api.get('/spending', token);
    return response.data;
};