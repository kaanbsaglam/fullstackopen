
const Total = ({total}) => {
    return (
      <p><b>total of {total} exercises</b></p>
    )
  }
  
  
  const Header = ({header}) => {
  
    return (
      <h2>
        {header}
      </h2>
    )
  }
  
  const Content = ({parts}) => {
    /* console.log(parts) */
    const total = parts.reduce((s,p) => s+p.exercises,0) // s is accumulator, p is the items in the array, 0 is initial value
    return (
      <p>
  
        {parts.map(part => 
          <Part key={part.id} part={part}></Part>
        )}
  
      <Total total={total}/>
      </p>
    )
  }
  
  const Part = ({part}) => {
    return (
      <p>
        {part.name} {part.exercises}
      </p>
    )
  
  }
  
  
  
  
  const Course = ({course}) => {
  
    
  
    return (
      
      <div>
        <Header header={course.name}></Header>
        <Content parts={course.parts}></Content>
        
      </div>
    )
}

export default Course