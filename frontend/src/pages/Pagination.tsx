import React from "react";
import "../assets/css/pagination.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pageNumber = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumber.push(i);
  }

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };
  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };
  return (
    <div className="pagination-container">
      <span onClick={handlePrev}>&#8592;</span>
      {pageNumber.map((num) => (
        <span onClick={() => onPageChange(num)}>{num}</span>
      ))}
      <span onClick={handleNext}> &#8594;</span>
    </div>
  );
};

export default Pagination;
