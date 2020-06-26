

# 						Web Programming Project Report

​																																				1751894     杨乐

## 1. 项目简介

移动端Todo MVC，使用原生HTML、CSS、Javascript实现，未使用任何第三方库。

github仓库地址：https://github.com/Easonrust/Script-Programming/tree/master/project

部署地址：http://123.57.151.44:8090

<img src="https://tva1.sinaimg.cn/large/007S8ZIlly1gg5t4o47ozj30ke104wgi.jpg" alt="image-20200626170657181" style="zoom: 33%;" />

## 2. 功能

### 2.1基本功能

- 包含新增、删除、展现列表、全部完成/取消、删除已完成
- 保存页面状态，刷新页面后可恢复

### 2.2 高级功能

- 长按单条 item 可进行编辑
- 可对单条 item 进行左滑操作，出现删除按钮进行点击删除，类似QQ删除操作。
- 可对单条 item 进行右滑操作，出现用户自定义的日期，松手后返回原位置。
- 下方过滤列表添加urgent栏，可对活跃的 item 添加/取消红色的 urgent 标记，而已完成的 item 不可标记，且条目完成后默认取消标记
- 用户点击完成条目后，已完成条目会自动移动到列表下方位置
- 在各种过滤条件下的列表会检测是否为空，展示不同提示信息
- 设定日期：用户可以输入例如 a@2020/12/22的格式为条目设定日期，当设定日期与当前日期之前少于5天时，条目为红色，5-10天时条目为橙色，10天以上时条目为绿色。未设定日期时，默认为绿色条目
- 批量添加：用户可以输入例如 a+b+c 的格式批量添加 a、b、c 条目，同样 a@2020/12/22+b@2020/11/23+c@2021/12/24 也可进行批量添加。

## 4. 参考代码

- [TodoMVC](https://github.com/luics/web-dev/tree/master/examples/TodoMVC) by [@luics](https://github.com/luics)