"use client";

import { Shield } from "lucide-react";

export default function AdminDashboard() {
  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        body { font-family: 'Inter', sans-serif; }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center p-6">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-amber-400 rounded-xl flex items-center justify-center text-white shadow-lg">
              <Shield className="w-9 h-9" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800">
            Đây là trang chủ của Admin
          </h1>
          <p className="mt-2 text-sm text-orange-600 font-medium">
            UTE Shop – Quản trị hệ thống
          </p>
        </div>
      </div>
    </>
  );
}