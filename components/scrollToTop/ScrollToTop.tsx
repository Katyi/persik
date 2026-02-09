'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Прокрутка к началу страницы
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth', // Можно добавить плавность
    });
  }, [pathname]);

  return null;
}
