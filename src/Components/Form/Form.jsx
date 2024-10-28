import React, { useState, useEffect } from 'react'
import './Form.css'
import FormDisplay from './FormDisplay';


const AllTransactions = localStorage.getItem('details')
  ? JSON.parse(localStorage.getItem('details')) : [];

const Form = ({update}) => {
    const [data, setData] = useState({type: "", amount: "", category: "", date: "", message: ""});
    const [details, setDetails] = useState(AllTransactions);
    const [change, setChange] = useState({});
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if(change.type && change.amount){
            localStorage.setItem('details', JSON.stringify(change))
        }else{
            localStorage.setItem('details', JSON.stringify(details))
        }
      }, [details, change]);


    const handleChange = (event)=>{
        if(change.type && change.amount){
            setChange((prev)=>({...prev, [event.target.name]: event.target.value}));
        }else{
            setData((prev)=>({...prev, [event.target.name]: event.target.value}));;
        }
    };

    const handleSubmit = (event)=>{
        event.preventDefault();
        if(change.type && change.amount){
            const {category, amount, date, type, message} = change;
            details.splice(index, 1, {category, amount, date, type, message});
            sum(details);
            setChange({});
        }else{
            const {category, amount, date, type, message} = data;    
            setDetails(prev=> [...prev, {category, amount, date, type, message}]);
            sum(details);
            setData({type: "",amount: "", category: "", date: "", message: ""});
        } 
    }

    const sum =(details)=>{
        let incomeArr = details.filter((item)=> item.type=== "income");
        let netIncome = incomeArr.reduce((accumulator, currentValue) => {
            return (accumulator += parseInt(currentValue.amount))}, 0)

        let expenseArr = details.filter((item)=> item.type=== "expense");
        let netExpense = expenseArr.reduce((accumulator, currentValue) => {
            return (accumulator += parseInt(currentValue.amount))}, 0)

        update(netIncome, netExpense);
    }

    const handleRemove = (date, amount)=>{
        const newDetails = details.filter((obj)=> obj.amount != amount && obj.date != date);
        setDetails(newDetails);

        if(newDetails.length == 0){
            update();
        }
    }

    const handleUpdate = (item)=>{
        setChange(item);
        const index = details.findIndex((obj)=> obj.name === item.name && obj.amount === item.amount);
        setIndex(index);
    }
    
    
  return (
    <>
    <FormDisplay handleChange={handleChange} handleRemove={handleRemove} handleSubmit={handleSubmit} 
    handleUpdate={handleUpdate} change={change} data={data} details={details}/>
    </>
  )
}

export default Form;