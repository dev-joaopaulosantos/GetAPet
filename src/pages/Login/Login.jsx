import './Login.css'
import Input from '../../components/Form/Input'
import { useContext } from 'react'

// context
import { Context } from '../../context/UserContext'
import { Link } from 'react-router-dom'

const Login = () => {
  const handleChange = (e) => {

  }

  return (
    <section className='form-container'>
      <h1>Login</h1>
      <form>
        <Input text='E-mail' type='email' name='email' placeholder='Digite o seu email' handleOnChange={handleChange} />
        <Input text='Senha' type='password' name='password' placeholder='Digite a sua senha' handleOnChange={handleChange} />

        <input type='submit' value='Entrar' />
        <p>Não tem conta? <Link to='/register' >Clique aqui.</Link> </p>
      </form>
    </section>
  )
}

export default Login