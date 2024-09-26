import { useState } from 'react'



const Button = ({onClick, text}) => {
  return (
    <>
      <button onClick={onClick} >{text}</button>
    </>
  )
}

const DisplayStats = ({category,number}) => {
  return (
    <>
      <p>{category} {number}</p>
    </>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good+1)} text='good'></Button>
      <Button onClick={() => setNeutral(neutral+1)} text='neutral'></Button>
      <Button onClick={() => setBad(bad+1)} text='bad'></Button>

      <h1>statistics</h1>
      <DisplayStats category='good' number={good}></DisplayStats>
      <DisplayStats category='neutral' number={neutral}></DisplayStats>
      <DisplayStats category='bad' number={bad}></DisplayStats>
      <DisplayStats category='all' number={good+neutral+bad}></DisplayStats>
      <DisplayStats category='average' number={(good-bad)/(good+neutral+bad) }></DisplayStats>
      <DisplayStats category='positive' number={(good)/(good+neutral+bad)*100}>%</DisplayStats>
      
    
    </div>
  )
}

export default App