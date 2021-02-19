import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const PaginationBottom = ({ numPages, pageHandler, pageIndex }) => {
  const pages = Array(numPages).fill("").map((el, index) => {

    return (
      <PaginationItem key={index} className={index === pageIndex ? 'active' : ''}>
        <PaginationLink href="#" onClick={(e) => pageHandler(index, e)}>{index + 1}</PaginationLink>
      </PaginationItem>
    );
  });

  if (numPages > 1) {
    return (
      <Pagination size="sm" className="d-flex d-sm-block justify-content-center" aria-label="page navigation">
        <PaginationItem className={pageIndex === 0 ? 'disabled' : ''}>
          <PaginationLink previous href="#" onClick={(e) => pageHandler(pageIndex - 1, e)}>
            <i className="fa fa-chevron-left" />
          </PaginationLink>
        </PaginationItem>
        {pages}
        <PaginationItem className={pageIndex === numPages - 1 ? 'disabled' : ''}>
          <PaginationLink next href="#" onClick={(e) => pageHandler(pageIndex + 1, e)}>
            <i className="fa fa-chevron-right" />
          </PaginationLink>
        </PaginationItem>
      </Pagination>
    )
  }
  return (null);
}

export default PaginationBottom;