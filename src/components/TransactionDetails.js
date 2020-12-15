import React from 'react'
import './Transaction.css'

export const TransactionDetails = ({ date, name, amount, debit_credit }) => {

  return (
    <div className="ui grid">
      <div className="three column row">
        <div className=" column">{date}</div>
        <div className=" column">{name}</div>
        <div className={`column ${debit_credit}`}>{amount} {debit_credit === "credit" ? "Cr" : "Dr"}</div>
      </div>
    </div>)

}
