import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Transacao } from "../interfaces";
import { api } from "../services/api";

interface TransacoesProviderProps {
   children: ReactNode;
}

interface TransacoesContextProps {
   transacoes: Transacao[],
   novaTransacao: (transacao: novaTransacao) => Promise<void>
}

type novaTransacao = Omit<Transacao, 'id'>; //este modo só funciona com "type"


export const TransacoesContext = createContext<TransacoesContextProps>({} as TransacoesContextProps);


export function TransacoesProvider({ children }: TransacoesProviderProps) {
   const [transacoes, setTransacoes] = useState<Transacao[]>([]);

   useEffect(() => {
      api.get('/carregaTransacoes')
         .then(response => {
            setTransacoes(response.data.transacoes)
         });

   }, [])

   async function novaTransacao(novaTransacao: novaTransacao) {

      const response = await api.post('/novaTransacao', novaTransacao);
      const transacao: Transacao = response.data.transacoes;

      setTransacoes([...transacoes, transacao]);

   }

   return (
      <TransacoesContext.Provider value={{ transacoes, novaTransacao }}>
         {children}
      </TransacoesContext.Provider>
   )
}

export function useTransactions() {
   const context = useContext(TransacoesContext)
   return context;
}