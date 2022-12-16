import {useEffect, useRef, useState} from 'react'
import { useParams } from 'react-router-dom'
// import '../' css

const Home = () => {
  const mounted = useRef(false)
  const params = useParams()

  const [addEdit, setAddEdit] = useState([false])
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
    //find by id and add exercise
    const res = await fetch(`http://localhost:9000/add_exercise/${params.user}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form)
    })
    const data = await res.json()
    console.log(data.data, 'added')
    setUserData(prevState => (
      data.data
    ))
    setForm({
      exercise: '',
      duration: 0,
      id: params.user,
    })
  }

  const onChange = (e) => {
    setForm(prevState => ({
      ...prevState,
      [e.name] : e.value
    }))
  }

  const editExercise =(e) => {
    //change form or display text to day edit exercise
    e.preventDefault()
    const {id, name } = e.target
    // console.log(e.target.getAttribute('duration'))
    const duration = e.target.getAttribute('duration')
    setForm({
      exercise: name,
      duration: duration,
      id: id
    })
    setAddEdit(prevState => !prevState)
  }

  const submitEdit = async (e,form) => {
    e.preventDefault()
    console.log(form)

    const res = await fetch(`http://localhost:9000/edit_exercise/${params.user}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form)
    })
    const data = await res.json()
    console.log(data)
    //erase form
    // setUserData(prevState => ({
    //   ...prevState,
    //   exercises: [...data.data]
    // }))
  }

  const deleteExercise = async (e) => {
    e.preventDefault()
    const {id} = e.target
    const requestBody = { id: id }
    if(window.confirm(`delete ${e.target.name}`)) {
      //SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON  /// can also mean that the url path is wrong ei: post get or missspelled.
      const res = await fetch(`http://localhost:9000/delete/${params.user}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody)
      })
      const data = await res.json()
      setUserData(prevState => ({
        ...prevState,
        exercises: [...data.data.exercises]
      }))
    } else {
      return null
    }
  }

  // console.log(userData)

  /// if you pass e.target  you cannot call e.preventDefault()
  return (
    <div className='user-container'>
      <p className="user-name">Welcome~! {userData.user_name}</p>
      {/* <button className="add-exercise">
        Add Exercise
      </button> */}
      <form action="submit" className="exercise-form" onSubmit={(e) => {addEdit ? onSubmit(e,form) : submitEdit(e, form)}}>
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
        <br />
        <button type='submit'>{addEdit ? "Add" : "Edit"}</button>
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
              <div className='table-item' key={i}>
                <p>{exr.x_name}</p>
                <p>{exr.duration}</p>
                <div className="buttons">
                  <button id={exr._id} duration={exr.duration} name={exr.x_name} className="edit-delete" onClick={(e)=> editExercise(e)}>edit</button>
                  <button id={exr._id} duration={exr.duration} name={exr.x_name} className='edit-delete' onClick={(e)=> deleteExercise(e)}>delete</button>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}


export default Home
