import React from 'react'
import TransactionList from '../TransactionList/TransactionList';
import IncomeExpenseChart from '../Chart/IncomeExpenseChart.jsx';


const FormDisplay = ({handleChange, handleRemove, handleSubmit, handleUpdate, change, data, details}) => {
  return (
    <>
        <form onSubmit={handleSubmit}>
            <div className='form'>
                <div>
                    <span>Type: </span>
                    <input type='radio' id='income' name='type' value='income' className='radio-button' onChange={handleChange}/>
                    <label htmlFor='income'>Income</label>
                    <input type='radio' id='expense' name='type' value='expense' className='radio-button' onChange={handleChange}/>
                    <label htmlFor='expense'>Expense</label>
                </div>
                <div>
                    <span>Amount: </span>
                    <input type="number" placeholder='&#x24;0.00' name='amount' value={change.amount ? change.amount : data.amount} className='form-input amount' onChange={handleChange} required/>
                </div>
                <div>
                    <span>Category: </span>
                    <input type="text" placeholder='category of income/expense'name='category' value={change.category ? change.category : data.category} className='form-input' onChange={handleChange} required/>
                </div>
                <div>
                    <span>Date: </span>
                    <input type="date"name='date' value={change.date ? change.date : data.date} className='form-input date' onChange={handleChange} required/>
                </div>
                <div>
                    <span>Message: </span>
                    <input type="text" placeholder='write a message' name='message' value={change.message ? change.message : data.message} className='form-input message' onChange={handleChange} required/>
                </div>
                <button type='submit' className='submit-button'>Add</button>
            </div>
        </form>
        <div className='display'>
            <TransactionList details={details} handleRemove={handleRemove} handleUpdate={handleUpdate}/>
            <IncomeExpenseChart transaction={details}/>
        </div>
    </>
  )
}

export default FormDisplay