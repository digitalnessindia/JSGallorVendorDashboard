import React from "react";

const RegistrationHeroSection = () => {
    return (
        <section className="w-full bg-[#473425] px-4 sm:px-6 lg:px-8 pt-16 pb-10 overflow-hidden">
            <div className="max-w-7xl mx-auto relative">
                <div className="absolute -top-10 left-0 w-40 h-40 bg-[#C6A43B]/10 blur-3xl rounded-full"></div>
                <div className="absolute top-20 right-10 w-48 h-48 bg-[#C6A43B]/10 blur-3xl rounded-full"></div>

                <div className="relative rounded-[28px] border border-white/10 bg-white p-6 sm:p-8 lg:p-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                        <div>
                            <span className="text-[#8B5A2B] text-sm font-semibold tracking-[0.2em] uppercase">
                                Join JS Gallor
                            </span>

                            <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                                Grow Your Vendor Business With a
                                <span className="text-[#8B5A2B]"> Premium Interior Network</span>
                            </h1>

                            <p className="mt-5 text-gray-900 text-sm sm:text-base leading-7 max-w-2xl">
                                Become a trusted partner on JS Gallor and showcase your
                                products, craftsmanship, and services to customers looking for
                                quality furniture and interior solutions.
                            </p>

                            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="rounded-2xl border border-white/10 bg-[#0b1220]/80 p-4">
                                    <h3 className="text-[#EAB308] text-xl font-bold">Premium</h3>
                                    <p className="text-white text-sm mt-1">
                                        Brand visibility & positioning
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-white/10 bg-[#0b1220]/80 p-4">
                                    <h3 className="text-[#EAB308] text-xl font-bold">Trusted</h3>
                                    <p className="text-white text-sm mt-1">
                                        Vendor onboarding process
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-white/10 bg-[#0b1220]/80 p-4">
                                    <h3 className="text-[#EAB308] text-xl font-bold">Growth</h3>
                                    <p className="text-white text-sm mt-1">
                                        More reach, leads & projects
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute -top-6 -left-6 w-28 h-28 bg-[#C6A43B]/10 blur-2xl rounded-full"></div>
                            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#C6A43B]/10 blur-2xl rounded-full"></div>

                            <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#0b1220]/80 p-6 sm:p-8 shadow-[0_10px_40px_rgba(198,164,59,0.12)]">
                                <div className="space-y-4">
                                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                        <p className="text-white font-semibold">
                                            Showcase Your Portfolio
                                        </p>
                                        <p className="text-gray-400 text-sm mt-1">
                                            Highlight your best projects, products, and design
                                            expertise.
                                        </p>
                                    </div>

                                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                        <p className="text-white font-semibold">
                                            Connect With More Clients
                                        </p>
                                        <p className="text-gray-400 text-sm mt-1">
                                            Reach homeowners, businesses, and premium customers.
                                        </p>
                                    </div>

                                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                        <p className="text-white font-semibold">
                                            Build Trust & Credibility
                                        </p>
                                        <p className="text-gray-400 text-sm mt-1">
                                            Join a platform focused on quality, professionalism, and
                                            long-term partnerships.
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-6 rounded-2xl border border-[#C6A43B]/20 bg-[#C6A43B]/10 p-4">
                                    <p className="text-[#EAB308] text-sm font-medium">
                                        Vendor Benefit
                                    </p>
                                    <p className="text-gray-200 text-sm mt-2 leading-6">
                                        Register once and let your work speak through a premium
                                        digital presence tailored for furniture and interior vendors.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RegistrationHeroSection;