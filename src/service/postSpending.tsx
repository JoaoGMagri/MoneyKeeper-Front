import api from './api';

export async function postSpendingService(body:any, token: any) {
    const response = await api.post('/spending', body, token);
    return response.data;
};