import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hook/useAuth';

const Register = () => {

  const{handleRegister} = useAuth()

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    contactNumber: '',
    isSeller: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    await handleRegister({
        email:formData.email,
        contact:formData.contactNumber,
        password:formData.password,
        isSeller:formData.isSeller,
        fullname: formData.fullName
    })
  };

  return (
    <div className="bg-surface text-on-surface font-body selection:bg-primary/30 min-h-screen">
      <main className="min-h-screen flex items-stretch">
        {/* Visual Anchor: Left Split (Artisanal Pulses) */}
        <section className="hidden lg:block w-7/12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-surface z-10"></div>
          <img 
            alt="Artisanal heirloom beans and black lentils" 
            className="absolute inset-0 w-full h-full object-cover grayscale opacity-60" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoYRsda-Txy1fUnXCR49c0ExMfPPA9qF5cxIRJP0ENmxEqfFE9JgTPeZX4-Jg0MEM1Zv8FwbEba3ySv5PN9IVvcyDSPItTfv_ZMtHMjhbyhvEp8lWr5V6fVhGILvr-tW1UO-YAyd4WnIxLVbbmggknThcK5wqOkO3Drb1MgJlTFB46Bf414m6FgHTNeSyE6qIpsIEAAiGuuTR-XJeaRZHaWXOEdXqePOtqi-gdAhC6I_-elGej0noshbz5qh66d6G8E5RrpoEKeeM" 
          />
          <div className="absolute bottom-20 left-20 z-20 max-w-md">
            <h2 className="font-headline text-5xl italic text-primary tracking-tighter mb-4 leading-tight">Curated by the earth, delivered to your cellar.</h2>
            <p className="font-body text-outline text-lg font-light tracking-wide">Join a community of connoisseurs who value the pedigree of every grain.</p>
          </div>
        </section>

        {/* Form Canvas: Right Split */}
        <section className="w-full lg:w-5/12 flex items-center justify-center bg-surface relative z-20 px-8 py-24 md:px-16 lg:px-24">
          <div className="w-full max-w-md space-y-12">
            <header className="space-y-2">
              <span className="font-label text-[10px] tracking-[0.4em] text-primary uppercase">The Registry</span>
              <h1 className="font-headline text-6xl tracking-tighter text-on-surface">Create Account</h1>
            </header>

            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="space-y-8">
                {/* Full Name Field */}
                <div className="group relative">
                  <label className="block font-label text-[10px] uppercase tracking-widest text-outline group-focus-within:text-primary transition-colors duration-300 mb-2">
                    Full Name
                  </label>
                  <input 
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full bg-transparent border-0 border-b border-outline-variant/30 py-3 px-0 font-body text-on-surface placeholder:text-surface-variant focus:ring-0 focus:border-primary transition-all duration-500 form-input-focus tracking-widest text-sm" 
                    placeholder="ALEXANDER VOGUE" 
                    type="text" 
                    required 
                  />
                </div>

                {/* Email Field */}
                <div className="group relative">
                  <label className="block font-label text-[10px] uppercase tracking-widest text-outline group-focus-within:text-primary transition-colors duration-300 mb-2">
                    Email Address
                  </label>
                  <input 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-transparent border-0 border-b border-outline-variant/30 py-3 px-0 font-body text-on-surface placeholder:text-surface-variant focus:ring-0 focus:border-primary transition-all duration-500 form-input-focus tracking-widest text-sm" 
                    placeholder="CLIENT@EPICUREAN.COM" 
                    type="email" 
                    required 
                  />
                </div>

                {/* Password Field */}
                <div className="group relative">
                  <label className="block font-label text-[10px] uppercase tracking-widest text-outline group-focus-within:text-primary transition-colors duration-300 mb-2">
                    Password
                  </label>
                  <input 
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full bg-transparent border-0 border-b border-outline-variant/30 py-3 px-0 font-body text-on-surface placeholder:text-surface-variant focus:ring-0 focus:border-primary transition-all duration-500 form-input-focus tracking-widest text-sm" 
                    placeholder="••••••••••••" 
                    type="password" 
                    required 
                  />
                </div>

                {/* Contact Field */}
                <div className="group relative">
                  <label className="block font-label text-[10px] uppercase tracking-widest text-outline group-focus-within:text-primary transition-colors duration-300 mb-2">
                    Contact Number
                  </label>
                  <input 
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    className="w-full bg-transparent border-0 border-b border-outline-variant/30 py-3 px-0 font-body text-on-surface placeholder:text-surface-variant focus:ring-0 focus:border-primary transition-all duration-500 form-input-focus tracking-widest text-sm" 
                    placeholder="+1 (000) 000-0000" 
                    type="tel" 
                    required 
                  />
                </div>
              </div>

              {/* Merchant Toggle */}
              <div className="flex items-center justify-between p-6 bg-surface-container-low border border-outline-variant/10 group hover:border-primary/20 transition-all duration-500">
                <div className="flex flex-col gap-1">
                  <span className="font-label text-xs tracking-widest text-on-surface uppercase">Become a Merchant</span>
                  <span className="font-body text-[10px] text-outline">List your artisanal harvest in our pantry</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    name="isSeller"
                    type="checkbox" 
                    checked={formData.isSeller}
                    onChange={handleChange}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-5 bg-surface-variant rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-on-surface-variant after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary-container"></div>
                </label>
              </div>

              <div className="pt-6 space-y-6">
                <button type="submit" className="w-full py-5 cursor-pointer bg-gradient-to-r from-primary to-primary-container text-on-primary font-label text-xs uppercase tracking-[0.3em] font-bold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/10">
                  Create Account
                </button>
                <div className="text-center">
                  <p className="font-body text-[10px] tracking-widest text-outline uppercase">
                    Already a member?{' '}
                    <Link to="/login" className="text-primary hover:text-white transition-colors duration-300 ml-2">
                       Sign In
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Register;
