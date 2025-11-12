"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export const NavBar = () => {

    return (
        <header className="w-full bg-white/80 backdrop-blur-md shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="flex items-center gap-2">
                                <div className="relative w-10 h-10">
                                    <Image src="/mainlogo.png" alt="UTEShop" fill className="object-contain" />
                                </div>
                                <span className="hidden sm:inline-block font-extrabold text-lg text-slate-800">
                                    UTEShop
                                </span>
                        </Link>

                        <nav className="hidden md:flex items-center space-x-6 ml-6">
                            <Link href="/" className="text-slate-700 font-medium hover:text-blue-600 transition">Trang chủ</Link>
                            <Link href="/products" className="text-slate-700 font-medium hover:text-blue-600 transition">Sản phẩm</Link>
                            <Link href="/about" className="text-slate-700 font-medium hover:text-blue-600 transition">Giới thiệu</Link>
                            <Link href="/contact" className="text-slate-700 font-medium hover:text-blue-600 transition">Liên hệ</Link>
                        </nav>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link href="/cart" className="relative inline-flex items-center px-3 py-2 rounded-full hover:bg-slate-100 transition">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 6M7 13l-2 7h14l-2-7M10 21a1 1 0 11-2 0 1 1 0 012 0zm8 0a1 1 0 11-2 0 1 1 0 012 0z" />
                                </svg>
                                <span className="sr-only">Cart</span>
                                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-semibold leading-none text-white bg-red-500 rounded-full">3</span>
                        </Link>

                        <Link href="/login" className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow hover:scale-[1.02] transition-transform">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM6 21v-2a4 4 0 014-4h4" />
                                </svg>
                                <span className="font-semibold text-sm">Sign In</span>
                        </Link>

                        <button className="md:hidden inline-flex items-center p-2 rounded-md hover:bg-slate-100">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};