import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-[#232E5A] text-white pt-20 pb-10">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    {/* Column 1: About */}
                    <div className="space-y-6">
                        <div className="mb-6">
                            {/* Logo Placeholder */}
                            <div className="inline-block border border-white/20 p-2 rounded-sm bg-[#232E5A]">
                                <div className="font-serif text-2xl font-bold leading-none tracking-wider">tdi</div>
                                <div className="font-serif text-lg leading-none tracking-widest text-[#D9991F]">city</div>
                                <div className="text-[10px] tracking-[0.2em] mt-1 border-t border-white/20 pt-1 w-full text-center">KUNDLI</div>
                            </div>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed font-sans">
                            TDI City Kundli is a thoroughly planned and luxurious township that offers a lifestyle of elegance and comfort. Experience world-class amenities and a vibrant community.
                        </p>
                        <div className="flex gap-4 pt-4">
                            <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#D9991F] hover:border-[#D9991F] transition-all">
                                <Facebook size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#D9991F] hover:border-[#D9991F] transition-all">
                                <Twitter size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#D9991F] hover:border-[#D9991F] transition-all">
                                <Instagram size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#D9991F] hover:border-[#D9991F] transition-all">
                                <Linkedin size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h4 className="text-xl font-serif font-medium mb-8 flex items-center gap-3">
                            <span className="w-8 h-[1px] bg-[#D9991F]"></span> Quick Links
                        </h4>
                        <ul className="space-y-4">
                            {['Township Overview', 'Our Projects', 'Amenities', 'Gallery', 'Contact Us'].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-gray-300 hover:text-[#D9991F] transition-colors text-sm font-sans flex items-center gap-2 group">
                                        <span className="w-1 h-1 bg-[#D9991F] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Projects */}
                    <div>
                        <h4 className="text-xl font-serif font-medium mb-8 flex items-center gap-3">
                            <span className="w-8 h-[1px] bg-[#D9991F]"></span> Our Projects
                        </h4>
                        <ul className="space-y-4">
                            {['Tuscan City', 'Rodeo Drive', 'TDI Mall', 'Samarpan Hospital', 'TDI International School'].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-gray-300 hover:text-[#D9991F] transition-colors text-sm font-sans flex items-center gap-2 group">
                                        <span className="w-1 h-1 bg-[#D9991F] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4: Contact */}
                    <div>
                        <h4 className="text-xl font-serif font-medium mb-8 flex items-center gap-3">
                            <span className="w-8 h-[1px] bg-[#D9991F]"></span> Contact Us
                        </h4>
                        <ul className="space-y-6 text-sm text-gray-300 font-sans">
                            <li className="flex items-start gap-4">
                                <MapPin className="text-[#D9991F] mt-1 shrink-0" size={18} />
                                <span>Sector-58, 59, 60, 64 in Kundli, Sonipat, Haryana</span>
                            </li>
                            <li className="flex items-center gap-4">
                                <Phone className="text-[#D9991F] shrink-0" size={18} />
                                <span>+91 123 456 7890</span>
                            </li>
                            <li className="flex items-center gap-4">
                                <Mail className="text-[#D9991F] shrink-0" size={18} />
                                <span>info@tdicity.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400 font-sans">
                    <p>© 2026 TDI City. All Rights Reserved.</p>
                    <div className="flex gap-8">
                        <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white transition-colors">Terms & Conditions</Link>
                        <Link href="#" className="hover:text-white transition-colors">Sitemap</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
