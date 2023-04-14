import './Home.css'
import api from '../../utils/api'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'


const Home = () => {
   const [pets, setPets] = useState([])

   useEffect(() => {

      api.get('/pets').then((response) => {
         setPets(response.data.pets)
      })

   }, [])

   return (
      <section className='home'>
         <div className='pet-home-header'>
            <h1>Adote um Pet</h1>
            <p>Veja os detalhes de cada um e conheça o tutor deles</p>
         </div>
         <div className='pet-container'>
            {pets.length > 0 && (
               pets.map((pet) => (
                  <div className='pet-card'>
                     <div className='pet-card-image' style={{backgroundImage: `url(${import.meta.env.VITE_BASE_URL}/images/pets/${pet.images[0]})`}}></div>
                     <h3>{pet.name}</h3>
                     <p><span className='bold'>Peso:</span>{pet.weigth}kg</p>
                     {pet.available ? <Link to={`pet/${pet._id}`}>Mais detalhes</Link> : <p className='adopted-text'>Adotado</p>}
                  </div>
               ))
            )}
            {pets.length === 0 && (
               <p>Não há pets cadastrados ou disponíveis para adoção no momento</p>
            )}
         </div>
      </section>
   )
}

export default Home