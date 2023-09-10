import { PromotionBoothCard } from '@/components/booth/promotion';
import MoveToTopBtn from '@/components/common/btn/MoveToTopBtn';
import { pageState } from '@/libs/store';
import useGetPromotionBooths from '@/query/get/useGetPromotionBooths';
import React, { useEffect, useMemo, useRef } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

export default function Promotion() {
  const isPage = useSetRecoilState(pageState);

  /** 지도 포인터 눌렀을 때 포커싱 주기위한 ref */
  const boothFocus = useRef([]);

  /**
   * booths: 부스 정보 (서버로부터 받아옴)
   * pointers: 지도 상에 나타나는 포인터 고정 좌표
   */
  const { booths } = useGetPromotionBooths();
  const pointers = useMemo(
    () => [
      {
        number: 1,
        top: '7.1rem',
        left: '14.57rem',
      },
      {
        number: 1,
        top: '11.5rem',
        left: '4.72rem',
      },
      {
        number: 1,
        top: '14.8rem',
        left: '4.9rem',
      },
      {
        number: 2,
        top: '7.46rem',
        left: '5.85rem',
      },
      {
        number: 3,
        top: '6.54rem',
        left: '6.65rem',
      },
      {
        number: 4,
        top: '13.75rem',
        left: '17.7rem',
      },
      {
        number: 4,
        top: '7.35rem',
        left: '13.6rem',
      },
      {
        number: 5,
        top: '10.45rem',
        left: '15.62rem',
      },
      {
        number: 5,
        top: '13.75rem',
        left: '18.8rem',
      },
      {
        number: 6,
        top: '11.3rem',
        left: '10.6rem',
      },
      {
        number: 7,
        top: '7.25rem',
        left: '19.55rem',
      },
      {
        number: 8,
        top: '9.85rem',
        left: '18.75rem',
      },
      {
        number: 9,
        top: '15.2rem',
        left: '5.95rem',
      },
    ],
    []
  );

  useEffect(() => {
    isPage('booth/promotion');
  }, []);

  /** 포인터 눌렀을 때 해당 포인터 번호에 해당하는 카드로 이동 */
  const onClickPointer = (number) => {
    boothFocus.current[number].scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
  };

  return (
    <MainSection>
      <Title>프로모션 부스</Title>

      <BoothMap>
        {pointers.map((pointer, index) => (
          <Pointer
            key={`pointer${index}`}
            src={`/img/booth/pointer${pointer.number}.png`}
            number={pointer.number}
            left={pointer.left}
            top={pointer.top}
            onClick={() => onClickPointer(pointer.number)}
          />
        ))}
      </BoothMap>

      {booths.map((booth) => (
        <div ref={(el) => (boothFocus.current[booth.booth_num] = el)} key={booth.booth_num + 1}>
          <PromotionBoothCard data={booth} variant="primary" />
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

  z-index: 10;
  background-image: url('/img/booth/profit/profit-background.png');
  background-repeat: no-repeat;
  background-size: cover;
`;

const Title = styled.h1`
  width: 100%;

  text-align: center;
  ${({ theme }) => theme.fontStyles.head1};
`;

const Pointer = styled.img`
  position: absolute;
  width: 2.3rem;
  height: 1.3rem;
  ${({ left, top }) => `left: ${left}; top:${top};`}

  cursor: pointer;
`;

const MapSize = styled.div`
  width: 33.5rem;
  height: 20rem;

  background-size: contain;
  background-repeat: no-repeat;
`;

const BoothMap = styled(MapSize)`
  position: relative;
  z-index: 1;
  background-image: url('/img/booth/promotion/promotion-map.jpeg');

  margin-top: 3.6rem;
  margin-bottom: 3.6rem;
`;
