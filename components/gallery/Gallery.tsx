'use client';

import { useRef, useEffect, useState, ReactNode, useMemo } from 'react';
import Image from 'next/image';
import { useJustifiedLayout } from '@/lib/useJustifiedLayout';

interface Card {
  id: number;
  title?: string;
  text: string;
  width?: number;
  height?: number;
}

interface GalleryProps<T> {
  items: T[];
  selectedIndex: number | null;
  setSelectedIndex: (index: number | null) => void;
  onNextPage?: () => boolean;
  onPrevPage?: () => boolean;
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
  getCard: (item: T) => Card;
  renderCardContent: (item: T) => ReactNode;
}

export default function Gallery<T>({
  items,
  selectedIndex,
  setSelectedIndex,
  onNextPage,
  onPrevPage,
  hasNextPage,
  hasPrevPage,
  getCard,
  renderCardContent,
}: GalleryProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [pendingJump, setPendingJump] = useState<'first' | 'last' | null>(null);

  const openModal = (index: number) => setSelectedIndex(index);
  const closeModal = () => setSelectedIndex(null);

  // Функции переключения
  // const showNext = (e?: React.MouseEvent) => {
  //   e?.stopPropagation();
  //   if (selectedIndex === null) return;

  //   if (selectedIndex < items.length - 1) {
  //     setSelectedIndex(selectedIndex + 1);
  //   } else if (onNextPage && hasNextPage) {
  //     onNextPage();
  //     setSelectedIndex(0); // Переходим на первое фото новой страницы
  //   }
  // };
  const showNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex === null) return;

    if (selectedIndex < items.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    } else if (onNextPage && hasNextPage) {
      setPendingJump('first'); // Запоминаем, что хотим прыгнуть в начало
      onNextPage();
    }
  };

  // const showPrev = (e?: React.MouseEvent) => {
  //   e?.stopPropagation();
  //   if (selectedIndex === null) return;

  //   if (selectedIndex > 0) {
  //     setSelectedIndex(selectedIndex - 1);
  //   } else if (onPrevPage && hasPrevPage) {
  //     onPrevPage();
  //     setSelectedIndex(items.length - 1); // Переходим на последнее фото предыдущей страницы
  //   }
  // };
  const showPrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex === null) return;

    if (selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    } else if (onPrevPage && hasPrevPage) {
      setPendingJump('last'); // Запоминаем, что хотим прыгнуть в конец
      onPrevPage();
    }
  };

  // Подготавливаем данные для расчета сетки
  const images = useMemo(() => {
    return items.map((item, i) => {
      const p = getCard(item);
      const imgAsset = require('../../assets/' + p.title + '.jpg');
      const assetData = imgAsset.default || imgAsset;

      return {
        src: assetData,
        aspectRatio: assetData.width / assetData.height,
        originalIndex: i,
      };
    });
  }, [items, getCard]); // Пересчитываем только если изменились входные данные

  useEffect(() => {
    if (pendingJump === 'first') {
      setSelectedIndex(0);
      setPendingJump(null);
    } else if (pendingJump === 'last') {
      setSelectedIndex(items.length - 1); // Теперь items уже новые!
      setPendingJump(null);
    }
  }, [items, pendingJump, setSelectedIndex]);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  useEffect(() => {
    if (selectedIndex !== null) {
      // Проверяем индекс, а не строку
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Опционально: возвращаем скролл при размонтировании компонента
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'Escape') closeModal();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex]);

  const rowHeight = 420;
  const margin = 8;

  // Рассчитываем сетку на основе реальных aspectRatio
  const rows = useJustifiedLayout(images, containerWidth, rowHeight, margin);

  if (containerWidth === 0) {
    return (
      <div ref={containerRef} className="w-full px-8">
        <div className="flex flex-wrap gap-2 animate-pulse">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-50 rounded-xl w-[100%] h-[450px] sm:w-[calc((100%-8px)/2)] sm:h-[351px] lg:w-[calc((100%-16px)/3)] lg:h-[410px]"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full px-8">
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="flex mb-2"
          style={{ gap: `${margin}px` }}
        >
          {row.map((img, colIndex) => {
            const item = items[img.originalIndex];
            const p = getCard(item);

            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className="group relative bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all rounded-xl overflow-hidden flex flex-col"
                style={{ width: img.width, height: img.height + 70 }}
              >
                {/* Изображение */}
                <div
                  className="relative cursor-pointer overflow-hidden"
                  style={{ width: img.width, height: img.height }}
                  onClick={() => openModal(img.originalIndex)}
                >
                  <Image
                    src={img.src}
                    alt={p.text}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized // Важно, если работаешь с локальными файлами в public во время разработки
                  />
                </div>

                {/* Подпись */}
                <div className="flex-1 p-3 flex items-center">
                  {renderCardContent(item)}
                </div>
              </div>
            );
          })}
        </div>
      ))}

      {/* Modal Lightbox */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-md p-4 cursor-zoom-out animate-in fade-in duration-300"
          onClick={closeModal}
        >
          {/* Кнопка Закрыть */}
          <button
            className="absolute top-6 right-6 z-[120] p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all"
            onClick={closeModal}
            title="Закрыть (Esc)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          {/* Кнопка "Назад" */}
          <button
            className="absolute left-4 z-[110] p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all"
            onClick={showPrev}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          <div
            className="relative w-full h-full max-w-6xl flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[selectedIndex]?.src}
              alt="Persik photo"
              fill
              className="object-contain transition-all duration-300"
              unoptimized
            />
          </div>

          {/* Кнопка "Вперед" */}
          <button
            className="absolute right-4 z-[110] p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all"
            onClick={showNext}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>

          {/* Счётчик */}
          <div className="absolute bottom-6 text-white/50 text-sm font-mono">
            {selectedIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </div>
  );
}
