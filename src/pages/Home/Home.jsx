import './Home.css'
import api from '../../utils/api'
import {Link} from 'react-router-dom'
import { useEffect, useState } from 'react'


const Home = () => {
  const [pets, setPets] = useState([])

  useEffect(() => {

    api.get('/pets').then((response) => {
      setPets(response.data.pets)
      console.log(pets)
    })
    
  }, [])

  return (
    <div className='home'>
      <h1>Home</h1>
    </div>
  )
}

export default Home