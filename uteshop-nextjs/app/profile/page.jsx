"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { updateProfile } from "../../services/authService";

export default function ProfilePage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("user");

  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState("https://via.placeholder.com/150");

  const [msg, setMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (!token) {
      router.push("/login");
      return;
    }

    if (storedUser) {
      try {
        const u = JSON.parse(storedUser);
        setEmail(u.email || "");
        setName(u.name || "");
        setPhone(u.phone || "");
        setRole(u.role || "user");

        if (u.avatar) {
          setPreview(`${u.avatar}?t=${new Date().getTime()}`);
        }
      } catch (error) {
        console.error("Lỗi đọc dữ liệu user:", error);
      }
    }
  }, [router]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMsg("");

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("phone", phone);
      if (avatar) {
        formData.append("avatar", avatar);
      }

      const res = await updateProfile(formData);

      if (res.data && res.data.data) {
        const newUserInfo = res.data.data;

        localStorage.setItem("user", JSON.stringify(newUserInfo));

        setName(newUserInfo.name);
        setPhone(newUserInfo.phone);
        if (newUserInfo.avatar) {
          setPreview(`${newUserInfo.avatar}?t=${new Date().getTime()}`);
        }
      }

      setMsg("Cập nhật thành công!");
    } catch (err) {
      console.error(err);
      setMsg(err.response?.data?.message || "Lỗi cập nhật");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white flex items-center justify-center p-4">
      <div className="bg-zinc-800 p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">
          Hồ Sơ Của Tôi
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-32 h-32">
              <img
                src={preview}
                alt="Avatar"
                className="w-full h-full rounded-full object-cover border-4 border-zinc-700"
                onError={(e) => {
                  console.error("❌ ẢNH LỖI, KHÔNG LOAD ĐƯỢC LINK:", preview);
                  // Tạm thời comment dòng dưới để nó không hiện ảnh placeholder đè lên
                  // e.target.src = "https://via.placeholder.com/150";
                }}
              />
              <label className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full cursor-pointer hover:bg-blue-700 transition">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
                  />
                </svg>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleImageChange}
                  accept="image/*"
                />
              </label>
            </div>
            <p className="text-zinc-400 text-sm">
              Nhấn vào icon máy ảnh để thay đổi
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">
              Email
            </label>
            <input
              className="w-full bg-zinc-900 border border-zinc-700 rounded p-3 text-zinc-400 cursor-not-allowed"
              value={email}
              readOnly
              disabled
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">
              Vai trò
            </label>
            <div className="w-full bg-zinc-900 border border-zinc-700 rounded p-3 text-yellow-500 font-bold uppercase">
              {role}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">
              Họ tên
            </label>
            <input
              className="w-full bg-transparent border border-zinc-600 rounded p-3 text-white focus:border-blue-500 focus:outline-none"
              placeholder="Nhập họ tên"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">
              Số điện thoại
            </label>
            <input
              className="w-full bg-transparent border border-zinc-600 rounded p-3 text-white focus:border-blue-500 focus:outline-none"
              placeholder="Nhập số điện thoại"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <button
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded transition disabled:opacity-50"
          >
            {isLoading ? "Đang lưu..." : "Lưu thay đổi"}
          </button>

          {msg && (
            <div
              className={`p-3 rounded text-center ${
                msg.includes("Lỗi")
                  ? "bg-red-500/20 text-red-400"
                  : "bg-green-500/20 text-green-400"
              }`}
            >
              {msg}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
