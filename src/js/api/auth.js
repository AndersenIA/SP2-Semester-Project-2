const BASE_URL = "https://v2.api.noroff.dev"; // replace with your actual API base URL

export async function registerUser(userData) {
  try {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Registration failed");
    }

    const data = await res.json();
    return data.data; // this is the newly created user
  } catch (error) {
    console.error("Register error:", error);
    throw error;
  }
}

export async function loginUser({ email, password }) {
  try {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Login API error:", errorData);
      throw new Error(errorData.error || "Login failed");
    }

    const data = await res.json();
    return data.data; // user object including accessToken
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}
