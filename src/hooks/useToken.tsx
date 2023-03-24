export default function useToken() {
    const token = window.localStorage.getItem("token");

    return token;
}