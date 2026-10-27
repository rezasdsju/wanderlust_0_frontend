import { ArrowRight } from "lucide-react";
import Link from "next/link";

const quickLinks = ["Home", "Destinations", "My Bookings", "My Profile"];
const supportLinks = ["Help Center", "Terms of Service", "Privacy Policy"];
const Footer = () => {
    return (
        <footer className="bg-[#020d1d] px-6 pb-5 pt-10 text-white sm:px-8 lg:px-10">
            <div className="mx-auto max-w-295">
                <div className="flex flex-col gap-8 lg:flex-row lg:justify-between">
                    <div className="max-w-105">
                        <h3 className="text-[clamp(3rem,7vw,7rem)] leading-[0.9] font-light tracking-[-0.075em] text-white">
                            Wanderlast
                        </h3>
                        <p className="mt-4 text-sm text-slate-300">
                            Your gateway to extraordinary travel experiences around the world.
                        </p>
                    </div>

                    <div className="grid w-full gap-8 md:grid-cols-2 lg:max-w-155 lg:grid-cols-3">
                        <div>
                            <h4 className="mb-4 text-[0.7rem] font-medium tracking-[0.2em] text-slate-400 uppercase">
                                Newsletter
                            </h4>
                            <p className="mb-4 text-sm text-slate-300">
                                Subscribe for exclusive travel deals and inspiration.
                            </p>
                            <div className="flex h-12 max-w-65 items-center border border-slate-600 bg-slate-700/30 px-3">
                                <input
                                    aria-label="Email address"
                                    type="email"
                                    placeholder="Enter email"
                                    className="w-full bg-transparent text-sm text-white placeholder:text-slate-400 outline-none"
                                />
                                <button
                                    type="button"
                                    aria-label="Submit email"
                                    className="flex h-8 w-8 items-center justify-center bg-transparent text-white transition-colors hover:text-cyan-300"
                                >
                                    <ArrowRight className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        <div>
                            <h4 className="mb-4 text-[0.7rem] font-medium tracking-[0.2em] text-slate-400 uppercase">
                                Quick Links
                            </h4>
                            <ul className="space-y-2 text-sm text-slate-300">
                                {quickLinks.map((link) => (
                                    <li key={link}>
                                        <Link href="#" className="hover:text-white">
                                            {link}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="mb-4 text-[0.7rem] font-medium tracking-[0.2em] text-slate-400 uppercase">
                                Support
                            </h4>
                            <ul className="space-y-2 text-sm text-slate-300">
                                {supportLinks.map((link) => (
                                    <li key={link}>
                                        <Link href="#" className="hover:text-white">
                                            {link}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="md:col-span-2 lg:col-span-1">
                            <h4 className="mb-4 text-[0.7rem] font-medium tracking-[0.2em] text-slate-400 uppercase">
                                Contact Us
                            </h4>
                            <ul className="space-y-2 text-sm text-slate-300">
                                <li>
                                    <Link href="tel:+7869011622" className="hover:text-white">
                                        786 901 1622
                                    </Link>
                                </li>
                                <li>
                                    <Link href="mailto:info@wanderland.com" className="hover:text-white">
                                        info@wanderland.com
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="mt-10 flex flex-col gap-4 border-t border-slate-700 pt-5 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
                    <p>© 2026 Wanderlast. All rights reserved.</p>
                    <div className="flex items-center gap-4 text-white">
                        <Link href="#" aria-label="X" className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-600 text-[0.7rem] font-bold hover:border-cyan-400 hover:text-cyan-300">
                            X
                        </Link>
                        <Link href="#" aria-label="LinkedIn" className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-600 text-[0.7rem] font-bold hover:border-cyan-400 hover:text-cyan-300">
                            in
                        </Link>
                        <Link href="#" aria-label="Instagram" className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-600 text-[0.7rem] font-bold hover:border-cyan-400 hover:text-cyan-300">
                            ◌
                        </Link>
                        <Link href="#" aria-label="Send" className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-600 text-[0.7rem] font-bold hover:border-cyan-400 hover:text-cyan-300">
                            ✈
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;