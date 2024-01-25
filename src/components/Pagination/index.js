import './index.css'

const Pagination = ({onClickNextBtn, onClickPreviousBtn, pageNumber}) => (
  <div className="pagination-control-buttons-container">
    <button
      type="button"
      className="pagination-control-button"
      onClick={onClickPreviousBtn}
    >
      Prev
    </button>
    <p className="page-number">{pageNumber}</p>
    <button
      type="button"
      className="pagination-control-button"
      onClick={onClickNextBtn}
    >
      Next
    </button>
  </div>
)
export default Pagination
