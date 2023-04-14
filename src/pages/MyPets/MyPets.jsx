import './MyPets.css'
import '../DashboardGlobal.css'
import api from '../../utils/api'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import RoundedImage from '../../components/RoundedImage/RoundedImage'
import useFlashMessage from '../../hooks/useFlashMessage'

const MyPets = () => {
    const [pets, setPets] = useState([])
    const [token] = useState(localStorage.getItem('token') || '')
    const { setFlashMessage } = useFlashMessage()

    useEffect(() => {
        api.get('/pets/mypets', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            setPets(response.data.pets)
        })
    }, [token])

    const removePet = async (id) => {
        let msgType = 'success'

        const data = await api.delete(`/pets/${id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            const updatedPets = pets.filter((pet) => pet._id !== id)
            setPets(updatedPets)
            return response.data

        }).catch((err) => {
            msgType = 'error'
            return err.response.data
        });

        setFlashMessage(data.message, msgType)
    }

    return (
        <section>
            <div className='petlist-header'>
                <h1>MyPets</h1>
                <Link to='/pet/add' >Cadastrar Pet</Link>
            </div>
            <div className='petlist-container'>
                {pets.length > 0 &&
                    pets.map((pet) => (
                        <div className='petlist-row' key={pet._id}>
                            <RoundedImage src={`${import.meta.env.VITE_BASE_URL}/images/pets/${pet.images[0]}`} alt={pet.name} width='px75' />
                            <span className='bold'>{pet.name}</span>
                            <div className='actions'>
                                {pet.available ? (
                                    <>
                                        {pet.adopter && (
                                            <button className='conclude-btn'>Concluir adoção</button>
                                        )}
                                        <Link to={`/pet/edit/${pet._id}`}>Editar</Link>
                                        <button onClick={() => { removePet(pet._id) }}>Excluir</button>
                                    </>
                                ) : (
                                    <p>Pet já adotado</p>
                                )}
                            </div>
                        </div>
                    ))
                }
                {pets.length === 0 && <p>Não há Pets Cadastrados</p>}
            </div>
        </section>
    )
}

export default MyPets