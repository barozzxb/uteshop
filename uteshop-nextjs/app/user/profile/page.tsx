"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Camera, ArrowLeft, Check, Edit3 } from "lucide-react";

interface UserInfo {
  firstname?: string;
  lastname?: string;
  fullName?: string;
  email: string;
  phone?: string;
  avatar?: string | null;
}

export default function EditProfilePage() {
  const router = useRouter();
  const [form, setForm] = useState<UserInfo | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Load user từ localStorage khi vào trang
  useEffect(() => {
    const data = localStorage.getItem("user");
    if (data) {
      try {
        const user = JSON.parse(data);
        setForm(user);
        // Nếu đã từng lưu thành công → vào chế độ "đã lưu"
        setIsSaved(true);
      } catch {
        router.push("/login");
      }
    } else {
      router.push("/login");
    }
  }, [router]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setForm((prev) => (prev ? { ...prev, avatar: reader.result as string } : null));
      };
      reader.readAsDataURL(file);
    }
  };

  // GỌI API BACKEND ĐỂ LƯU THẬT VÀO MySQL
  const handleSave = async () => {
    if (!form) return;
    setIsSaving(true);

    const fullName = `${form.lastname || ""} ${form.firstname || ""}`.trim() || form.fullName || "";

    try {
      const response = await fetch("http://localhost:5000/api/update-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          fullName,
          phone: form.phone || "",
          avatar: form.avatar || null,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Cập nhật localStorage để các trang khác nhận biết ngay
        localStorage.setItem("user", JSON.stringify(data.user));
        window.dispatchEvent(new Event("userUpdated"));

        setIsSaved(true);
        setIsEditing(false);
      } else {
        alert(data.message || "Cập nhật thất bại");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Lỗi kết nối đến server");
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setIsSaved(false);
  };

  const getInitial = () => {
    const name = form?.firstname || form?.lastname || form?.fullName || form?.email?.[0] || "U";
    return name.charAt(0).toUpperCase();
  };

  if (!form) return null;

  const inputClasses = `w-full px-5 py-3.5 border rounded-xl outline-none transition-all ${
    isSaved && !isEditing
      ? "border-gray-300 bg-gray-50 font-bold text-gray-800 cursor-default"
      : "border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 text-gray-800"
  }`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-sky-50">
      <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push("/user/home")}
              className="p-2.5 hover:bg-blue-50 rounded-xl transition"
            >
              <ArrowLeft className="w-5 h-5 text-blue-700" />
            </button>
            <h1 className="text-xl font-semibold text-gray-800">Chỉnh sửa hồ sơ</h1>
          </div>
          {isSaved && !isEditing && (
            <div className="flex items-center gap-2 text-emerald-600 text-sm font-medium">
              <Check className="w-4 h-4" />
              Đã lưu
            </div>
          )}
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-10">
        <div className="bg-white rounded-3xl shadow-lg border border-blue-100 overflow-hidden">
          <div className="relative h-36 bg-gradient-to-r from-blue-400 via-sky-400 to-cyan-400">
            <div className="absolute inset-0 bg-white/10" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
              <label className="cursor-pointer group block relative">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                  disabled={isSaved && !isEditing}
                />
                <div className="w-32 h-32 rounded-full overflow-hidden ring-8 ring-white shadow-2xl transition-all group-hover:ring-blue-100">
                  {form.avatar ? (
                    <Image
                      src={form.avatar}
                      alt="Avatar"
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-sky-500 flex items-center justify-center text-5xl font-bold text-white">
                      {getInitial()}
                    </div>
                  )}
                </div>
                {(isEditing || !isSaved) && (
                  <div className="absolute inset-0 rounded-full bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    <Camera className="w-10 h-10 text-white" />
                  </div>
                )}
              </label>
            </div>
          </div>

          <div className="pt-20 px-8 pb-12">
            <div className="space-y-7">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Họ</label>
                  <input
                    type="text"
                    value={form.lastname || ""}
                    onChange={(e) => setForm({ ...form, lastname: e.target.value })}
                    className={inputClasses}
                    placeholder="Nguyễn"
                    readOnly={isSaved && !isEditing}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tên</label>
                  <input
                    type="text"
                    value={form.firstname || ""}
                    onChange={(e) => setForm({ ...form, firstname: e.target.value })}
                    className={inputClasses}
                    placeholder="Văn A"
                    readOnly={isSaved && !isEditing}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={form.email}
                  className={inputClasses}
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại</label>
                <input
                  type="tel"
                  value={form.phone || ""}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className={inputClasses}
                  placeholder="0901234567"
                  readOnly={isSaved && !isEditing}
                />
              </div>
            </div>

            <div className="mt-12 text-center">
              {isSaved && !isEditing ? (
                <button
                  onClick={handleEdit}
                  className="px-12 py-3.5 bg-gray-700 text-white font-bold text-lg rounded-xl hover:bg-gray-800 focus:ring-4 focus:ring-gray-200 shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2 mx-auto"
                >
                  <Edit3 className="w-5 h-5" />
                  Chỉnh sửa
                </button>
              ) : (
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="px-12 py-3.5 bg-blue-600 text-white font-bold text-lg rounded-xl hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-60"
                >
                  {isSaving ? "Đang lưu..." : "Lưu thay đổi"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}