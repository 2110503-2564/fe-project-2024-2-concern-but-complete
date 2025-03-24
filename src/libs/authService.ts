import { API_BASEURL, apiPath, getToken } from "./shared";

export const loginUser = async (email: string, password: string) => {
  const jsonBody = JSON.stringify({ email, password });
  return await fetch(apiPath("/auth/login"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: jsonBody,
  })
    .then((response) => {
      return response.ok ? response.json() : Promise.reject(response);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export const getCurrentUser = async () => {
  const token = getToken();
  return await fetch(apiPath("/auth/me"), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.ok ? response.json() : Promise.reject(response);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export interface RegisterForm {
  email: string;
  password: string;
  name: string;
  tel: string;
}

export const registerUser = async (data: RegisterForm | undefined) => {
  const res = await fetch(apiPath("/auth/register"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...data, role: "user" }),
  });
  const json = await res.json();
  if (res.status === 201 || (json && json.success === false)) {
    return json;
  }
  return null;
};
