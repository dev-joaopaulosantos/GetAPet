import './Register.css'
import '../../components/Form/Form.css'

import { useContext, useState } from 'react'
import Input from '../../components/Form/Input'
import { Link } from 'react-router-dom'

// contexts
import { Context } from '../../context/UserContext'

const Register = () => {
  const [user, setUser] = useState({})
  const { register } = useContext(Context)

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    register(user)
  }

  return (
    <section className='form-container'>
      <h1>Registrar</h1>
      <form onSubmit={handleSubmit}>
        <Input text="Nome" type="text" name="name" placeholder="Digite seu nome" handleOnChange={handleChange} />
        <Input text="Telefone" type="text" name="phone" placeholder="Digite seu telefone" handleOnChange={handleChange} />
        <Input text="E-mail" type="email" name="email" placeholder="Digite seu e-mail" handleOnChange={handleChange} />
        <Input text="Senha" type="password" name="password" placeholder="Digite sua senha" handleOnChange={handleChange} />
        <Input text="Confirmação de senha" type="password" name="confirmpassword" placeholder="Confirme a sua senha" handleOnChange={handleChange} />
        <input type="submit" value="Cadastrar" />
        <p>
          Já tem conta? <Link to='/login'>Clique aqui.</Link>
        </p>
      </form>
    </section>
  )
}

export default Register