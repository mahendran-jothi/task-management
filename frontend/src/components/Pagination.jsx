const Pagination = ({ page, totalPages, onPrevious, onNext, onPageSelect }) => (
  <div className="d-flex justify-content-end align-items-center mt-3">
    <nav>
      <ul className="pagination mb-0">
        <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
          <button className="page-link" onClick={onPrevious}>
            Previous
          </button>
        </li>
        {[...Array(totalPages)].map((_, index) => {
          const pageNumber = index + 1;
          return (
            <li
              key={pageNumber}
              className={`page-item ${page === pageNumber ? "active" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => onPageSelect(pageNumber)}
              >
                {pageNumber}
              </button>
            </li>
          );
        })}
        <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
          <button className="page-link" onClick={onNext}>
            Next
          </button>
        </li>
      </ul>
    </nav>
  </div>
);

export default Pagination;
