// Backend API base URL – change for production
export const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:9090";

export const AUTH = {
  login: `${API_BASE_URL}/auth/login`,
  register: `${API_BASE_URL}/auth/register`,
};
