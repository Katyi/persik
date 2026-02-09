'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { navbarLinks } from '@/lib/constants';
import { Menu } from 'lucide-react';

const NavBar = () => {
  const currentPath = usePathname();
  const [dropdownMenu, setDropdownMenu] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  // Исправляем тип события
  const checkIfClickedOutside = (e: MouseEvent) => {
    if (
      dropdownMenu &&
      ref.current &&
      !ref.current.contains(e.target as Node)
    ) {
      setDropdownMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', checkIfClickedOutside);
    return () =>
      document.removeEventListener('mousedown', checkIfClickedOutside);
  }, [dropdownMenu]);

  return (
    <nav className="sticky top-0 bg-[#f5f3f1]/90 backdrop-blur-md flex items-center justify-between border-b px-8 h-[84px] z-50">
      {/* ЛЕВАЯ ЧАСТЬ */}
      <div className="flex items-center">
        {/* Аватар и Текст: видны только от sm (640px) и выше */}
        <div className="hidden sm:flex items-center gap-4">
          <Link href="/" className="flex items-center gap-4 group">
            <div className="relative w-[56px] h-[56px] rounded-full overflow-hidden ring-2 ring-orange-200 ring-offset-2 transition-all group-hover:ring-orange-400">
              <Image
                src="/Pers.jpg"
                alt="Персик"
                fill
                className="object-cover"
              />
            </div>
            <p className="neucha text-[30px] md:text-[36px] font-black group-hover:text-orange-600 transition-colors">
              Мой кот Персик
            </p>
          </Link>
        </div>

        {/* Лапка: видна только на мобильных (меньше sm) */}
        <div className="flex sm:hidden">
          <Link href="/">
            <Image
              src="/pawprint.png"
              alt="pawprint"
              width={44}
              height={44}
              className="hover:rotate-12 transition-transform"
            />
          </Link>
        </div>
      </div>

      {/* ПРАВАЯ ЧАСТЬ (МЕНЮ) */}
      <div className="flex items-center">
        {/* Десктопное меню */}
        <ul className="hidden sm:flex gap-6 md:gap-8">
          {navbarLinks.map((link) => (
            <Link
              key={link.url}
              href={link.url}
              className={`${
                link.url === currentPath
                  ? 'text-orange-600 font-bold'
                  : 'text-zinc-500 hover:text-zinc-800'
              } text-[20px] md:text-[24px] font-medium transition-colors`}
            >
              {link.label}
            </Link>
          ))}
        </ul>

        {/* Мобильное бургер-меню */}
        <div ref={ref} className="sm:hidden relative">
          <button
            onClick={() => setDropdownMenu(!dropdownMenu)}
            className="p-2 text-zinc-700 hover:bg-white/50 rounded-lg transition-colors"
          >
            <Menu size={32} />
          </button>

          {dropdownMenu && (
            <div className="absolute top-full -right-6 mt-2 w-[180px] bg-white shadow-xl rounded-2xl border border-zinc-100 p-2 flex flex-col gap-1">
              {navbarLinks.map((link) => (
                <Link
                  key={link.url}
                  href={link.url}
                  onClick={() => setDropdownMenu(false)}
                  className={`p-3 rounded-xl text-[18px] transition-colors ${
                    link.url === currentPath
                      ? 'bg-orange-50 text-orange-600 font-bold'
                      : 'hover:bg-zinc-50 text-zinc-600'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
