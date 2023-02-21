import { usePageData } from '@runtime';
import 'virtual:uno.css'; // unocss自身问题，官方建议虚拟模块导入
import '../style/base.css';
import '../style/vars.css';
import '../style/doc.css';
import { Nav } from '../components/Nav';
import { HomeLayout } from './HomeLayout';
import { DocLayout } from './DocLayout';

export function Layout() {
  const pageData = usePageData();
  const { pageType } = pageData;
  const getContent = () => {
    switch (pageType) {
      case 'home':
        return <HomeLayout />;
      case 'doc':
        return <DocLayout />;
      default:
        return <div>404 Page</div>;
    }
  };

  return (
    <div>
      <Nav />
      <section
        style={{
          paddingTop: 'var(--island-nav-height)'
        }}
      >
        {getContent()}
      </section>
    </div>
  );
}
