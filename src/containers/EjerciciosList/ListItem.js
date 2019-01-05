import styled from 'styled-components';

const ListItem = styled.div`
  border-bottom: solid 1px #c5ade6;
  padding: 14px 24px;
  transition: background-color 0.1s ease-in-out;

  &:last-child {
    border-bottom: none;
  }
`;

export default ListItem;
