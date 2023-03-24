import api from './api';

export async function putSpendingService(data:any, token: any) {
    const response = await api.put(`/spending/${data.id}`, {name: data.name, type: data.type, value: data.value}, token);
    return response.data;
};