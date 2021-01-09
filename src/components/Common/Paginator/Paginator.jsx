import React, {useState} from 'react';
import PaginatorCSS from './PaginatorCSS.module.css';
import cn from "classnames";

let Paginator = ({currentPage,onPageChanged, totalItemsCount, pageSize, portionSize=25, ...props}) => {



    let pagesCount = Math.ceil(totalItemsCount / pageSize);
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
        // if (i > 10) {
        //     break;
        // }
    }

    let portionCount = Math.ceil(pagesCount/portionSize);
    const [portionNumber, setPortionNumber] = useState(1)
    let leftPortionNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionNumber = portionNumber * portionSize;


    return (

            <div className={PaginatorCSS.Page}>
                {portionNumber > 1 &&
                <button onClick={() => {setPortionNumber(portionNumber - 1) }}> prev </button>}
                {pages
                .filter(p => p >= leftPortionNumber && p <= rightPortionNumber)
                .map((p) => {
                    return <span className={cn ({[PaginatorCSS.selectPage] : currentPage === p}, 
                        PaginatorCSS.PageNumber)}
                        key={p}
                        onClick={(e) => { onPageChanged(p) }} > |{p}|</span>
                })}
                {portionCount > portionNumber &&
                <button onClick={() => {setPortionNumber(portionNumber + 1) }}> next </button>}
            </div>
)
}

export default Paginator;