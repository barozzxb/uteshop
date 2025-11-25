"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Package, LogOut, User } from "lucide-react";

interface UserInfo {
  firstname?: string;
  lastname?: string;
  fullname?: string;   
  email: string;
  avatar?: string;
}

export default function UserPage() {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const loadUser = () => {
    const data = localStorage.getItem("user");
    if (data) {
      try {
        setUser(JSON.parse(data));
      } catch (e) {
        console.error("Parse user failed", e);
      }
    }
  };

  useEffect(() => {
    loadUser();

    window.addEventListener("userUpdated", loadUser);

    return () => {
      window.removeEventListener("userUpdated", loadUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const displayName = user?.fullname || 
                     (user?.firstname && user?.lastname 
                       ? `${user.firstname} ${user.lastname}` 
                       : user?.firstname || user?.email?.split("@")[0] || "Người dùng");

  const getInitial = () => {
    const name = user?.firstname || user?.lastname || user?.email?.[0] || "U";
    return name.charAt(0).toUpperCase();
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Đang tải thông tin người dùng...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/user/home" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-violet-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
              UTE
            </div>
            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">
              UTE Shop
            </span>
          </Link>

          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-3 px-5 py-3 rounded-2xl hover:bg-gray-100 transition-all group"
            >
              <div className="w-11 h-11 rounded-full ring-4 ring-blue-100 shadow-md overflow-hidden">
                {user.avatar ? (
                  <Image src={user.avatar} alt="avatar" width={44} height={44} className="object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 to-violet-500 text-white flex items-center justify-center font-bold text-lg">
                    {getInitial()}
                  </div>
                )}
              </div>
              <span className="font-semibold text-gray-800">{displayName}</span>
              <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${menuOpen ? "rotate-180" : ""}`} />
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl border overflow-hidden z-50">
                <div className="p-5 bg-gradient-to-r from-blue-600 to-violet-600 text-white">
                  <p className="font-bold text-lg">{displayName}</p>
                  <p className="text-sm opacity-90">{user.email}</p>
                </div>
                <div className="p-3 space-y-1">
                  <Link
                    href="/user/profile"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 rounded-xl transition"
                  >
                    <User className="w-5 h-5 text-gray-600" />
                    <span className="font-medium">Hồ sơ cá nhân</span>
                  </Link>
                  <Link
                    href="/user/orders"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 rounded-xl transition"
                  >
                    <Package className="w-5 h-5 text-gray-600" />
                    <span className="font-medium">Đơn hàng của tôi</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 text-red-600 rounded-xl transition text-left"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Đăng xuất</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-10 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Xin chào, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">{displayName}</span>!
          </h1>
          <p className="text-xl text-gray-600">Chào mừng bạn đến với khu vực người dùng</p>
        </div>
      </div>
    </div>
  );
}