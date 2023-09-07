import React from 'react';
import theme from '@/styles/theme';
import styled from 'styled-components';

function Day({ day, info }) {
  return (
    <Container>
      <Title>{day}</Title>

      {info.map((celeb, idx) => (
        <Card key={`celeb-${day}-${idx}`}>
          <CelebImageContainer>
            <CelebImage src={celeb.image} />
            {celeb.left === true ? (
              <LeftTriangle src="/img/left.png" />
            ) : celeb.left === false ? (
              <Rightriangle src="/img/right.png" />
            ) : null}
            <GradientImage />
            {celeb.chartman ? (
              <ChartMan>
                본 아티스트는 <ChartManIcon src="/img/chartman.png" />과 함께합니다.
              </ChartMan>
            ) : null}
          </CelebImageContainer>

          <Introduction backgroundGradation={celeb.backgroundGradation}>
            <GradationLayer />
            <Celeb>{celeb.name}</Celeb>
            <Desc>{celeb.introduce}</Desc>
          </Introduction>
        </Card>
      ))}
    </Container>
  );
}

export default Day;

const Container = styled.div``;

// suit typo 존재하지 않아서 따로
const Title = styled.h1`
  margin-bottom: 3.6rem;

  color: ${theme.colors.green};
  font-family: 'SUIT Variable';
  font-size: 2.8rem;
  font-weight: 600;
  font-style: normal;

  text-align: center;
`;

const Card = styled.div`
  position: relative;
  width: 100%;

  margin-bottom: 3.6rem;
`;

const CelebImageContainer = styled.div`
  position: relative;
  width: 100%;
`;

const CelebImage = styled.img`
  width: 100%;
  height: 21.6rem;

  object-fit: cover;
`;

const LeftTriangle = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;

  width: 19.8rem;
  height: 4.6rem;
`;

const Rightriangle = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;

  width: 19.8rem;
  height: 4.6rem;
`;

const GradientImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;

  width: 100%;
  height: 21.6rem;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000 100%);
`;

const Introduction = styled.div`
  position: relative;
  width: 100%;
  height: 15rem;
  padding: 1.8rem 2.8rem 2rem 2rem;

  background-image: url(${(props) => props.backgroundGradation});
  background-size: cover;
  background-repeat: no-repeat;
`;

const GradationLayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  background: linear-gradient(180deg, #000 0%, rgba(0, 0, 0, 0) 100%);

  width: 100%;
  height: 15rem;
`;

const Celeb = styled.div`
  position: relative;
  z-index: 2;
  color: ${theme.colors.white};
  ${theme.fontStyles.head5};
`;

const Desc = styled.div`
  position: relative;
  z-index: 2;

  margin-top: 0.8rem;
  padding: 1.2rem 0;
  border-top: 0.1rem solid ${theme.colors.white};
  border-image: linear-gradient(to left, #ffffff00, ${theme.colors.white});
  border-image-slice: 1;

  color: ${theme.colors.white};
  ${theme.fontStyles.subHead1};
  white-space: pre-line;
`;

const ChartMan = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 0;
  z-index: 3;
  width: 100%;
  height: 4rem;
  padding-left: 1.6rem;

  color: ${theme.colors.pink};
  ${theme.fontStyles.body5};
`;

const ChartManIcon = styled.img``;
