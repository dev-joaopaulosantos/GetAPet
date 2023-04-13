import './AddPet.css'
import api from '../../utils/api'
import { useNavigate } from 'react-router-dom'
import PetForm from '../../components/Form/PetForm'

// Custom hooks
import useFlashMessage from '../../hooks/useFlashMessage'
import { useState } from 'react'

const AddPet = () => {
    const [token] = useState(localStorage.getItem('token') || '')
    const { setFlashMessage } = useFlashMessage()
    const navigateTo = useNavigate()

    const registerPet = async (pet) => {
        let msgType = 'success'

        const formData = new FormData()

        Object.keys(pet).forEach((key) => {
            if (key === 'images') {
                for (let i = 0; i < pet[key].length; i++) {
                    formData.append('images', pet[key][i])
                }

            } else {
                formData.append(key, pet[key])
            }
        })

        const data = await api.post('pets/create', formData, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
                'Content-Type': 'multipart/form-data',
            },
        }).then((response) => {
            return response.data

        }).catch((err) => {
            msgType = 'error'
            return err.response.data
        });

        setFlashMessage(data.message, msgType)
        if (msgType !== 'error') {
            navigateTo('/pet/mypets')
        }
    }

    return (
        <section>
            <div className='addpet-header'>
                <h1>Cadastre um Pet</h1>
                <p>Depois ele ficará disponível para adoção</p>
            </div>
            <PetForm handleSubmit={registerPet} btnText='Cadastrar Pet' />
        </section>
    )
}

export default AddPet