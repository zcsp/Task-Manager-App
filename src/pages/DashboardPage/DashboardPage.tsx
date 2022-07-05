import MainLayout from '../../layouts/MainLayout';
import './DashboardPage.scss';
import moment from '../../utils/moment';
import RandomHashtag from '../../components/RandomHashtag';
import DashboardCalendar from './DashboardCalendar';

function DashboardPage() {

  return (
    <MainLayout>
      <div id="dashboard-content">
        <h1>
          It's {moment().format('dddd LL')} today.
        </h1>
        <RandomHashtag />
        <div id="dashboard-grid">
          <DashboardCalendar />
        </div>
      </div>
    </MainLayout>
  );
}

export default DashboardPage;
