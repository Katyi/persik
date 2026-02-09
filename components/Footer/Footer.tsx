'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navbarLinks } from '@/lib/constants';

export default function Footer() {
  const currentPath = usePathname();

  return (
    <footer className="w-full bg-[#f5f3f1] mt-auto">
      {' '}
      {/* mt-auto прижмет футер вниз в flex-контейнере */}
      <div className="w-full overflow-hidden leading-[0]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1199 200"
          preserveAspectRatio="none"
          className="w-full h-auto"
          fill="none"
        >
          <path
            d="M1198.7 0.58252C587.548 187.543 145.103 153.004 0.275391 112.365V424.825H1198.7V153.764V0.58252Z"
            fill="#faf8f6" // Цвет должен совпадать с фоном блока ниже
          />
        </svg>
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-evenly gap-6 py-10 w-full bg-[#faf8f6]">
        <p className="font-[300] px-4 lg:px-0 text-center text-zinc-600">
          Copyright © {new Date().getFullYear()}, Persik Cat.
        </p>

        <ul className="flex flex-wrap gap-6 justify-center">
          {navbarLinks.map((link) => (
            <Link
              key={link.url}
              href={link.url}
              className={`${
                link.url === currentPath
                  ? 'text-orange-600 font-bold'
                  : 'text-zinc-500 hover:text-zinc-800'
              } text-[18px] md:text-[22px] transition-colors`}
            >
              {link.label}
            </Link>
          ))}
        </ul>

        <a
          href="mailto:alex.frontender@gmail.com"
          className="text-[14px] sm:text-[16px] font-medium text-[#ff8562] hover:underline transition-all"
        >
          alex.frontender@gmail.com
        </a>
      </div>
    </footer>
  );
}
