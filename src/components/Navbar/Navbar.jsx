import Logo from '../../assets/img/logo.png'
import './Navbar.css'

import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { Context } from '../../context/UserContext'

const Navbar = () => {
    const { authenticated, logout } = useContext(Context)

    return (
        <nav className='navbar'>
            <div className='navbar-logo'>
                <img src={Logo} alt="Get A Pet" />
                <h2>Get A Pet</h2>
            </div>
            <ul>
                <li><Link to={"/"}>Adotar</Link></li>
                {
                    authenticated ? (
                        <>
                            <li onClick={logout} >Sair</li>
                        </>
                    ) : (
                        <>
                            <li><Link to={"/login"}>Entrar</Link></li>
                            <li><Link to={"/register"}>Cadastrar</Link></li>
                        </>
                    )
                }
            </ul>
        </nav>
    )
}

export default Navbar