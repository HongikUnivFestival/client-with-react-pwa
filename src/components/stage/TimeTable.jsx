import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

TimeTable.propTypes = {
  day: PropTypes.number.isRequired,
  onSwipe: PropTypes.func.isRequired,
  sliderRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({ current: PropTypes.any })]),
};

function TimeTable({ day, onSwipe, sliderRef }) {
  /** 중앙무대 일정
   * type: 무대의 타입, 디자인상 타입 별로 색이 다름
   * stage: 무대 이름
   * time: 무대 진행 시간
   * details: 무대 진행하는 팀 이름
   *
   * react lick 라이브러리 rows로 설정해주는 크기에 따라서
   * rows의 크기를 채우지 못 할 경우 마지막에 아무 정보도 없는 더미가 들어가야 함
   */
  const schedules = useMemo(
    () => [
      [
        { type: 'undergraduate', stage: '학부찬조공연', time: '17:30 ~ 18:00', details: ['공연예술학부 뮤지컬'] },
        {
          type: 'hongikCentral',
          stage: '재주꾼선발대회',
          time: '18:00 ~ 20:20',
          details: [
            '유지예',
            '나중에',
            '(샤이니)빛이 나는 솔로',
            '권영훈',
            '전자깡패',
            '이민규',
            '에땅쎌',
            '김예린',
            '고스락',
          ],
        },
        {
          type: 'celab',
          stage: '연예인 초청무대',
          time: '20:20 ~ 22:30',
          details: ['양다일', '나비', 'SURL', '비비', '타이거JK', '윤미래'],
        },
        { stage: '', details: [] },
      ],
      [
        {
          type: 'hongikCentral',
          stage: '학생중앙무대',
          time: '17:00 ~ 19:20',
          details: ['유형준', '카이저', '비너스', '익수', '프링글스', '블랙테트라'],
        },
        { type: 'undergraduate', stage: '학부찬조공연', time: '19:20 ~ 20:00', details: ['공연예술학부 밴드'] },
        { type: 'celab', stage: '연예인 초청무대', time: '20:00 ~ 22:10', details: ['10cm', '유다빈밴드', '윤하'] },
        { stage: '', details: [] },
      ],
      [
        {
          type: 'hongikCentral',
          stage: '학생중앙무대',
          time: '17:00 ~ 20:10',
          details: [
            '조용찬',
            '캐드',
            '오픈런',
            '강은서밴드',
            '소리얼',
            '오현성콰트로치즈와퍼',
            '브레인스워즈',
            '비츠플로우',
          ],
        },
        {
          type: 'celab',
          stage: '연예인 초청무대',
          time: '20:10 ~ 22:20',
          details: ['NewJeans', '정용화', '이승윤', '릴보이'],
        },
        { type: '', stage: '', details: [] },
        { type: '', stage: '', details: [] },
      ],
    ],

    []
  );

  /** react slick 옵션 */
  const settings = {
    dots: false,
    arrows: false,
    rows: 4,
    fade: true,
  };

  return (
    <Container {...settings} onSwipe={onSwipe} initialSlide={day} ref={sliderRef}>
      {schedules.map((day) =>
        day.map((schedule) => (
          <>
            <Schedule key={schedule.stage} isempty={schedule.stage === '' ? 1 : 0}>
              <TimeLine type={schedule.type}>
                <span>{schedule.stage}</span>
                <span id="time">{schedule.time}</span>
              </TimeLine>
              <Stages>
                {schedule.details.map((detail) => (
                  <Stage key={detail}>{detail}</Stage>
                ))}
              </Stages>
            </Schedule>
          </>
        ))
      )}
    </Container>
  );
}

const Container = styled(Slider)`
  z-index: 2;

  width: 33.5rem;
  min-height: 51.9rem;

  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(6px);

  animation: fadein 1s;

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const Schedule = styled.ul`
  display: ${({ isempty }) => (isempty ? 'none' : 'flex')};

  justify-content: space-around;
  padding: 1.4rem 0.8rem;

  margin-bottom: 1rem;

  ${({ theme }) => `
    &:first-child{
        border-top: 1px solid ${theme.colors.gray800};
        border-bottom-width: 0;
    }
    border-top: 1px solid ${theme.colors.gray800};
    border-bottom: 1px solid ${theme.colors.gray800};
  `};
`;

const TimeLine = styled.div`
  display: flex;
  flex-direction: column;

  width: 13.1rem;

  span {
    color: ${({ type, theme }) =>
      type === 'hongikCentral'
        ? `${theme.colors.pink}`
        : type === 'undergraduate'
        ? `${theme.colors.purple}`
        : `${theme.colors.green}`};
    ${({ theme }) => theme.fontStyles.body1};
  }

  span#time {
    color: ${({ theme }) => theme.colors.gray400};
  }
`;

const Stages = styled.ul`
  display: flex;
  flex-direction: column;

  width: 16rem;
`;

const Stage = styled.li`
  ${({ theme }) => theme.fontStyles.body1};
  margin-bottom: 0.8rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

export default TimeTable;
