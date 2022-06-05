import inImg from '../../assets/in.svg';
import outImg from '../../assets/out.svg';
import totalImg from '../../assets/total.svg';
import { useTransactions } from '../../hooks/useTransactions';
import { Container } from "./styles"

export function Resumo() {
   const { transacoes } = useTransactions()

   // const totalDepositos = transacoes.reduce((dep, transacao) => {
   //   if (transacao.tipoTransacao === 'deposito') {
   //     return dep + transacao.valorMonetario;
   //   }
   //   return dep;
   // }, 0);

   // const totalRetirada = transacoes.reduce((ret, transacao) => {
   //   if (transacao.tipoTransacao === 'retirada') {
   //     return ret + transacao.valorMonetario;
   //   }
   //   return ret;
   // }, 0);


   // const ResumoTotal = () => {
   //   const total = totalDepositos - totalRetirada
   //   return total;
   // }


   const resumo = transacoes.reduce((valor, transacao) => {
      if (transacao.tipoTransacao === 'deposito') {
         valor.deposito += transacao.valorMonetario;
         valor.total += transacao.valorMonetario;
      }
      else {
         valor.retirada += transacao.valorMonetario;
         valor.total -= transacao.valorMonetario;
      }
      return valor
   }, {
      deposito: 0,
      retirada: 0,
      total: 0
   });

   return (
      <>
         <Container>
            <div className="Box">
               <header>
                  <p>Entradas</p>
                  <img src={inImg} alt="Entradas" />
               </header>
               <strong> {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(resumo.deposito)}</strong>
            </div>
            <div>
               <header>
                  <p>Saída</p>
                  <img src={outImg} alt="Saída" />
               </header>
               <strong>-{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(resumo.retirada)}</strong>
            </div>
            <div className='background-green'>
               <header>
                  <p>Total</p>
                  <img src={totalImg} alt="Total" />
               </header>
               <strong>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(resumo.total)}</strong>
            </div>

         </Container>
      </>
   )
}