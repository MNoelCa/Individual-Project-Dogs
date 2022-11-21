import React from "react";
import s from './Paginado.module.css';

const Paginado = ({breedPerPage, allBreeds, paginado, currentPage}) => {
    const pageNumbers = []
    for(let i=0; i<Math.ceil(allBreeds/breedPerPage); i++) {
        pageNumbers.push(i+1)
    }
    return(
        <div className={s.container}>
            {pageNumbers.length ? pageNumbers.map(number => 
            <button key={number.toString()} className={number === currentPage && s.current} onClick={()=> paginado(number)}> {number} </button>
            ): null}
        </div>
    )
};
export default Paginado;