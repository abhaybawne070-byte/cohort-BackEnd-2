import React from 'react';

const Register = () => {
    return (
        <main className="min-h-screen flex items-center justify-center relative overflow-hidden px-6 py-6 md:py-10 bg-background text-on-surface w-full">
            {/* Dynamic Product Experience Background */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-black">
                <div 
                    className="absolute inset-0 opacity-60 transition-transform duration-[10000ms] ease-linear scale-105" 
                    style={{
                        backgroundImage: `url('/bg_1.png')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'contrast(110%) brightness(40%) saturate(120%)'
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>
            </div>

            {/* Registration Container */}
            <div className="relative z-10 w-full max-w-[540px]">
                <div className="text-center mb-6">
                    <h1 className="font-headline text-4xl md:text-5xl tracking-tighter text-primary mb-2">SNITCH</h1>
                    <p className="font-label text-[10px] tracking-[0.4em] uppercase text-on-surface-variant opacity-60">Join the collective of discerning harvesters</p>
                </div>

                <div className="bg-surface-container-low/40 backdrop-blur-3xl p-6 md:p-10 rounded-lg shadow-2xl">
                    <form action="#" className="space-y-6" method="POST">
                        {/* Full Name */}
                        <div className="group relative">
                            <label className="block font-label text-[10px] tracking-widest text-outline uppercase mb-2 group-focus-within:text-primary transition-colors" htmlFor="name">Full Name</label>
                            <input 
                                className="w-full bg-transparent border-0 border-b border-outline-variant/30 py-3 px-0 text-on-surface focus:ring-0 focus:border-primary transition-all duration-500 font-headline text-xl placeholder:text-surface-container-highest" 
                                id="name" 
                                name="name" 
                                placeholder="Arthur P. Morgan" 
                                required 
                                type="text"
                            />
                        </div>

                        {/* Email Address */}
                        <div className="group relative">
                            <label className="block font-label text-[10px] tracking-widest text-outline uppercase mb-2 group-focus-within:text-primary transition-colors" htmlFor="email">Email Address</label>
                            <input 
                                className="w-full bg-transparent border-0 border-b border-outline-variant/30 py-3 px-0 text-on-surface focus:ring-0 focus:border-primary transition-all duration-500 font-headline text-xl placeholder:text-surface-container-highest" 
                                id="email" 
                                name="email" 
                                placeholder="curator@theharvest.com" 
                                required 
                                type="email"
                            />
                        </div>

                        {/* Contact Number */}
                        <div className="group relative">
                            <label className="block font-label text-[10px] tracking-widest text-outline uppercase mb-2 group-focus-within:text-primary transition-colors" htmlFor="phone">Contact Number</label>
                            <input 
                                className="w-full bg-transparent border-0 border-b border-outline-variant/30 py-3 px-0 text-on-surface focus:ring-0 focus:border-primary transition-all duration-500 font-headline text-xl placeholder:text-surface-container-highest" 
                                id="phone" 
                                name="phone" 
                                placeholder="+1 (202) 555-0192" 
                                type="tel"
                            />
                        </div>

                        {/* Password */}
                        <div className="group relative">
                            <label className="block font-label text-[10px] tracking-widest text-outline uppercase mb-2 group-focus-within:text-primary transition-colors" htmlFor="password">Password</label>
                            <input 
                                className="w-full bg-transparent border-0 border-b border-outline-variant/30 py-3 px-0 text-on-surface focus:ring-0 focus:border-primary transition-all duration-500 font-headline text-xl placeholder:text-surface-container-highest" 
                                id="password" 
                                name="password" 
                                placeholder="••••••••••••" 
                                required 
                                type="password"
                            />
                        </div>

                        {/* Seller Toggle */}
                        <div className="flex items-center justify-between pt-4">
                            <div className="space-y-1">
                                <span className="block font-label text-sm text-on-surface">Become a Merchant</span>
                                <span className="block font-label text-[10px] text-on-surface-variant/60 uppercase tracking-wider">Access the Seller Guild dashboard</span>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input className="sr-only peer" name="is_seller" type="checkbox"/>
                                <div className="w-11 h-6 bg-surface-container-highest rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-on-surface after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-container"></div>
                            </label>
                        </div>

                        {/* Submit Action */}
                        <div className="pt-6">
                            <button className="w-full py-4 px-8 bg-gradient-to-r from-primary to-primary-container text-on-primary font-label text-xs tracking-[0.3em] uppercase font-bold rounded-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-500 flex justify-center items-center gap-3" type="submit">
                                Initiate Membership
                            </button>
                        </div>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="font-label text-[10px] tracking-widest text-on-surface-variant/40 uppercase">
                            Already part of the heritage? 
                            <a className="text-primary hover:text-primary-fixed ml-2 transition-colors" href="/login">Sign In</a>
                        </p>
                    </div>
                </div>

                {/* Minimalist Footer Detail */}
                <div className="mt-8 text-center space-y-4">
                    <div className="flex justify-center items-center gap-8 opacity-30 grayscale contrast-150">
                        <img alt="minimalist botanical logo icon of a single wheat stalk on dark background" className="h-6 w-auto" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1RN63gl_XRaRZK2GPm5S4hpoZKbt6ymBSGOTKyLmTP7cpTgwB-NCQBoCm0t3VRmbW1r5O3sQSAkuoBj6U1c_KLlXZ_Rjzv7SIbnZufpiGRpLG5LTCtO6FliZ1NkiYczpuHgPzmJz_2UY7LcID1N6ojuHofQ206pPEWKlty0BOYa0jJeAlgOA3Xb3U3YFE2c14I29_pnzlk5KU-SgQBlxmZm8m-65L4dYVPsE7uUx2HF-l7NyvbSkM68w_ZO1FQSH-lpvKcjDyIUc" />
                        <img alt="minimalist abstract geometric logo mark of a circle and line in gold" className="h-6 w-auto" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5w3f8lL_1Y2fWMfZXLael0nCSJTE00tZA2pHhPVs2UmNkm9HTYoiZJ8BjFgNUZWTD_aVu6Zvjv_PInxaPJnRThW7wLO6ZASAiaSlGFSxSYKNdKJ8IxXT_Ne9u3UKjfJU7uroSx9O94MQUNzqj2WTTsJNYDy5TRlt9rLQ4kDfO6hcJ2E57RKgTITaCKV1l4ELtTOp1cZ9keqYmfHpYy_upJF7Ogf5GVLjJjQrmbUIQdB4YSAWAA8zxOeitzZRzrCsOVjYWRceRDkk" />
                    </div>
                    <p className="font-label text-[9px] tracking-[0.5em] text-on-surface-variant/30 uppercase">The Art of the Harvest © 2024</p>
                </div>
            </div>
        </main>
    );
};

export default Register;
