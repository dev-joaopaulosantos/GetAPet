import './PetDetails.css'
import api from '../../utils/api'
import { useParams, Link } from 'react-router-dom'
import useFlashMessage from '../../hooks/useFlashMessage'
import { useEffect, useState } from 'react'


const PetDetails = () => {
    const [pet, setPet] = useState({})
    const { id } = useParams()
    const { setFlashMessage } = useFlashMessage()
    const [token] = useState(localStorage.getItem('token') || '')

    useEffect(() => {
        api.get(`/pets/${id}`).then((response) => {
            setPet(response.data.pet)
        })
    }, [id])

    const schedule = async () => {
        let msgType = 'success'
        const data = await api.patch(`pets/schedule/${pet._id}`, {
            Authorization: `Bearer ${JSON.parse(token)}`
        }).then((response) => {
            return response.data

        }).catch((err) => {
            msgType = 'error'
            return err.response.data
        });

        setFlashMessage(data.message, msgType)
    }

    return (
        <>
            {pet.name && (
                <section className='pet-details-container'>
                    <div className='pet-details-header'>
                        <h1>Conhecendo o Pet: {pet.name}</h1>
                        <p>Se tiver interesse, marque uma visita para conhece-lo</p>
                    </div>
                    <div className='pet-images'>
                        {pet.images.map((image, index) => (
                            <img key={index} src={`${import.meta.env.VITE_BASE_URL}/images/pets/${image}`} alt={pet.name} />
                        ))}
                    </div>
                    <p><span className='bold'>Peso: </span>{pet.weigth}kg</p>
                    <p><span className='bold'>Idade: </span>{pet.age} anos</p>
                    {token ? (
                        <button onClick={schedule}>Solicitar uma visita</button>
                    ) : (
                        <p>Você precisa <Link to={'/register'}>criar uma conta</Link> para solicitar a visita</p>
                    )}
                </section>
            )}
        </>
    )
}

export default PetDetails