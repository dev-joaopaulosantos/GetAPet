import './MyPets.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const MyPets = () => {
    const [pets, setPets] = useState([])
    return (
        <div>
            <div>
                <h1>MyPets</h1>
                <Link to='/pet/add' >Cadastrar Pet</Link>
            </div>
            <div>
                {pets.length > 0 && <p>Meus Pets Cadastrados</p>}
                {pets.length === 0 && <p>Não há Pets Cadastrados</p>}
            </div>
        </div>
    )
}

export default MyPets