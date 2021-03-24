import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';
import ShoeGrid from '../ShoeGrid';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  const tagNames = (currentVariant) => {
    switch (currentVariant) {
      case 'on-sale':
        return 'Sale';
      case 'new-release':
        return 'Just Released!';
      default:
        return;
    }
  };

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <HotTag variant={variant}>{tagNames(variant)}</HotTag>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price variant={variant}>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          <SalePrice variant={variant}>{formatPrice(salePrice)}</SalePrice>
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  flex: 1 1 344px;
  
  // ${ShoeGrid}:last-child {
  //   background-color: tan;
  // }
`;

const HotTag = styled.span`
  display: ${(p) => (p.variant === 'default' ? 'none' : 'inline-block')};
  position: absolute;
  top: 12px;
  padding: 7px 9px 9px 11px;
  margin-right: -4px;
  border-radius: 2px;
  right: 0;
  color: ${COLORS.white};
  font-weight: ${WEIGHTS.bold};

  background-color: ${(p) =>
    p.variant === 'on-sale' ? COLORS.primary : COLORS.secondary};
`;

const Wrapper = styled.article``;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  max-width: 100%;
  width: 864px;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  text-decoration: ${(p) =>
    p.variant === 'on-sale' ? 'line-through' : 'none'};
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};

  display: ${(p) => (p.variant === 'on-sale' ? 'inline-block' : 'none')};
`;

export default ShoeCard;
