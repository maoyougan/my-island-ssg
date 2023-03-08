import { App, initPageData } from './App';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { DataContext } from './hooks';

// For ssr component render
export async function render(pagePath: string) {
  const pageData = await initPageData(pagePath);
  return renderToString(
    <DataContext.provider value={pageData}>
      <StaticRouter location={pagePath}>
        <App />
      </StaticRouter>
    </DataContext.provider>
  );
}

export { routes } from 'island:routes';
