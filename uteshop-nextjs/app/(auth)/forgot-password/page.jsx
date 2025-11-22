"use client";

import { useState } from "react";
import Link from "next/link";
import { requestForgotPassword } from "@/services/authService";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({
    loading: false,
    error: "",
    success: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: "", success: "" });

    try {
      await requestForgotPassword(email);
      setStatus({
        loading: false,
        error: "",
        success: "Đã gửi! Vui lòng kiểm tra email của bạn.",
      });
    } catch (error) {
      const msg = error.response?.data?.message || "Có lỗi xảy ra.";
      setStatus({ loading: false, error: msg, success: "" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Quên Mật Khẩu
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Nhập email đã đăng ký để nhận liên kết đặt lại mật khẩu.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="admin@uteshop.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Hiển thị thông báo lỗi hoặc thành công */}
          {status.error && (
            <div className="text-red-600 text-sm text-center">
              {status.error}
            </div>
          )}
          {status.success && (
            <div className="text-green-600 text-sm text-center">
              {status.success}
            </div>
          )}

          <button
            type="submit"
            disabled={status.loading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
              ${
                status.loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
              }`}
          >
            {status.loading ? "Đang gửi..." : "Gửi yêu cầu"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            href="/login"
            className="text-sm text-blue-600 hover:text-blue-500"
          >
            Quay lại Đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
}
