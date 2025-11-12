'use client';

import React, { useState } from "react";
import Link from "next/dist/client/link";

const VerifyOtpPage = () => {
    const [formData, setFormData] =  useState({
        otp: '',
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});



    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className="min-h-screen w-full bg-linear-to-br from-orange-50 via-yellow-200 to-red-200 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">

                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-extrabold bg-linear-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
                            Verify OTP
                        </h1>
                        <p className="text-gray-600">Enter the OTP sent to your email</p>
                    </div>
                    <form onSubmit={() => {}} className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Enter OTP<span className='text-red-500'>*</span></label>
                            <input
                                type="text"
                                name="otp"
                                value={formData.otp}
                                onChange={handleChange}
                                placeholder="Enter OTP"
                                className={`w-full px-4 py-3 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-orange-800 focus:border-transparent ${errors.otp ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50 hover:bg-white'
                                    }`}
                            />
                            {errors.otp && <p className="text-red-500 text-xs mt-1">{errors.otp}</p>}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-linear-to-r from-orange-600 to-orange-700 text-white font-semibold py-3 rounded-lg hover:shadow-lg hover:scale-[1.02] transition-all duration-200 mt-6"
                        >
                            Create Account
                        </button>
                    </form>


                    <p className="text-center text-gray-600 mt-6">
                        Did not receive the OTP?{' '}
                        <Link href="/login" className="font-semibold text-orange-600 hover:text-orange-800 transition">
                            Resend
                        </Link>
                    </p>
                </div>

                <p className="text-center text-xs text-gray-500 mt-6">
                    By registering, you agree to our{' '}
                    <Link href="#" className="underline hover:text-gray-700">Terms of Service</Link>
                    {' '}and{' '}
                    <Link href="#" className="underline hover:text-gray-700">Privacy Policy</Link>
                </p>
            </div>
        </div>
    );
}

export default VerifyOtpPage;