

export function MovePreview({move}) {
  const {to, at, amount} = move
  function getTime(date) {
    date = new Date(date)
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const ampm = hours >= 12 ? 'pm' : 'am'
    const hours12 = hours % 12 || 12
    return `${day}/${month}/${year} ${hours12}:${minutes} ${ampm}`
  }
  return (
    <li>
      <div>To: {to}</div>
      <div>At: {getTime(at)}</div>
      <div>Amount: {amount}</div>
    </li>
  )
}
