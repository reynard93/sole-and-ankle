import React from 'react';
import styled from 'styled-components/macro';

import SHOES from '../../data';
import ShoeCard from '../ShoeCard';
import ShoeCardGhost from "../ShoeCard/ShoeCardGhost";

const ShoeGrid = () => {
  const length = SHOES.length;
  const grid = (
    <Wrapper>
      {[...SHOES.map((shoe) => (
        <ShoeCard key={shoe.slug} {...shoe} />
      )), ...!(length % 2) ? [] : [<ShoeCardGhost/>, <ShoeCardGhost/>,  <ShoeCardGhost/>]]}
    </Wrapper>
  );

  return grid;
};

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 36px;
`;

export default ShoeGrid;
