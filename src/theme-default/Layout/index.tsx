import { usePageData } from '@runtime';
import 'virtual:uno.css'; // unocss自身问题，官方建议虚拟模块导入
import '../style/base.css';
import '../style/vars.css';
import { Nav } from '../components/Nav';
import { HomeLayout } from './HomeLayout';

export function Layout() {
  const pageData = usePageData();
  const { pageType } = pageData;
  const getContent = () => {
    switch (pageType) {
      case 'home':
        return <HomeLayout />;
      case 'doc':
        return <div>Content Page</div>;
      default:
        return <div>404 Page</div>;
    }
  };

  return (
    <div>
      <Nav />
      {getContent()}
    </div>
  );
}
