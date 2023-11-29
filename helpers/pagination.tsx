import React from "react";
import styles from "../styles/Home.module.css";
import Link from "next/link";

interface PaginationProps {
  items: any[];
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  activePage: number;
}

const Pagination = ({
  items,
  pageSize,
  onPageChange,
  activePage,
}: PaginationProps) => {
  const pagesCount = Math.ceil(items.length / pageSize);
  if (pagesCount === 1) return null;
  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);

  return (
    <div>
      <ul className={styles.pagination}>
        {pages.map((page) => (
          <li
            key={page}
            className={
              page === activePage
                ? `${styles.pageItem} ${styles.pageItemActive}`
                : styles.pageItem
            }
            onClick={() => onPageChange(page)}
          >
            <p style={{height:'7px'}} className={styles.pageLink} >{page}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
