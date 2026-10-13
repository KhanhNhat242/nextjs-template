'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavItem {
    label: string
    href: string
}

const navItems: NavItem[] = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Về chúng tôi', href: '/about' },
    { label: 'Dịch vụ', href: '/services' },
    { label: 'Liên hệ', href: '/contact' },
]

const Header = () => {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()

    const toggleMenu = () => {
        setIsOpen((prev) => !prev)
    }

    const closeMenu = () => {
        setIsOpen(false)
    }

    return (
        <header className="w-full bg-white border-b border-neutral-100 shadow-sm sticky top-0 z-50 transition-all">
            {/* Top Section: Logo & Toggle Button cho Mobile/Tablet */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between lg:justify-center py-3 md:py-4">
                    {/* Logo ở phía trên (căn giữa trên desktop) */}
                    <Link
                        href="/"
                        className="flex items-center justify-center transition-transform hover:opacity-90 active:scale-95"
                        onClick={closeMenu}
                    >
                        <Image
                            src="/images/mainlogo-img1.jpg"
                            alt="main-logo-img"
                            width={160}
                            height={64}
                            priority
                            className="h-12 sm:h-14 md:h-16 w-auto object-contain"
                        />
                    </Link>

                    {/* Nút collapse (Hamburger button) tương thích Tablet và Mobile */}
                    <button
                        type="button"
                        onClick={toggleMenu}
                        aria-label={isOpen ? 'Đóng menu' : 'Mở menu'}
                        aria-expanded={isOpen}
                        className="lg:hidden inline-flex items-center justify-center p-2 rounded-lg text-black hover:text-[#01796F] hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-[#01796F]/30 transition-colors"
                    >
                        {isOpen ? (
                            // Biểu tượng Đóng (X)
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        ) : (
                            // Biểu tượng Menu Hamburger (3 gạch)
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Bottom Section: Thanh Navigation trên Desktop (nằm bên dưới logo) */}
            <nav className="hidden lg:block border-t border-neutral-100 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <ul className="flex flex-row justify-center items-center gap-10 py-3.5">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href
                            return (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className={`group relative text-[15px] font-medium tracking-wide transition-colors duration-200 py-1 inline-block ${isActive
                                            ? 'text-[#01796F] font-semibold'
                                            : 'text-black hover:text-[#01796F]'
                                            }`}
                                    >
                                        {item.label}
                                        {/* Hiệu ứng thanh gạch chân khi hover hoặc active màu #01796F */}
                                        <span
                                            className={`absolute bottom-0 left-0 h-[2px] bg-[#01796F] transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'
                                                }`}
                                        />
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </nav>

            {/* Menu xổ xuống (Collapsible menu) khi bấm nút trên Tablet & Mobile */}
            <div
                className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out border-t border-neutral-100 bg-white ${isOpen ? 'max-h-96 opacity-100 py-3' : 'max-h-0 opacity-0 py-0'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <ul className="flex flex-col space-y-1">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href
                            return (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        onClick={closeMenu}
                                        className={`flex items-center px-4 py-2.5 rounded-lg text-base font-medium transition-colors duration-200 ${isActive
                                            ? 'text-[#01796F] bg-[#01796F]/10 font-semibold'
                                            : 'text-black hover:text-[#01796F] hover:bg-neutral-50 active:text-[#01796F]'
                                            }`}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </header>
    )
}

export default Header