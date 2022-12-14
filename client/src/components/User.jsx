import {useEffect, useRef, useState} from 'react'
import { useParams } from 'react-router-dom'

const Home = () => {
  const mounted = useRef(false)
  const params = useParams()

  console.log(params.user)
  const [userData, setUserData] = useState([])
  const [form, setForm] = useState({
    exercise: '',
    duration: 0,
  })

  useEffect(() => {
    if(mounted.current === false) {
      fetchUser()
      mounted.current = true
    }
  }, [])

  const fetchUser = async () => {
    // const res = await 
    const res = await fetch(`http://localhost:9000/user/${params.user}`)
    const data = await res.json()
    setUserData(data.data)
  }

  const onSubmit = async (form) => {
    //find by id and add exercise
    const res = await fetch('')
  }

  const onChange = (e) => {
    setForm(prevState => ({
      ...prevState,
      [e.name] : e.value
    }))
  }

  console.log(userData)
  return (
    <div>
      <p className="user-name">Welcome~! {userData.user_name}</p>
      {/* <button className="add-exercise">
        Add Exercise
      </button> */}
      <form action="submit" className="exercise-form">
        {/* <button className="close">X</button> */}
        <h3>Add an exercise!</h3>
        <label htmlFor="exercise" className="label">Exercise</label>
        <input 
          type="text" 
          name='exercise'
          onChange={(e)=> onChange(e.target)}
          value={form.exercise}
        />
        <br />
        <label htmlFor="duration" className="label">Duration</label>
        <input 
          type="text" 
          name="duration"
          onChange={(e)=> onChange(e.target)}
          value={form.duration}
        />
        <button type='submit'>Submit</button>
      </form>

      <div className="exercise-table">
        <div className="table-headers">
          <div className="table-labels">Exercise</div>
          <div className="table-labels">Duration</div>
          <div className="table-labels">Options</div>
        </div>

        <div className="table">

        </div>
      </div>
    </div>
  )
}


export default Home
