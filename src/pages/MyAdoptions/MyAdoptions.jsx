import '../DashboardGlobal.css'
import api from '../../utils/api'
import RoundedImage from '../../components/RoundedImage/RoundedImage'
import { useEffect, useState } from 'react'

const MyAdoptions = () => {
    const [pets, setPets] = useState([])
    const [token] = useState(localStorage.getItem('token'))

    useEffect(() => {
        api.get('pets/myadoptions', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            setPets(response.data.pets)
        })

    }, [token])

    return (
        <section>
            <div className='petlist-header'>
                <h1>Minhas Adoções</h1>
            </div>
            <div className='petlist-container'>
                {pets.length > 0 && (
                    pets.map((pet) => (
                        <div className='petlist-row' key={pet._id}>
                            <RoundedImage src={`${import.meta.env.VITE_BASE_URL}/images/pets/${pet.images[0]}`} alt={pet.name} width='px75' />
                            <span className='bold'>{pet.name}</span>
                            <div className='contacts'>
                                <p><span className='bold'>Ligue para:</span>{pet.user.phone}</p>
                                <p><span className='bold'>Fale com:</span>{pet.user.name}</p>
                            </div>
                            <div className='actions'>
                                {pet.available ? (
                                    <p>Adoção em processo</p>
                                ) : (
                                    <p>Parabéns por concluir a adoção</p>
                                )}
                            </div>
                        </div>
                    ))
                )}
                {pets.length === 0 && (
                    <p>Você ainda não adotou nenhum pet</p>
                )}
            </div>
        </section>
    )
}

export default MyAdoptions