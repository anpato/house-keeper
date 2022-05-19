import { FC, ReactNode } from 'react';

type IProps = {
  children: ReactNode | ReactNode[];
};

const PaddedLayout: FC<IProps> = ({ children }) => (
  <div style={{ padding: '1em 0' }}>{children}</div>
);

export default PaddedLayout;
