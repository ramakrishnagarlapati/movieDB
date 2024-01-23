import {MdNavigateNext} from 'react-icons/md'
import {GrFormPrevious} from 'react-icons/gr'

import './index.css'

const Pagination = ({onClickNextBtn, onClickPreviousBtn, pageNumber}) => (
  <div className="pagination-control-buttons-container">
    <button
      type="button"
      className="pagination-control-button"
      onClick={onClickPreviousBtn}
      disabled={pageNumber === 1}
    >
      <GrFormPrevious />
      <span className="btn-text">Previous</span>
    </button>
    <button
      type="button"
      className="pagination-control-button"
      onClick={onClickNextBtn}
    >
      <span className="btn-text">Next</span>
      <MdNavigateNext />
    </button>
  </div>
)
export default Pagination
