const BASE_URL = "http://localhost:3001";

export const register = ({ name, avatar, email, password }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  }).then((response) => {
    if (!response.ok) {
      return Promise.reject(`Error: ${response.status}`);
    }
    return response.json();
  });
};

export const login = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => {
      if (!response.ok) {
        if (response.status === 401) {
          return Promise.reject("Incorrect email or password");
        }
        return Promise.reject(`Error: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Login error:", error);
      throw error;
    });
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    if (!response.ok) {
      return Promise.reject(`Error: ${response.status}`);
    }
    return response.json();
  });
};
