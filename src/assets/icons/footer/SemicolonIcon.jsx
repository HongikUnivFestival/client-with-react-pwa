import React from 'react';
import styled from 'styled-components';

export const SemicolonIcon = () => {
  return (
    <Wrap>
      <svg width="0.6rem" height="1.0rem" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.31338 9.04997C1.14088 9.04997 0.968377 8.98247 0.833377 8.85497C0.707429 8.72847 0.636719 8.55723 0.636719 8.37872C0.636719 8.20021 0.707429 8.02897 0.833377 7.90247L3.73588 4.99997L0.833377 2.10497C0.707429 1.97847 0.636719 1.80723 0.636719 1.62872C0.636719 1.45021 0.707429 1.27897 0.833377 1.15247C0.959878 1.02652 1.13112 0.955811 1.30963 0.955811C1.48814 0.955811 1.65938 1.02652 1.78588 1.15247L5.16088 4.52747C5.28682 4.65397 5.35753 4.82521 5.35753 5.00372C5.35753 5.18223 5.28682 5.35347 5.16088 5.47997L1.78588 8.85497C1.65838 8.98247 1.48588 9.04997 1.31338 9.04997Z"
          fill="#FF89D7"
        />
      </svg>
    </Wrap>
  );
};

const Wrap = styled.div`
  margin-left: 0.4rem;
  display: flex;
  align-items: center;
`;
