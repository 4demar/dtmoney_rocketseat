import styled from "styled-components";
import { TransacoesContext, useTransactions } from "../../hooks/useTransactions";
import { Transacao } from "../../interfaces";
import { Container } from "./styles";

export function ListaTransacoes() {
   const { transacoes } = useTransactions()

   return (
      <Container>
         <table>
            <thead>
               <tr>
                  <th>Titulo</th>
                  <th>Valor</th>
                  <th>Categoria</th>
                  <th>Data</th>
               </tr>
            </thead>
            <tbody>
               {transacoes.map(transacao => (
                  <tr className="box" key={transacao.id}>
                     <td>{transacao.titulo}</td>
                     <td className={transacao.tipoTransacao}>
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(transacao.valorMonetario)}</td>
                     <td>{transacao.categoria}</td>
                     <td>{new Intl.DateTimeFormat('pt-BR').format(new Date(transacao.dataCadastro))}</td>
                  </tr>
               ))}
            </tbody>
         </table>
      </Container>
   )
}