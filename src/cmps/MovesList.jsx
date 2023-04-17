
export function MovesList({ children, ...restOfProps }) {
     const {title, number} = restOfProps
  return (
     <div className="move-list">
          <h2>{title} last {number} move{number>1 && 's'}</h2>
          <ul className='clean-list'>
               {children}
          </ul>
     </div>
  )
}
