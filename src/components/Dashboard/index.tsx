import { ListaTransacoes } from "../ListaTransacoes";
import { Resumo } from "../Resumo";
import { Container } from "./styles";

export function Dashboard() {
  return (
    <>
      <Container>
        <Resumo />
        <ListaTransacoes />
      </Container>
    </>
  )
}