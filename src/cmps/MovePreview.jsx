

export function MovePreview({move}) {
  const {to, at, amount} = move
  return (
    <li>
      <div>To: {to}</div>
      <div>At: {new Date(at).toLocaleString('en-GB')}</div>
      <div>Amount: {amount}</div>
    </li>
  )
}
