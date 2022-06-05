import { FormEvent, useState } from 'react';
import Modal from 'react-modal'
import { useTransactions } from '../../hooks/useTransactions';
import closeImg from '../../assets/close.svg';
import entradaImg from '../../assets/in.svg';
import saidaImg from '../../assets/out.svg';
import { ButtonClick, Container, ContainerTransacao } from './styles'
import { toast } from 'react-toastify';

interface modalProps {
   show: boolean
   onHide: () => void
}

export const ModalTransacao = ({ show, onHide }: modalProps) => {
   const { novaTransacao } = useTransactions()
   const [tipoTransacao, setTipoTransacao] = useState('deposito');
   const [titulo, setTitulo] = useState('')
   const [valorMonetario, setValorMonetario] = useState(0)
   const [categoria, setCategoria] = useState('')

   async function handleNovaTransacao(event: FormEvent) {
      event.preventDefault();
      const dataCadastro = new Date().toDateString();
      await novaTransacao({ titulo, categoria, tipoTransacao, valorMonetario, dataCadastro })
         .then(resolve => {
            LimparCampos();
            onHide();
            return true
         })
         .catch(err => {
            toast.error('Erro ao adicionar o Produto')
            return false
         })
   }

   function LimparCampos() {
      setValorMonetario(0);
      setCategoria('');
      setTipoTransacao('deposito');
      setTitulo('');
   }

   return (
      <Modal
         isOpen={show}
         onRequestClose={onHide}
         overlayClassName='react-modal-overlay'
         className='react-modal-content'
      >
         <button type='button' onClick={onHide} className="react-modal-close">
            <img src={closeImg} alt="Fechar" />
         </button>


         <Container onSubmit={handleNovaTransacao}>
            <h2>Cadastrar transação</h2>
            <input type="text" placeholder='Titulo' value={titulo} onChange={e => setTitulo(e.target.value)} />
            <input type="number" placeholder='Valor' value={valorMonetario} onChange={e => setValorMonetario(Number(e.target.value))} />

            <ContainerTransacao>
               <ButtonClick
                  type='button'
                  onClick={() => setTipoTransacao('deposito')}
                  isActive={tipoTransacao === 'deposito'}
                  activeColor="green"
               >
                  <img src={entradaImg} alt="Deposito" /><span>Deposito</span>
               </ButtonClick>

               <ButtonClick
                  type='button'
                  onClick={() => setTipoTransacao('retirada')}
                  isActive={tipoTransacao === 'retirada'}
                  activeColor="red"
               >
                  <img src={saidaImg} alt="retirada" /><span>Retirada</span>
               </ButtonClick>
            </ContainerTransacao>


            <input type="text" placeholder='Categoria' value={categoria} onChange={(e) => setCategoria(e.target.value)} />
            <button type='submit'>Cadastrar</button>
         </Container>
      </Modal >
   )
}