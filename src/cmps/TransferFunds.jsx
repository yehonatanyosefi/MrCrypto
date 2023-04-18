import React, { useState } from 'react'
import { SvgIcon } from './SvgIcon.jsx'

export function TransferFunds({ maxCoins, onTransferCoins }) {
  const [amount, setAmount] = useState('')

  function handleTransfer(ev) {
    ev.preventDefault()
    const value = +amount
    if (value > maxCoins) return alert('Not enough coins')
    onTransferCoins(value)
    setAmount('')
  }

  function handleAmountChange(ev) {
    setAmount(ev.target.value)
  }

  return (
    <form className="transfer-funds" onSubmit={handleTransfer}>
      {/* <label htmlFor="amount">Transfer Coins</label> */}
      <input
        type="number"
        name="amount"
        id="amount"
        min="1"
        max={maxCoins}
        value={amount}
        onChange={handleAmountChange}
      />
      <button type="submit">Transfer<SvgIcon iconName="dollar" /></button>
    </form>
  )
}
