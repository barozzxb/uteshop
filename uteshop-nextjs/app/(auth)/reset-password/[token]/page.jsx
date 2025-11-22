"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import { resetPassword } from "@/services/authService";

export default function ResetPasswordPage({ params }) {
  const { token } = use(params);
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState({ loading: false, error: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: "" });

    if (password !== confirmPassword) {
      setStatus({ loading: false, error: "Mật khẩu nhập lại không khớp!" });
      return;
    }
    if (password.length < 6) {
      setStatus({ loading: false, error: "Mật khẩu phải có ít nhất 6 ký tự." });
      return;
    }

    try {
      await resetPassword(token, password);
      alert("Thành công! Mật khẩu của bạn đã được cập nhật.");
      router.push("/login");
    } catch (error) {
      const msg =
        error.response?.data?.message || "Link hết hạn hoặc lỗi hệ thống.";
      setStatus({ loading: false, error: msg });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Đặt Lại Mật Khẩu
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mật khẩu mới
            </label>
            <input
              type="password"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nhập lại mật khẩu
            </label>
            <input
              type="password"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {status.error && (
            <div className="text-red-600 text-sm text-center">
              {status.error}
            </div>
          )}

          <button
            type="submit"
            disabled={status.loading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
              ${
                status.loading
                  ? "bg-gray-400"
                  : "bg-green-600 hover:bg-green-700"
              }`}
          >
            {status.loading ? "Đang xử lý..." : "Xác nhận"}
          </button>
        </form>
      </div>
    </div>
  );
}
