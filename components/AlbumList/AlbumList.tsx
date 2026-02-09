'use client';
import imagesList from '@/data/imagesList';
import { useEffect, useState } from 'react';
import Pagination from '../Pagination/Pagination';
import Gallery from '../gallery/Gallery';

const AlbumList = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [currentPage]);

  useEffect(() => {
    // Скроллим вверх только если модалка ЗАКРЫТА
    if (selectedIndex === null) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }, [currentPage, selectedIndex]);

  const nbPerPage = 20;
  const pageSize = 20;
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedImagesList = imagesList.slice(
    startIndex,
    startIndex + pageSize,
  );

  const numberOfPages = Math.ceil(imagesList.length / nbPerPage);

  const handleNextPage = () => {
    if (currentPage < numberOfPages) {
      setCurrentPage((prev) => prev + 1);
      return true; // Сообщаем, что переход возможен
    }
    return false;
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      return true;
    }
    return false;
  };

  return (
    <div className="flex flex-col gap-10">
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        numberOfPages={numberOfPages}
      />

      {/* IMAGES */}
      <Gallery
        items={paginatedImagesList}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        onNextPage={handleNextPage}
        onPrevPage={handlePrevPage}
        hasNextPage={currentPage < numberOfPages}
        hasPrevPage={currentPage > 1}
        getCard={(p) => ({
          id: p.id,
          title: p.title,
          text: p.text || '',
        })}
        renderCardContent={(card) => (
          <div className="flex items-center justify-between px-1 py-1">
            <div className="flex flex-col gap-1">
              <p className="text-xs">{card.date}</p>
              <p className="text-xs font-semibold">{card.text}</p>
            </div>
          </div>
        )}
      />

      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        numberOfPages={numberOfPages}
      />
    </div>
  );
};

export default AlbumList;
