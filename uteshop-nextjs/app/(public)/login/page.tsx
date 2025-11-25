"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { login } from "@/services/authService";
import { Mail, Lock, Loader2, ShoppingBag } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await login(email, password);
    setLoading(false);

    if (res.status !== 200) {
      setMsg(res.message);
      return;
    }

    // Lưu token + thông tin user
    localStorage.setItem("token", res.token);
    localStorage.setItem("user", JSON.stringify(res.body));

    if (res.body.role === "admin") router.push("/admin");
    else router.push("/user/home");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-gradient-to-br from-white to-orange-50/50 rounded-2xl shadow-lg p-8 border border-orange-100">

          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-amber-400 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-sm">
                U
              </div>
              <span className="text-2xl font-bold text-gray-800">UTE Shop</span>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-2">
            Đăng nhập
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-orange-400" />
              <input
                type="email"
                placeholder="Email"
                className="w-full pl-11 pr-4 py-3 bg-white/70 border border-orange-200 rounded-xl"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-orange-400" />
              <input
                type="password"
                placeholder="Mật khẩu"
                className="w-full pl-11 pr-4 py-3 bg-white/70 border border-orange-200 rounded-xl"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-400 to-amber-400 text-white py-3.5 rounded-xl flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Đang đăng nhập...</span>
                </>
              ) : (
                <>
                  <span>Đăng Nhập</span>
                  <ShoppingBag className="h-5 w-5" />
                </>
              )}
            </button>
          </form>

          {msg && (
            <div className="mt-5 p-3 rounded-lg text-center bg-rose-50 text-rose-700 border border-rose-200">
              {msg}
            </div>
          )}

          <div className="mt-8 text-center text-sm text-gray-700">
            Chưa có tài khoản?{" "}
            <Link href="/register" className="text-orange-600 font-semibold">
              Đăng ký
            </Link>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-orange-600/80">
          © 2025 UTE Shop.
        </p>
      </div>
    </div>
  );
}
