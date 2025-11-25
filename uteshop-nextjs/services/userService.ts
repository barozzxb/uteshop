const API_BASE_URL = "http://localhost:9000/api/v1/user";

export const getUserInfo = async (email: string) => {
  try {
    const res = await fetch(`${API_BASE_URL}?email=${email}`);
    if (!res.ok) return null;
    const data = await res.json();
    return data;
  } catch {
    return null;
  }
};

export const updateUserInfo = async (user: any) => {
  try {
    const res = await fetch(`${API_BASE_URL}/update?email=${user.email}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    if (!res.ok) return { success: false };
    const data = await res.json();
    if (data.success) {
      localStorage.setItem("user", JSON.stringify(user));
      window.dispatchEvent(new Event("userUpdated"));
    }
    return data;
  } catch (error) {
    console.error(error);
    return { success: false };
  }
};
