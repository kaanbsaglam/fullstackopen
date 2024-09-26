import { useState } from 'react'



const Button = ({onClick, text}) => {
  return (
    <>
      <button onClick={onClick} >{text}</button>
    </>
  )
}

const StatisticsLine = ({category,number,postText}) => {
  return (

      <tr>
        <td>{category} </td>
        <td>{number} {postText}</td>
        </tr>

  )
}

const Statistics = (props) => {
  const all = props.good + props.neutral + props.bad
  if(all === 0){
    return (
    <div>
      <p>No feedback given</p>
    </div>
    )
  }
  else{
    return (
      <div>
        <table>
          <tbody>
        <StatisticsLine category='good' number={props.good} ></StatisticsLine>
        <StatisticsLine category='neutral' number={props.neutral} ></StatisticsLine>
        <StatisticsLine category='bad' number={props.bad} ></StatisticsLine>
        <StatisticsLine category='all' number={all} ></StatisticsLine>
        <StatisticsLine category='average' number={(props.good-props.bad)/(all)} ></StatisticsLine>
        <StatisticsLine category='positive' number={props.good*100/all} postText='%' ></StatisticsLine>
         </tbody>
        </table>
      </div>
    )
  }
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
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
      
    
    </div>
  )
}

export default App