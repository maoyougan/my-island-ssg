import { usePageData, Content } from '@runtime';
import { useLocation } from 'react-router-dom';
import { Sidebar } from '../../components/SideBar';
import { DocFooter } from '../../components/DocFooter';
import styles from './index.module.scss';

export function DocLayout() {
  const { siteData } = usePageData();
  const sidebarData = siteData.themeConfig?.sidebar || {};
  const { pathname } = useLocation();
  const matchedSidebarKey = Object.keys(sidebarData).find((key) => {
    if (pathname.startsWith(key)) {
      return true;
    }
  });

  const matchedSidebar = sidebarData[matchedSidebarKey] || [];

  return (
    <div>
      <Sidebar sidebarData={matchedSidebar} pathname={pathname} />
      <div className={styles.content}>
        <div>
          <div className="island-doc">
            <Content />
          </div>
        </div>
        <DocFooter />
      </div>
    </div>
  );
}