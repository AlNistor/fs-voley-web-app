import styled from 'styled-components';
import { device } from './DevicesBreakpoints';
import Footer from './Footer';
import { ILayout } from './Interfaces';
import Navigation from './Navigation';

const Layout: React.FC<ILayout> = ({ children, bgColor = 'var(--white-color)', isUsedOnOverlay = false }) => {
  return (
    <Container {...{ bgColor }}>
      <Navigation {...{ isUsedOnOverlay }} />
      {children}
      <Footer />
    </Container>
  );
};
export default Layout;

const Container = styled.main<{ bgColor?: string }>`
  background-color: ${({ bgColor }) => bgColor};
`;

export const LayoutContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1300px;
  position: relative;
  z-index: var(--z-index-2);

  @media ${device.smallLaptop}, ${device.tablet} {
    width: 90vw;
  }
  @media ${device.mobile} {
    width: 85vw;
  }
`;
