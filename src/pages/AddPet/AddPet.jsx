import './AddPet.css'
import api from '../../utils/api'
import { useNavigate } from 'react-router-dom'
import PetForm from '../../components/Form/PetForm'

// Custom hooks
import useFlashMessage from '../../hooks/useFlashMessage'

const AddPet = () => {
    return (
        <section>
            <div className='addpet-header'>
                <h1>Cadastre um Pet</h1>
                <p>Depois ele ficará disponível para adoção</p>
            </div>
            <PetForm btnText='Cadastrar Pet' />
        </section>
    )
}

export default AddPet