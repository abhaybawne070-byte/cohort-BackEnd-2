import React, { useState } from 'react';

const Register = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        contactNumber: '',
        email: '',
        password: '',
        isSeller: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Registering with:', formData);
    };

    return (
        <div className="min-h-screen bg-[#12140f] text-[#e3e3da] font-sans flex items-center justify-center p-6 selection:bg-[#c3cf52] selection:text-[#12140f]">
            <div className="w-full max-w-xl">
                {/* Header section with ample breathing space */}
                <div className="mb-16 mt-8">
                    <h1 className="text-[2.5rem] lg:text-[3.5rem] leading-tight font-medium tracking-tight mb-4 text-[#e3e3da]">
                        Create Account
                    </h1>
                    <p className="text-[#c8c8b2] text-lg max-w-md leading-relaxed">
                        Join a curated organic space where your vision meets utility.
                    </p>
                </div>

                {/* Form Section */}
                <form onSubmit={handleSubmit} className="space-y-8 bg-[#1a1c17] p-8 md:p-12 rounded-[2rem] shadow-[0_40px_80px_rgba(13,15,10,0.5)]">
                    <div className="space-y-6">
                        {/* Full Name */}
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="fullName" className="text-sm font-medium text-[#c8c8b2] px-1">Full Name</label>
                            <input 
                                type="text" 
                                id="fullName"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="John Doe"
                                className="bg-[#34352f] text-[#e3e3da] placeholder-[#c8c8b2]/40 outline-none px-5 py-4 rounded-xl focus:bg-[#383a34] transition-all duration-300 border-b-2 border-transparent focus:border-[#c3cf52] shadow-inner" 
                                required
                            />
                        </div>

                        {/* Contact Number */}
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="contactNumber" className="text-sm font-medium text-[#c8c8b2] px-1">Contact Number</label>
                            <input 
                                type="tel" 
                                id="contactNumber"
                                name="contactNumber"
                                value={formData.contactNumber}
                                onChange={handleChange}
                                placeholder="+1 (234) 567-8900"
                                className="bg-[#34352f] text-[#e3e3da] placeholder-[#c8c8b2]/40 outline-none px-5 py-4 rounded-xl focus:bg-[#383a34] transition-all duration-300 border-b-2 border-transparent focus:border-[#c3cf52] shadow-inner" 
                                required
                            />
                        </div>

                        {/* Email Address */}
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-[#c8c8b2] px-1">Email Address</label>
                            <input 
                                type="email" 
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="john@example.com"
                                className="bg-[#34352f] text-[#e3e3da] placeholder-[#c8c8b2]/40 outline-none px-5 py-4 rounded-xl focus:bg-[#383a34] transition-all duration-300 border-b-2 border-transparent focus:border-[#c3cf52] shadow-inner" 
                                required
                            />
                        </div>

                        {/* Password */}
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="password" className="text-sm font-medium text-[#c8c8b2] px-1">Password</label>
                            <input 
                                type="password" 
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className="bg-[#34352f] text-[#e3e3da] placeholder-[#c8c8b2]/40 outline-none px-5 py-4 rounded-xl focus:bg-[#383a34] transition-all duration-300 border-b-2 border-transparent focus:border-[#c3cf52] shadow-inner" 
                                required
                            />
                        </div>
                    </div>

                    {/* isSeller Checkbox */}
                    <div className="pt-2 pb-4">
                        <label className="flex items-center space-x-4 cursor-pointer group">
                            <div className="relative flex items-center justify-center">
                                <input 
                                    type="checkbox" 
                                    name="isSeller"
                                    checked={formData.isSeller}
                                    onChange={handleChange}
                                    className="peer appearance-none w-6 h-6 rounded bg-[#34352f] checked:bg-[#c3cf52] transition-colors duration-300 outline-none cursor-pointer"
                                />
                                <svg 
                                    className="absolute w-4 h-4 text-[#2f3300] opacity-0 peer-checked:opacity-100 transition-opacity duration-300 pointer-events-none" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor" 
                                    strokeWidth="3"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <span className="text-[#e3e3da] font-medium select-none group-hover:text-[#c3cf52] transition-colors duration-300">
                                Register as a Seller
                            </span>
                        </label>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                        <button 
                            type="submit" 
                            className="w-full py-4 rounded-full bg-gradient-to-br from-[#c3cf52] to-[#a2ad34] text-[#2f3300] font-bold text-lg hover:opacity-90 hover:shadow-[0_0_30px_rgba(195,207,82,0.15)] transition-all duration-300 active:scale-[0.98]"
                        >
                            Create Account
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
