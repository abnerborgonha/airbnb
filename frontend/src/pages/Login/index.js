import React,  {useState} from 'react';
import api from '../../services/api';

export default function Login({ history }) {
    const [email, setEmail] = useState('');

  async function handleSubmit(event){
    event.preventDefault();
    // precisamos retornar o email do campo input
    const response =  await  api.post('/sessions', {email});

    /*alimanta a variavel _id com a resposta do servidor retornando o
     data do usuario no momento em que loga
    */
    const { _id } = response.data;

    //salva o id do usuario no banco de dados do navegador
    localStorage.setItem('user', _id);

    //mandar o usario para uma rota
    history.push('/dashboard');
  }
    return (
        <>
          <p>
            Ofereça <strong>spots</strong> para programadores e encontre <strong>talentos</strong> para sua empresa
          </p>
        {/* Usando o evento onSubmit para enviar o conteudo do input para a api*/}
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">E-MAIL *</label>
          {/*Vamos setar um estado do email para cada vez que o usuario for alterar o email no campo*/}
          <input 
            type="email"
             id="email" 
             placeholder="Seu melhor e-mail"
             value={email}
             onChange={event =>setEmail(event.target.value)}
            />
          <button className="btn" type="submit">Entrar</button>
        </form>
        </>
    );
    
}