import React from 'react'
import { TransactionDetails } from './TransactionDetails'
import { getTransactionData } from '../actions'
import './Transaction.css';
import _ from 'lodash'

export const Transaction = ({ name, debit_credit, amount, date, description, iban }) => {
  const [list, setList] = React.useState(null)
  const [bal, setBal] = React.useState(0)
  const [dateFilter, setDateFilter] = React.useState('desc')
  const [amountFilter, setAmountFilter] = React.useState(null)
  const [filter, setFilter] = React.useState('all')

  React.useEffect(() => {

    const fetchData = async () => {
      if (!list) {
        let { data, balance } = await getTransactionData()
        console.log(data, balance)
        setBal(balance.amount)
        setList(data)
      }
    }
    fetchData()
  }, [list])

  const changeFilter = (type) => {
    if (type === 'date') {
      let filter = dateFilter === 'asc' || !dateFilter ? 'desc' : 'asc'
      setDateFilter(filter)
      setAmountFilter(null)
      setList(_.orderBy(list, 'date', filter))

    }
    else if (type === 'amount') {
      let filter = amountFilter === 'asc' || !amountFilter ? 'desc' : 'asc'
      setAmountFilter(filter)
      setDateFilter(null)
      setList(_.orderBy(list, 'amount', filter))
    }
  }

  const filterList = (event) => {
    setFilter(event.target.value)
  }


  return (
    <div className="TransactionCont">
      {!list && <div>Loading...</div>}
      {list && (<div >
        <div className="Head">Total Amount : {bal}</div>
        <div>
          <label htmlFor="debit/credit">Choose Transaction type </label>
          <select id="debit/credit" name="debit/credit" onChange={filterList}>
            <option default value="all">All Transactions</option>
            <option value="debit">Debit</option>
            <option value="credit">Credit</option>
          </select>
        </div>
        <div className="List">
          <div className="ui grid">
            <div className="three column row">
              <div className=" column"><button className="Button" onClick={() => changeFilter('date')}><b>Date </b>{!dateFilter ? ' ' : dateFilter === "desc" ? '↓' : '↑'}</button></div>
              <div className=" column"><b>Transaction</b></div>
              <div className=" column"><button className="Button" onClick={() => changeFilter('amount')}><b>Amount </b>{!amountFilter ? ' ' : amountFilter === "desc" ? '↓' : '↑'}</button></div>
            </div>
          </div>
          {list.map((val, index) => {
            return (val.debit_credit === filter || filter === 'all') && <TransactionDetails key={index.toString() + 'aa'} {...val} />
          })}</div>
      </div>)}</div>)



}