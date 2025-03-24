export const getToken = () => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    return token;
  }
  return null;
};

const API_BASEURL = process.env.API_BASEURL || "http://localhost:5003/api/v1";
export const apiPath = (url: string) => {
    return `${API_BASEURL}${url}`;
}
