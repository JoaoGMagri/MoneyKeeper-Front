import api from './api';

export async function signInService(email:string, password:string) {
    
    const response = await api.post('/session', { email, password });
    return response.data;
};

export async function signUpService(email: string, password: string, username: string) {
    const response = await api.post('/session/signUp', { email, password, username });
    return response.data;
};