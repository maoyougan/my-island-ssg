import { Layout } from '../theme-default/Layout';
import { routes } from 'island:routes';
import { matchRoutes } from 'react-router-dom';
import type { PageData } from 'shared/index';
import siteData from 'island:site-data';

export async function initPageData(routePath: string): Promise<PageData> {
  // 获取路由编译后的模块内容
  const matched = matchRoutes(routes, routePath);
  if (matched) {
    const moduleInfo = await matched[0].route.preload();
    console.log('moduleInfo', moduleInfo);
    return {
      pageType: moduleInfo.frontmatter?.pageType ?? 'doc',
      siteData,
      frontmatter: moduleInfo.frontmatter,
      pagePath: routePath,
      toc: moduleInfo.toc
    };
  }

  return {
    pageType: '404',
    siteData,
    pagePath: routePath,
    frontmatter: {}
  };
}
export function App() {
  return <Layout />;
}
