export function getUser() {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error("Failed to parse user from localStorage:", error);
    return null;
  }
}

export function logout() {
  localStorage.removeItem("user");
}
