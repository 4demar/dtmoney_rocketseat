import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { createServer, Model } from 'miragejs';

createServer({
   //banco
   models: {
      //tabela
      transacoes: Model,
   },
   seeds(server) {
      server.db.loadData({
         transacoes: [
            {
               id: 1,
               titulo: 'MotoBoy',
               tipoTransacao: 'deposito',
               categoria: 'Extra',
               valorMonetario: 315,
               dataCadastro: new Date('2022-04-10')
            },
            {
               id: 2,
               titulo: 'Compra de pneus',
               categoria: 'Carro',
               tipoTransacao: 'retirada',
               valorMonetario: 659,
               dataCadastro: new Date('2022-04-20')
            },
            {
               id: 3,
               titulo: 'Salario',
               tipoTransacao: 'deposito',
               categoria: 'Deposito',
               valorMonetario: 3200,
               dataCadastro: new Date('2022-04-26')
            },
         ],
      })
   },
   routes() {
      this.namespace = 'api';

      // Busca todas as transações, schema é acesso ao banco
      this.get('/carregaTransacoes', () => {
         return this.schema.all('transacoes')
      })


      //Cria uma nova transação, schema é acesso ao banco
      let newId = 4;
      this.post('/novaTransacao', (schema, request) => {
         let data = JSON.parse(request.requestBody)
         data.id = newId++;
         return { transacoes: data };
      });
      // ou //
      // this.post('/transactions', (schema, request) => {
      //    const data = JSON.parse(request.requestBody);
      //    return schema.create('transaction', data);
      // })
   }
})

const root = ReactDOM.createRoot(
   document.getElementById('root') as HTMLElement
);
root.render(
   <React.StrictMode>
      <App />
   </React.StrictMode>
);
