"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useEffect, useRef } from "react";
import { ChevronDown, Package, LogOut, Edit3 } from "lucide-react";

interface UserInfo {
  firstname?: string;
  lastname?: string;
  email: string;
  avatar?: string;
}

export default function NavBar() {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const getInitial = () => {
    const name = user?.firstname || user?.lastname || user?.email?.[0] || "U";
    return name.charAt(0).toUpperCase();
  };

  const fullName = user
    ? `${user.firstname || ""} ${user.lastname || ""}`.trim() || user.email.split("@")[0]
    : "Tài khoản";

  useEffect(() => {
    const load = () => {
      const u = localStorage.getItem("user");
      if (u) setUser(JSON.parse(u));
    };
    load();
    window.addEventListener("userUpdated", load);
    document.addEventListener("mousedown", (e) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    });
    return () => window.removeEventListener("userUpdated", load);
  }, []);

  return (
    <nav className="bg-white border-b sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/user/home" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-violet-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
            UTE
          </div>
          <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">
            UTE Shop
          </span>
        </Link>

        <div className="relative" ref={ref}>
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-3 px-5 py-3 rounded-2xl hover:bg-gray-50 transition"
          >
            <div className="w-11 h-11 rounded-full ring-4 ring-blue-100 shadow-md overflow-hidden">
              {user?.avatar ? (
                <Image src={user.avatar} alt="" width={44} height={44} className="object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-violet-500 text-white flex items-center justify-center font-bold text-lg">
                  {getInitial()}
                </div>
              )}
            </div>
            <span className="font-semibold">{fullName}</span>
            <ChevronDown className={`w-5 transition ${open ? "rotate-180" : ""}`} />
          </button>

          {open && (
            <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl border">
              <div className="p-5 bg-gradient-to-r from-blue-600 to-violet-600 text-white">
                <p className="font-bold text-lg">{fullName}</p>
                <p className="text-sm opacity-90">{user?.email}</p>
              </div>
              <div className="p-3 space-y-1">
                <Link href="/user/profile" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 rounded-xl">
                  <Edit3 className="w-5 h-5" /> Chỉnh sửa hồ sơ
                </Link>
                <Link href="/user/orders" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 rounded-xl">
                  <Package className="w-5 h-5" /> Đơn hàng
                </Link>
                <button
                  onClick={() => {
                    localStorage.removeItem("user");
                    window.location.href = "/login";
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 text-red-600 rounded-xl text-left"
                >
                  <LogOut className="w-5 h-5" /> Đăng xuất
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
