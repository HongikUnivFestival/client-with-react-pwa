import MapMarker from '@/components/booth/MapMarker';
import { ProfitBoothCard } from '@/components/booth/profit';
import MoveToTopBtn from '@/components/common/btn/MoveToTopBtn';
import { pageState } from '@/libs/store';
import useGetProfitBooths from '@/query/get/useGetProfitBooths';
import theme from '@/styles/theme';
import React, { useEffect, useMemo, useRef } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

function Profit() {
  const [page, isPage] = useRecoilState(pageState);
  const boothFocus = useRef([]);
  const { booths, isLoading } = useGetProfitBooths();

  useEffect(() => {
    isPage('booth/profit');
  }, []);

  const markers = useMemo(
    () => [
      {
        top: '10.2rem',
        left: '12.5rem',
      },
      {
        top: '10.8rem',
        left: '14.3rem',
      },
      {
        top: '11.2rem',
        left: '16rem',
      },
      {
        top: '11.7rem',
        left: '17.7rem',
      },
      {
        top: '8rem',
        left: '11rem',
      },
      {
        top: '12.2rem',
        left: '11.2rem',
      },
      {
        top: '12.8rem',
        left: '12.9rem',
      },
      {
        top: '14.5rem',
        left: '22.7rem',
      },
      {
        top: '14.5rem',
        left: '24.5rem',
      },
      {
        top: '14.5rem',
        left: '26.2rem',
      },
      {
        top: '14rem',
        left: '17.2rem',
      },
    ],
    []
  );

  const onClickPointer = (number) => {
    boothFocus.current[number].scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
  };

  if (isLoading) return <div>로딩중</div>;

  return (
    <MainSection>
      <Title>수익부스</Title>

      <BoothMap />

      <BoothDetail>
        <MapMarker booths={booths} markers={markers} onClick={onClickPointer} />
      </BoothDetail>

      {booths.map((booth) => (
        <div ref={(el) => (boothFocus.current[booth.boothNum] = el)} key={booth.number}>
          <ProfitBoothCard data={booth} variant="secondary" />
        </div>
      ))}

      <MoveToTopBtn />
    </MainSection>
  );
}

const MainSection = styled.section`
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  border: 1px solid black;
  padding: 10rem 2rem;

  background-image: url('/img/booth/profit/profit-background.png');
  background-repeat: no-repeat;
  background-size: cover;

  z-index: 10;
`;

const Title = styled.h1`
  width: 100%;

  text-align: center;
  ${theme.fontStyles.head1}
`;

const MapSize = styled.div`
  width: 33.5rem;
  height: 20rem;

  background-size: cover;
  background-repeat: no-repeat;
`;

const BoothMap = styled(MapSize)`
  background-image: url('/img/booth/profit/booth-profit-map.png');

  margin-top: 3.6rem;
  margin-bottom: 3.6rem;
  z-index: 2;
`;
const BoothDetail = styled(MapSize)`
  position: relative;
  background-image: url('/img/booth/profit/booth-profit-detail.png');

  margin-bottom: 8rem;
  z-index: 2;
`;

export default Profit;
