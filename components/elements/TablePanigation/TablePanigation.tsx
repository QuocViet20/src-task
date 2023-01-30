/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/button-has-type */
/* eslint-disable no-empty-pattern */

// libarary
import { memo, useMemo } from "react";

// types
import { PanigationProps } from "src/types";

// component

// styles
import { Pagination } from "react-bootstrap";
import { createArrayFromLength } from "src/utils/array";
import { Link } from "react-router-dom";

const TablePanigation = memo(
  ({ currentPage, totalPages, onPageChange }: PanigationProps) => {
    const pages = useMemo(() => {
      return createArrayFromLength(totalPages, true);
    }, [totalPages]);
    const onFirstClick = () => {
      onPageChange(1);
    };

    const onPrevClick = () => {
      onPageChange(currentPage - 1);
    };

    const onNextClick = () => {
      onPageChange(currentPage + 1);
    };

    const onLastClick = () => {
      onPageChange(totalPages);
    };

    return (
      <Pagination>
        <Pagination.First disabled={currentPage === 1} onClick={onFirstClick} />
        <Pagination.Prev disabled={currentPage === 1} onClick={onPrevClick} />
        {pages.map((pageNumber) => {
          return (
            <Link
              to={`/tasks?page=${pageNumber}`}
              className="text-decoration-none"
            >
              <Pagination.Item
                active={currentPage === pageNumber}
                onClick={() => {
                  onPageChange(pageNumber);
                }}
              >
                {pageNumber}
              </Pagination.Item>
            </Link>
          );
        })}
        <Pagination.Next
          disabled={currentPage === totalPages}
          onClick={onNextClick}
        />
        <Pagination.Last
          disabled={currentPage === totalPages}
          onClick={onLastClick}
        />
      </Pagination>
    );
  },
);

export default TablePanigation;
