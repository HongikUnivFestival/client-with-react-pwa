import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import EditBtn from '@/components/common/btn/EditBtn';
import usePatchPromotionBooths from '@/query/patch/usePatchPromotionBooths';
import useDeletePromotionBooths from '@/query/delete/useDeletePromotionBooths';

EditingPromotionBoothCard.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    booth_num: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    introduction: PropTypes.string,
  }),
};

export default function EditingPromotionBoothCard({ data }) {
  /** 카드가 수정 모드일 경우 true */
  const [isModify, setModifyMode] = useState(false);
  /** 수정을 위한 request */

  const [request, setRequest] = useState({
    name: data.name,
    booth_num: data.booth_num,
    introduction: data.introduction,
  });
  /** 모든 정보가 채워졌는지 확인하는 state */
  const [requireFulfilled, setRequireFulfilled] = useState(false);

  /** 카드 수정 관련 useMutation hook */
  const { patchPromotionBooth } = usePatchPromotionBooths(data);
  /** 카드 삭제 관련 useMutation hook */
  const { deletePromotionBooth } = useDeletePromotionBooths(data);
  useEffect(() => {
    /** 모든 input 채워졌는지 확인 */
    let flag = true;
    for (const key in request) {
      const element = request[key];
      if ('' === element) flag = false;
    }
    setRequireFulfilled(() => flag);
  }, [request]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setRequest((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /** 카드 수정 내용 반영 */
  const onModifyCard = () => {
    patchPromotionBooth(request);
    setModifyMode(false);
  };

  /** 카드 삭제 */
  const onDeleteCard = () => {
    if (window.confirm('정말 삭제합니까?')) {
      deletePromotionBooth();
    } else {
      alert('취소합니다.');
    }
  };

  return isModify ? (
    <CardWrapper data-aos="fade-up" data-aos-duration="800">
      <BoothText>
        <BoothNumber isModify={isModify}>
          <input
            type="text"
            name={'booth_num'}
            value={request.booth_num}
            placeholder="위치 번호"
            maxLength={2}
            onChange={onChange}
          />
        </BoothNumber>
        <BoothName>
          <input
            type="text"
            name={'name'}
            value={request.name}
            placeholder="부스 이름"
            maxLength={40}
            onChange={onChange}
          />
        </BoothName>
        <BoothIntroduction>
          <textarea
            type="text"
            name={'introduction'}
            value={request.introduction}
            placeholder="30자 이내 설명"
            maxLength={30}
            onChange={onChange}
          />
        </BoothIntroduction>
        <EditBtn title={'저장'} type={'add'} onClick={onModifyCard} disabled={!requireFulfilled} />
        <EditBtn title={'삭제'} type={'delete'} onClick={onDeleteCard} />
      </BoothText>
    </CardWrapper>
  ) : (
    <CardWrapper data-aos="fade-up" data-aos-duration="800">
      <BoothText>
        <BoothNumber isModify={isModify}>
          <span>{data.booth_num}</span>
        </BoothNumber>
        <BoothName>
          <span>{data.name}</span>
        </BoothName>
        <BoothIntroduction>운영요일: {data.introduction}</BoothIntroduction>
        <EditBtn title={'수정'} type={'modify'} onClick={() => setModifyMode(true)} />
        <EditBtn title={'삭제'} type={'delete'} onClick={onDeleteCard} />
      </BoothText>
    </CardWrapper>
  );
}

const CardWrapper = styled.div`
  width: 33.5rem;
  margin-bottom: 3.6rem;

  background-color: #000;

  input,
  textarea {
    background: none;
    border: none;
    outline: none;

    color: ${({ theme }) => theme.colors.white};

    width: 100%;
    height: 100%;
  }

  input::placeholder {
    color: ${({ theme }) => theme.colors.gray400};
  }

  button {
    margin-bottom: 0.8rem;
  }

  button:last-child {
    margin-bottom: 0;
  }

  background: rgba(29, 29, 29, 0.6);
  backdrop-filter: blur(6px);
`;

const BoothText = styled.div`
  padding: 1.8rem 2rem;
`;

const BoothNumber = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.8rem;

  ${({ isModify, theme }) =>
    isModify
      ? `
      input,
      input::placeholder {
        ${theme.fontStyles.subHead4}
      }   
  `
      : `
    width: 2.4rem;
    height: 2.4rem;
    border-radius: 50%;
    background-color: ${theme.colors.white};
    span {
      ${theme.fontStyles.subHead1};
      line-height: 1.6rem;
      color: ${theme.colors.black};
    }
  `}
`;

const BoothName = styled.div`
  margin-bottom: 0.8rem;
  input,
  input::placeholder {
    ${({ theme }) => theme.fontStyles.head5}
  }

  span {
    color: ${(props) => props.theme.colors.green};
    ${(props) => props.theme.fontStyles.head5};
  }
`;

const BoothIntroduction = styled.p`
  textarea,
  textarea::placeholder {
    ${({ theme }) => theme.fontStyles.subHead4}
  }
  color: rgba(255, 255, 255, 0.8);
  ${(props) => props.theme.fontStyles.subHead1}
  font-weight:400;
  padding: 1.2rem 0;
  border-top: 1px solid transparent;
  border-image: linear-gradient(to right, white, black);
  border-image-slice: 1;
`;
