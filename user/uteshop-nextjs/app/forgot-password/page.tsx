"use client";
import React, { useState } from "react";
import { forgotPassword } from "../../services/authService";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await forgotPassword(email);
      setMsg(res.data.message);
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const error = err as any;

      if (error.isAxiosError) {
        setMsg(error.response?.data?.message || "Update failed!");
      } else {
        setMsg("Unexpected error");
      }
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Forgot Password</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="border p-2 w-full mb-3"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="bg-blue-500 text-white p-2 rounded w-full">
          Send Reset Link
        </button>
      </form>
      {msg && <p className="mt-3 text-center">{msg}</p>}
    </div>
  );
}
