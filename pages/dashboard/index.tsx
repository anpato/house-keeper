import { useRouter } from 'next/router';
import Lists from '../../components/core/views/lists.component';
import RecentList from '../../components/core/views/recent-list.component';
import PaddedLayout from '../../layouts/padded.layout';

const Dashboard = () => {
  const router = useRouter();

  return (
    <PaddedLayout>
      <Lists router={router} />
      <RecentList router={router} />
    </PaddedLayout>
  );
};

export default Dashboard;
