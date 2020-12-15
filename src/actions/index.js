import axios from 'axios';
// import { statement } from '../data'
import _ from 'lodash'

export const getTransactionData = async () => {
  try {
    let { data } = await axios.get('https://us-central1-potatotalkies-1111.cloudfunctions.net/transactions')
    return generateList(data.data)
  } catch (error) {
    console.log(error)
    return ({ data: [], balance: { amount: 0 } })
  }

}

const generateList = (statement) => {
  let newArr = []
  let balanceArr = []

  statement.forEach(({ transactions, balances }) => {
    balances.forEach((val) => {
      balanceArr.push(val)
    })
    transactions.forEach((val) => {
      newArr.push(val)
    })
  }
  )
  return { data: _.reverse(newArr), balance: _.maxBy(balanceArr, 'date') }
}
