import './EditPet.css'
import api from '../../utils/api'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import RoundedImage from '../../components/RoundedImage/RoundedImage'
import useFlashMessage from '../../hooks/useFlashMessage'
import PetForm from '../../components/Form/PetForm'

const EditPet = () => {
    const [pet, setPet] = useState({})
    const [token] = useState(localStorage.getItem('token') || '')
    const { setFlashMessage } = useFlashMessage()
    const { id } = useParams()

    useEffect(() => {

        api.get(`/pets/${id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            setPet(response.data.pet)
        })

    }, [token, id])

    const updatePet = async (pet) => {
        let msgType = 'success'

        const formData = new FormData()

        await Object.keys(pet).forEach((key) => {
            if (key === 'images') {
                for (let i = 0; i < pet[key].length; i++) {
                    formData.append('images', pet[key][i])
                }
            } else {
                formData.append(key, pet[key])
            }
        })

        const data = await api.patch(`pets/${pet._id}`, formData, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {

            return response.data

        }).catch((err) => {

            msgType = 'error'
            return err.response.data

        });

        setFlashMessage(data.message, msgType)
    }

    return (
        <section>
            <div className="addpet-header">
                <h1>Editando o Pet: {pet.name}</h1>
                <p>Depois da edição os dados erão atualizados no sistema</p>
            </div>
            {pet.name && (
                <PetForm handleSubmit={updatePet} btnText='Atualizar' petData={pet} />
            )}
        </section>
    )
}

export default EditPet