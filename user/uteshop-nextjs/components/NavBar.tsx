"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import {
  ChevronDown,
  Package,
  LogOut,
  Edit3,
  ShoppingCart,
  Grid,
} from "lucide-react";

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
    ? `${user.firstname || ""} ${user.lastname || ""}`.trim() ||
      user.email.split("@")[0]
    : "Tài khoản";

  useEffect(() => {
    const load = () => {
      const u = localStorage.getItem("user");
      if (u) setUser(JSON.parse(u));
    };
    load();

    window.addEventListener("userUpdated", load);

    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("userUpdated", load);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
         <Link href="/user/home" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-violet-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
            UTE
          </div>
          <span className="text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-violet-600">
            UTE Shop
          </span>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-2">
          <NavItem href="/products" icon={<Grid />} label="Sản phẩm" />

          {user && (
            <>
              <NavItem
                href="/user/cart"
                icon={<ShoppingCart />}
                label="Giỏ hàng"
              />
              <NavItem
                href="/user/order"
                icon={<Package />}
                label="Đơn hàng"
              />
            </>
          )}

          {/* User dropdown */}
          <div className="relative ml-2" ref={ref}>
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-3 pl-2 pr-3 py-2 rounded-full hover:bg-gray-100 transition"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-blue-200 shadow-sm">
                {user?.avatar ? (
                  <Image
                    src={user.avatar}
                    alt=""
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 to-violet-500 text-white flex items-center justify-center font-bold">
                    {getInitial()}
                  </div>
                )}
              </div>

              <span className="hidden sm:block font-semibold text-gray-700">
                {fullName}
              </span>
              <ChevronDown
                className={`w-4 h-4 text-gray-500 transition ${
                  open ? "rotate-180" : ""
                }`}
              />
            </button>

            {open && (
              <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl border overflow-hidden animate-fade-in">
                <div className="px-5 py-4 bg-gradient-to-r from-blue-600 to-violet-600 text-white">
                  <p className="font-bold text-lg">{fullName}</p>
                  <p className="text-sm opacity-90">{user?.email}</p>
                </div>

                <div className="p-2">
                  <DropdownItem
                    href="/user/profile"
                    icon={<Edit3 />}
                    label="Chỉnh sửa hồ sơ"
                  />

                  <button
                    onClick={() => {
                      localStorage.clear();
                      window.location.href = "/login";
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition text-left"
                  >
                    <LogOut className="w-5 h-5" />
                    Đăng xuất
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

/* ===== UI helper components ===== */

function NavItem({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 px-4 py-2 rounded-xl text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition font-medium"
    >
      <span className="w-5 h-5">{icon}</span>
      {label}
    </Link>
  );
}

function DropdownItem({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 transition"
    >
      <span className="w-5 h-5 text-gray-600">{icon}</span>
      <span className="font-medium text-gray-700">{label}</span>
    </Link>
  );
}
