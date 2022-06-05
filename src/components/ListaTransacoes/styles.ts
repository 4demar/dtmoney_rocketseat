import styled from "styled-components";

export const Container = styled.div`
  margin-top: 3rem;

  table {
    width: 100%;
    border-spacing: 0 0.5rem;
    
    .box {
      box-shadow: 1px 1px 5px #999;
    }

    th {
      color: var(--text-body);
      font-weight: 400;
      padding: 0.5rem 2rem;
      text-align: center;
      line-height: 1.5rem;
    }

    td {
      padding: 0.6rem 2rem;
      border: 0;
      background: var(--shape);
      text-align: center;
      color: var(--text-body);
      border-radius: 0.25rem;
      &:first-child {
        color: var(--text-title);
      }
      &.deposito {
        color: var(--green)
      }
      &.retirada {
        color: var(--red)
      }
    }

  };

`;