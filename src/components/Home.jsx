import React from 'react';
import withAuthenticated from './HOCs/withAuthenticated';
import { Widget1, SectionTitle, Widget2 } from './index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook } from "@fortawesome/free-solid-svg-icons";
import HeaderContainer from '../containers/HeaderContainer';
import BottomMenu from './BottomMenu';
import { Grid } from '@mui/material';


const Home = ({ hasNotifications, notifications, roomsWithHasUnCheckMsg }) => {

  return (
    <Grid container>
      <HeaderContainer />
      <SectionTitle title="Ngôn ngữ của bạn" />
      <Grid container>
        <Grid item xs={12} sm={12} className='home__container'>
          <Widget1 link="/subject/english" title="English" num={11} progress={20} lesson="Bài 2" content="Come in again please." />
          <Widget1 link="/subject/japanese" title="Japanese" num={11} progress={10} lesson="Bài 2" content="Bạn mới hoàn thành 1 nửa cần phải làm hết mới sang bài tiếp theo" />
        </Grid>
      </Grid>
      <SectionTitle title="Bạn muốn làm gì?" />
      <Grid item xs={12}>
        <Widget2 icon={<FontAwesomeIcon icon={faBook} />} title="Tra từ điển" content="Tra cứu bất cừ cụm từ nào và kiểm tra phát âm của bạn." />
      </Grid>
      <BottomMenu hasNotifications={hasNotifications} notifications={notifications} roomsWithHasUnCheckMsg={roomsWithHasUnCheckMsg} />
    </Grid>
  )
}

export default withAuthenticated(Home)
// export default Home
