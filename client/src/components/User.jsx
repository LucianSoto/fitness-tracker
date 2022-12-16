import {useEffect, useRef, useState} from 'react'
import { useParams } from 'react-router-dom'

const Home = () => {
  const mounted = useRef(false)
  const params = useParams()

  const [userData, setUserData] = useState([])
  const [form, setForm] = useState({
    exercise: '',
    duration: 0,
    id: params.user,
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


  const onSubmit = async (e, form) => {
    e.preventDefault()
    console.log(form, 'form')
    //find by id and add exercise
    const res = await fetch(`http://localhost:9000/add_exercise/${params.user}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form)
    })
    // console.log(res.json())
    const data = await res.json()
    console.log(data.data, 'added')
    setUserData(prevState => (
      data.data
    ))
  }

  const onChange = (e) => {
    setForm(prevState => ({
      ...prevState,
      [e.name] : e.value
    }))
  }

  const editExercise =(e) => {
    console.log(e._id, 'editing')
  }

  const deleteExercise = async (e) => {
    e.preventDefault()
    const {id} = e.target
    const requestBody = { id: id }
    if(window.confirm(`delete ${e.target.name}`)) {
      const res = await fetch(`http://localhost:9000/delete/${params.user}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody)
      })
      const data = await res.json()
      console.log(data)
      // setUserData(prevState => ())
    } else {
      return null
    }
  }

  // console.log(userData)

  /// if you pass e.target  you cannot call e.preventDefault()
  return (
    <div>
      <p className="user-name">Welcome~! {userData.user_name}</p>
      {/* <button className="add-exercise">
        Add Exercise
      </button> */}
      <form action="submit" className="exercise-form" onSubmit={(e) => onSubmit(e, form)}>
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
        <button type='submit'>Add</button>
      </form>

      <div className="exercise-table">
        <div className="table-headers">
          <div className="table-labels">Exercise</div>
          <div className="table-labels">Duration</div>
          <div className="table-labels">Options</div>
        </div>

        <div className="table">
          {userData.exercises && 
            userData.exercises.map((exr, i) => (
              <div key={i}>
                <p>{exr.x_name}</p>
                <p>{exr.duration}</p>
                <button className="edit-delete" onClick={(e)=> editExercise(e.target)}>edit</button>
                <button id={exr._id} duration={exr.duration} name={exr.x_name} className='edit-delete' onClick={(e)=> deleteExercise(e)}>delete</button>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}


export default Home
