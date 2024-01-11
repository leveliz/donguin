import './App.css';
import Transaction from './components/Transaction';
import FormComponent from './components/FormComponent';
import { useState, useEffect } from 'react';
import DataContext from './data/DataContext';
import ReportComponent from './components/ReportComponent';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {

  const [items, setItems] = useState([])
  const [reportIcome, setReportIncome] = useState(0)
  const [reportExpense, setReportExpense] = useState(0)
  const onAddNewItem = (newItem) => {
    setItems((prevItem) => {
      return [newItem, ...prevItem]
    })
  }
  useEffect(() => {
    const amounts = items.map((element) => element.amount)
    const income = amounts.filter((element) => element > 0).reduce((total, element) => total += element, 0)
    const expense = (amounts.filter((element) => element < 0).reduce((total, element) => total += element, 0)) * -1
    setReportIncome(income.toFixed(2))
    setReportExpense(expense.toFixed(2))
  }, [items, reportIcome, reportExpense])

  //reduce state
    // const [showReport, setShowReport] = useState(false)
    // const reducer = (state, action) => {
    //   switch (action.type) {
    //     case 'SHOW':
    //       return setShowReport(true)
    //     case 'HIDE':
    //       return setShowReport(false)
    //   }
    // }
    // const [result, dispatch] = useReducer(reducer, showReport)
  return (
    <DataContext.Provider value={
      {
        income: reportIcome,
        expense: reportExpense,
      }
    }>
      <div className='container'>
        <h1 style={{ color: "red", textAlign: "center", fontSize: "1.5rem" }}>แอพบัญชีรายรับ - รายจ่าย</h1>
        <Router>
          <div>
            <ul className='horizontal-menu'>
              <li>
                <Link to="/">ข้อมูลบัญชี</Link>
              </li>
              <li>
                <Link to="/insert">บันทึกข้อมูล</Link>
              </li>
            </ul>
            <Routes>
              <Route path="/" element={<ReportComponent />} />
              <Route
                path="/insert"
                element={
                  <>
                    <FormComponent onAddItem={onAddNewItem} />
                    <Transaction items={items} />
                  </>
                }
              />
            </Routes>
          </div>
        </Router>

        {/* <button onClick={() => dispatch({ type: "SHOW"})}>แสดง</button>
        <button onClick={() => dispatch({ type: "HIDE"})}>ซ่อน</button> */}
      </div>
    </DataContext.Provider>

  );

}

export default App;
