import { useEffect, useState } from 'react'
import '../css/FormComponent.css'
import { v4 as uuidv4 } from 'uuid';

const FormComponent = (props) => {

    const [title, setTitle] = useState("")
    const [amount, setAmount] = useState(0)
    const [formValid, setFormValid] = useState(false)

    const inputTitle = (event) => {
        setTitle(event.target.value)
    }
    const inputAmount = (event) => {
        setAmount(event.target.value)
    }
    const addTransaction = (event) => {
        event.preventDefault()
        const itemdata = {
            id: uuidv4(),
            title: title,
            amount: Number(amount)
        }
        props.onAddItem(itemdata)
        setTitle("")
        setAmount(0)
        setFormValid(false)
    }

    useEffect(() => {
        const chaeckData = title.trim().length > 0 && amount !== 0
        if(chaeckData) {
            setFormValid(true)
        }
    }, [title,amount])

    return (
        <div>
            <form onSubmit={addTransaction}>
                <div className="form-control">
                    <label>ชื่อรายการ</label>
                    <input type="text" placeholder="ระบุชื่อรายการ" onChange={inputTitle} value={title}/>
                </div>
                <div className="form-control">
                    <label>จำนวนเงิน (+ รายรับ - รายจ่าย)</label>
                    <input type="number" placeholder="ระบุจำนวนเงิน" onChange={inputAmount} value={amount}/>
                </div>
                <div>
                    <button className="btn" type="submit" disabled={!formValid}>เพิ่มข้อมูล</button>
                </div>
            </form>
        </div>
    )
}

export default FormComponent