import React, { useEffect, useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { Header } from './components/Header';
import { ModalTransacao } from './components/ModalTransacoes';
import { TransacoesProvider } from './hooks/useTransactions';
import { Transacao } from './interfaces';
import { api } from './services/api';
import { GlobalStyle } from './styles/global';
import Modal from 'react-modal'

Modal.setAppElement('#root');

export function App() {
   const [openModalNovaTransacao, setOpenModalNovaTransacao] = useState(false)


   function handleOpenModalNovaTransacao() {
      setOpenModalNovaTransacao(true)
   }

   function handleCloseModalNovaTransacao() {
      setOpenModalNovaTransacao(false)
   }

   return (
      <TransacoesProvider >
         <Header showModal={handleOpenModalNovaTransacao} />
         <ModalTransacao show={openModalNovaTransacao} onHide={handleCloseModalNovaTransacao} />
         <Dashboard />
         <GlobalStyle />
      </TransacoesProvider>
   );
}
