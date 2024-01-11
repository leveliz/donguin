import Item from './Item';
import '../css/Transaction.css';


const Transaction = (props) => {
    const {items} = props
    return (
       <>
        <ul className='item-list'>
          {items.map((element) => {
              return <Item key={element.id} {...element}/>
            })}
        </ul>
       </>
    )
}

export default Transaction;