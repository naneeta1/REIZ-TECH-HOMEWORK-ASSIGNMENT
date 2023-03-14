import React from 'react' ;
import './Pagination.css';

const Pagination = ({totalCountries,setCurrentPage}) => {
    
    let pages = []; 
    for(let i=1; i <= totalCountries; i++){
        pages.push(i)
    }
  return (
    <div className="pagination-container">
    {pages.map((page,index)=>(
      <button key={index} className="pagination-button" onClick={()=>setCurrentPage(page)}>{page}</button>
    ))}
  </div>
  )
}

export default Pagination;