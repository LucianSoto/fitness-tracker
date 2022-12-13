import {useEffect, useRef, useState} from 'react'
import { useParams } from 'react-router-dom'

const Home = () => {
  const mounted = useRef(false)
  const params = useParams()

  console.log(params)
  const [userData, setUserData] = useState([])

  useEffect(() => {
    if(mounted.current === false) {
      fetchUser()
      mounted.current = true
    }
  }, [])

  const fetchUser = async () => {
    // const res = await 
  }
  return (
    <div>
      
    </div>
  )
}


export default Home
