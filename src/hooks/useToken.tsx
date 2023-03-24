export default function useToken() {
    const token = window.localStorage.getItem("token");
    if (!token) {
        return false;
    }
    const headers = {Authorization: `Bearer ${token}`}
    return {headers};
}