import axios from "axios";

export const login = async (email: string, password: string) => {
  try {
    const res = await axios.post("http://localhost:5000/api/auth/login", {
      email,
      password,
    });

    return {
      status: 200,
      message: "Đăng nhập thành công",
      body: res.data.user,
      token: res.data.token,
    };
  } catch (err: any) {
    return {
      status: err.response?.status || 500,
      message: err.response?.data?.message || "Lỗi máy chủ",
    };
  }
};

export const logout = async () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  localStorage.removeItem("email");
  localStorage.removeItem("role");
  window.dispatchEvent(new Event("userUpdated"));
  return "Đăng xuất thành công";
};
