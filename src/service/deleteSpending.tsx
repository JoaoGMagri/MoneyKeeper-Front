import api from './api';

export async function deleteSpendingService(data:any, token: any) {
    const response = await api.delete(`/spending/${data.id}`, token);
    return response.data;
};