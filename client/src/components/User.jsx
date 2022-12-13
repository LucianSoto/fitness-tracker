import {useEffect, useRef, useState} from 'react'
import { useParams } from 'react-router-dom'

const Home = () => {
  const mounted = useRef(false)
  const params = useParams()

  console.log(params.user)
  const [userData, setUserData] = useState([])

  useEffect(() => {
    if(mounted.current === false) {
      fetchUser()
      mounted.current = true
    }
  }, [])

  const fetchUser = async () => {
    // const res = await 
    const res = await fetch(`http://localhost:9000/home/${params.user}`)
    const data = await res.json()

    console.log(data)
  }
  return (
    <div>
      
    </div>
  )
}


export default Home
