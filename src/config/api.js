// Backend API base URL – change for production
export const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:9090";

export const AUTH = {
  login: `${API_BASE_URL}/auth/login`,
  register: `${API_BASE_URL}/auth/register`,
  forgotPassword: `${API_BASE_URL}/auth/forgot-password`,
  resetPassword: `${API_BASE_URL}/auth/reset-password`,
};

export function userProfileUrl(userId) {
  return `${API_BASE_URL}/users/${userId}`;
}

export function getAuthHeaders() {
  const token = localStorage.getItem("token");
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}
