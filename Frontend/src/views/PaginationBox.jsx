import React from 'react'

function PaginationPageBox(props) {
    return (
        <li className='page-item'>
            <button className="page-link"  value={props.pageNo} onClick={props.handler}>{props.pageNo}</button>
        </li>
    )
}

export default PaginationPageBox