import { useState } from 'react'
import logotipo from '../../assets/logo.svg'
import { Container, Content } from './styles'

interface headerProps {
  showModal: () => void
}

export function Header({ showModal }: headerProps) {

  return (
    <Container>
      <Content>
        <img src={logotipo} alt="Dt Money" />
        <button type="button" onClick={showModal}>Nova transação</button>

      </Content>
    </Container>
  )
}