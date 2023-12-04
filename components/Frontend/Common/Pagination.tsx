import 'bootstrap/dist/css/bootstrap.css';
const Pagination = ({ items, pageSize, onPageChange }: any) => {
  const pagesCount = Math.ceil(items / pageSize); // 100/10
  if (pagesCount === 1) return null;
  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);
  return (
    <div>
      <nav aria-label="Page navigation example" className="float-end">  
          <ul className="pagination">
            {pages.map((page) => (
              <li key={page}
                className="page-item" >
                <a className="page-link" onClick={() => onPageChange(page)}>
                  {page}
                </a>
              </li>
            ))}
            
          </ul>
      </nav>
    </div>
  );
};
export default Pagination;