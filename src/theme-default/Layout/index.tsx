import { usePageData } from '@runtime';
import 'virtual:uno.css'; // unocss自身问题，官方建议虚拟模块导入
export function Layout() {
  const pageData = usePageData();
  const { pageType } = pageData;
  const getContent = () => {
    switch (pageType) {
      case 'home':
        return <div>Home Page</div>;
      case 'doc':
        return <div>Content Page</div>;
      default:
        return <div>404 Page</div>;
    }
  };

  return <div>{getContent()}</div>;
}
