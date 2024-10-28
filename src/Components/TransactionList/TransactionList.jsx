import React from 'react'
import './TransactionList.css'

const TransactionList = ({details, handleRemove, handleUpdate}) => {
  
  return (
    <div>
      {details.length>0 && <h2 className='title'>Transactions</h2>}    
      <div className="transactions">
      {details.map((item, index)=>(
        <div className='transaction-list' key={index}>
            <span>{item.category}</span>
            <span className={item.type === "income" ? "income" : "expense"}>
            {item.type === "income" ? "+" : "-"} &#x24;{item.amount}</span>
            <span>{item.date} &nbsp;&nbsp;&nbsp;<i className="fa-regular fa-pen-to-square" onClick={()=>handleUpdate(item)}></i>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i className="fa-solid fa-trash" onClick={()=>handleRemove(item.date, item.amount)}></i></span>
        </div>
      ))}
      </div>
    </div>
  )
}

export default TransactionList;