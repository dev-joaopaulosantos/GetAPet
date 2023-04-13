import React, { useEffect, useState } from 'react'
import './Profile.css'
import '../../components/Form/Form.css'

import api from '../../utils/api'
import Input from '../../components/Form/Input'
import useFlashMessage from '../../hooks/useFlashMessage'
import RoundedImage from '../../components/RoundedImage/RoundedImage'

const Profile = () => {
    const [user, setUser] = useState({})
    const [preview, setPreview] = useState()
    const [token] = useState(localStorage.getItem('token') || '')
    const { setFlashMessage } = useFlashMessage()

    useEffect(() => {
        api.get('/users/checkuser', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            setUser(response.data)
        })
    }, [token])

    const onFileChange = (e) => {
        setPreview(e.target.files[0])
        setUser({ ...user, [e.target.name]: e.target.files[0] })
    }

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })

    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        let msgType = 'success'

        const formData = new FormData()

        await Object.keys(user).forEach((key) => {
            formData.append(key, user[key])
        })

        const data = await api.patch(`/users/edit/${user._id}`, formData, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            return response.data

        }).catch((err) => {
            msgType = 'error'
            return err.response.data

        })

        setFlashMessage(data.message, msgType)

    }

    return (
        <section>
            <div className='profile-header'>
                <h1>Perfil</h1>
                {(user.image || preview) && (
                    <RoundedImage src={preview ? URL.createObjectURL(preview) : `${import.meta.env.VITE_BASE_URL}images/users/${user.image}`} alt={user.name} />
                )}
            </div>
            <form onSubmit={handleSubmit} className='form-container'>
                <Input text="Imagem" type="file" name="image" handleOnChange={onFileChange} />
                <Input text="E-mail" type="email" name="email" placeholder="Digite o seu email" handleOnChange={handleChange} value={user.email || ''} />
                <Input text="Nome" type="text" name="name" placeholder="Digite o seu nome" handleOnChange={handleChange} value={user.name || ''} />
                <Input text="Telefone" type="text" name="phone" placeholder="Digite o seu telefone" handleOnChange={handleChange} value={user.phone || ''} />
                <Input text="Senha" type="password" name="password" placeholder="Digite a sua senha" handleOnChange={handleChange} />
                <Input text="Confirmação de senha" type="password" name="confirmpassword" placeholder="Confirme sua senha" handleOnChange={handleChange} />
                <input type="submit" value="Salvar" />
            </form>
        </section>
    )
}

export default Profile