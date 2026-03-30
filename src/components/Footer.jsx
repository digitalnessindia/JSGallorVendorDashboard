import React from 'react'

const Footer = () => {
    return (
        <>
            <footer className="bg-[#473425]  py-10 px-6 md:px-16 border-t border-gray-800">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-building2 w-6 h-6 text-black">
                                    <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"></path>
                                    <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"></path>
                                    <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"></path>
                                    <path d="M10 6h4"></path><path d="M10 10h4"></path>
                                    <path d="M10 14h4"></path><path d="M10 18h4"></path>
                                </svg> </div>
                            <div>
                                <div className="text-xl font-bold text-yellow-400">JSGALLOR</div>
                                <div className="text-sm text-white">Manufacturer Portal</div>
                            </div>
                        </div>
                        <div>
                            <div className="text-white text-sm">© 2026 JSGALLOR Manufacturer Portal. All rights reserved. <span></span> </div>
                            <div className="text-white text-sm pl-6">  Designed and Developed by Digitalness.</div>
                        </div>


                        <div className="flex gap-6 text-sm text-white"><a href="#" className="hover:text-yellow-400 transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-yellow-400 transition-colors">Terms of Service</a><a href="#" className="hover:text-yellow-400 transition-colors">Contact</a>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer