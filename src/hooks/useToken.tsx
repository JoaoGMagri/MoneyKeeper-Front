export default function useToken() {
    const token = window.localStorage.getItem("token");
    if (!token) {
        return false;
    }
    return {Authorization: `Bearer ${token}`};
}