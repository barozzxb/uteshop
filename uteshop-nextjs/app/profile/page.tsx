"use client";
import React, { useState } from "react";
import { updateProfile } from "../../services/authService";

export default function ProfilePage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateProfile({ email, name, phone });
      setMsg(res.data.message);
    } catch (err) {
      // Trong JS thuần, 'err' tự động là object, không cần ép kiểu
      if (err.isAxiosError) {
        setMsg(err.response?.data?.message || "Update failed!");
      } else {
        setMsg("Unexpected error");
      }
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Update Profile</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="border p-2 w-full mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border p-2 w-full mb-3"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="border p-2 w-full mb-3"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button className="bg-green-500 text-white p-2 rounded w-full">
          Update
        </button>
      </form>
      {msg && <p className="mt-3 text-center">{msg}</p>}
    </div>
  );
}
