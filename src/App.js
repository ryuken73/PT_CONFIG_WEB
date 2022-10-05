import React from 'react';
import Header from 'Components/Header';
import MainTab from 'Components/Pages/MainTab';
import Loading from 'Components/Common/Loading';
import MessageBox from 'Components/Common/MessageBox';
import AddDialog from 'Components/Dialog/AddDialog';
import styled from 'styled-components';
import constants from 'config/constants';
import colors from 'config/colors';

const {TOUCH_WEB_SERVER_URL, SERVER_URL} = constants;


const BasicBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  border: grey 1px solid;
  box-sizing: border-box;
  border-collapse: collapse;
  font-size: calc(10px + 2vmin);
`;

const AppContainer = styled(BasicBox)`
  text-align: center;
  background-color: ${colors.base};
  flex-direction: column;
  justify-content: flex-start;
  color: white;
  height: 100%;
`;
const HeaderContainer = styled(BasicBox)`
  margin-bottom: -1px;
  /* height: 10%; */
`;
const BodyContainer = styled.div`
  margin-left: -1px;
  margin-right: -1px;
  border: grey 1px solid;
  box-sizing: border-box;
  border-collapse: collapse;
  width: 100%;
  height: calc(100% - 2vmin - 65px);
`;
const CenterPane = styled(BasicBox)`
  /* flex-direction: column; */
  font-size: calc(1px + 2vmin);
  padding: 8px;
  border-right: none;
  margin-right: -1px;
  margin-left: -1px;
  height: 100%;
`;
const FooterContainer = styled(BasicBox)`
  height: 40px;
  margin-top: -1px;
  font-size: calc(1px + 1.5vmin);
  flex-shrink: 0;
`;
const Index = () => {
  return <div>index</div>;
};
const NotFound = () => {
  return <div>not found</div>;
};
export default function App() {
  console.log('re-render App:', TOUCH_WEB_SERVER_URL, SERVER_URL);
  const [filesToUpload, setFilesToUpload] = React.useState([])
  console.log(filesToUpload)
  // const [connected, setSocketConnected] = React.useState(false);
  // const { modalOpen, setModalOpenState } = useAppState();
  // const { showMessageBox } = useMessageBox();
  // const { socket } = useSocketIO({
  //   hostAddress: SOCKET_SERVER_URL,
  //   setSocketConnected,
  // });

  return (
    <AppContainer>
      <HeaderContainer>
        <Header />
      </HeaderContainer>
      <BodyContainer>
        <CenterPane>
          <MainTab setFilesToUpload={setFilesToUpload} />
        </CenterPane>
      </BodyContainer>
      <MessageBox />
      <Loading />
      <AddDialog 
        filesToUpload={filesToUpload} 
        setFilesToUpload={setFilesToUpload} 
      />
    </AppContainer>
  );
}
