export interface User {
  email: string;
  password: string;
  role: "admin" | "user";
}

const mockUsers: User[] = [
  { email: "admin@uteshop.com", password: "123456", role: "admin" },
  { email: "user@uteshop.com", password: "123456", role: "user" },
];

export const login = async (email: string, password: string) => {
  return new Promise<{ status: number; message: string; body?: User }>(
    (resolve) => {
      setTimeout(() => {
        const user = mockUsers.find(
          (u) => u.email === email && u.password === password
        );
        if (!user) {
          resolve({ status: 401, message: "Email hoặc mật khẩu không đúng" });
        } else {
          resolve({ status: 200, message: "Đăng nhập thành công", body: user });
        }
      }, 500);
    }
  );
};
