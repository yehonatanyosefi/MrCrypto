export function TransferFunds({ maxCoins, onTransferCoins }) {
  
  function handleTransfer(ev) {
    ev.preventDefault()
    const form = ev.currentTarget.form
    const amount = form.elements.amount
    const value = +amount.value
    if (value > maxCoins) return alert("Not enough coins")
    onTransferCoins(value)
    amount.value = ""
  }

  return (
    <form className="transfer-funds">
      <label htmlFor="amount">Transfer Coins</label>
      <input
        type="number"
        name="amount"
        id="amount"
        min="1"
        max={maxCoins}
      />
      <button onClick={handleTransfer}>Transfer</button>
    </form>
  )
}
