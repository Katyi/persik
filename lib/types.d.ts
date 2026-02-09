declare module '*.css';

interface PaginationProps {
  items: number;
  pageSize: number;
  currentPage?: number;
  pageNumber?: number | undefined;
  onPageChange: (page: number) => void;
}

interface PaginationProps1 {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  numberOfPages: number;
}

interface Img {
  id: number;
  title: string;
  date?: string;
  text?: string;
}

interface Props {
  value: string;
  type: 'button' | 'submit' | 'reset' | undefined;
  className: string | undefined;
}
