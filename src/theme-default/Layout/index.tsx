import { Content } from '@runtime';
import 'virtual:uno.css'; // unocss自身问题，官方建议虚拟模块导入
export function Layout() {
  return (
    <div>
      <h1 p="2" m="4">
        Common Content
      </h1>
      <Content />
    </div>
  );
}
