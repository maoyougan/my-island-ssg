# CSS Propertis

## box-sizing

``
box-sizeing: content-box | border-box
``

content-box: width/height= 内容长宽，若设置border,padding, 样式长宽=设定的值+border+padding
border-box: width/height = padding + border + 内容宽度, 样式长款=设定的值

## text-size-adjust

``
text-size-adjust: none | percent | auto
``
CSS用此属性控制一些手机或者平板使用的浏览器的文本溢出算法。通常情况下，如果网站没做移动端小设备适配，在小设备上网站会缩放，字体会很小，这时多数浏览器就会使用文本溢出算法放大文本，改善可读性。设置此属性，可以在不改变样式布局的情况下，调节文本的大小。

## color-scheme
系统色设置（主题色）

``
color-scheme: normal; /*表示未指定配色方案，使用浏览器默认配色方案*/
color-scheme: light;  /*表示可以使用操作系统亮色配色方案渲染元素（表达控件、滚动条、css系统颜色的使用值*/
color-scheme: dark;  /*表示可以使用操作系统深色配色方案*/
color-scheme: light dark;
``

## direction
设置文本、列表水平溢出方向

``
direction: rtl | ltr    /*默认ltr: 表示left to right*/
``

## font-synthesis
控制浏览器合成某些缺失的字体，粗体、斜体（主要是西方字体，像中、日、韩或其他语标文字不含变体，故不需要合成。另，默认字体若合成这些变体，会降低可读性，所以建议关闭该属性）
``
font-synthesis: none | weight | style | small-caps /*可单独使用，除none，其他属性可组合使用*/
``

## text-rendering
定义浏览器渲染引擎渲染字体的方式，浏览器会根据速度、清晰度、几何精度之间权衡渲染

``
text-rendering: auto /**浏览器自己决定*/
text-rendering: optimizeSpeed /**告诉浏览器着重考虑绘制速度*/
text-rendering: optimizeLegibility /**告诉浏览器重视绘易读性，PS：此属性在移动设备上会造成较明显的性能问题*/
text-rendering: geometricPrecision /**告诉浏览器重视几何精度（渲染的字体大小）*/
``