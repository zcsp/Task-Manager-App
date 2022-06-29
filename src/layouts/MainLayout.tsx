import axios from 'axios';
import { ReactNode, useEffect, useState } from 'react';
import DetailsSidebar from '../components/DetailsSidebar/DetailsSidebar';
import SideNav from '../components/Navigation/Navigation';
import './MainLayout.scss';

function MainLayout({ children }: { children: ReactNode }) {

  return (
    <div id="main-layout">
      <SideNav />
      <main>
        {children}
        <DetailsSidebar />
      </main>
    </div>
  );
}

export default MainLayout;
