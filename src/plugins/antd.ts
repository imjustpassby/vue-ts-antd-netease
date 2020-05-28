/**
 * ant design 组件全局注册
 *
 * @dependency ant-design-vue
 */

import {
  Alert,
  Avatar,
  BackTop,
  Badge,
  Breadcrumb,
  Button,
  Card,
  Carousel,
  Checkbox,
  Col,
  Comment,
  ConfigProvider,
  Divider,
  Drawer,
  Dropdown,
  Form,
  Icon,
  Input,
  Layout,
  List,
  LocaleProvider,
  Menu,
  message,
  Modal,
  notification,
  Pagination,
  Popover,
  Progress,
  Rate,
  Row,
  Skeleton,
  Spin,
  Table,
  Tabs,
  Tag,
  Tooltip
} from 'ant-design-vue';
import Vue from 'vue';

Vue.prototype.$message = message;
Vue.prototype.$notification = notification;
Vue.prototype.$info = Modal.info;
Vue.prototype.$success = Modal.success;
Vue.prototype.$error = Modal.error;
Vue.prototype.$warning = Modal.warning;
Vue.prototype.$confirm = Modal.confirm;
Vue.prototype.$form = Form;
// Vue.prototype.$destroyAll = Modal.destroyAll;

/* v1.1.3+ registration methods */
/**
 * 样式未全局引入，注册组件时，需手动引入当前组件的样式
 *
 * @example
 * import 'ant-design-vue/lib/badge/style'; // 引入组件样式
 * Vue.use(Badge); // 注册组件
 */

// 警告提示
import 'ant-design-vue/lib/alert/style';
Vue.use(Alert);

// 头像
import 'ant-design-vue/lib/avatar/style';
Vue.use(Avatar);

import 'ant-design-vue/lib/avatar/style';
Vue.use(Comment);

// 返回顶部
import 'ant-design-vue/lib/back-top/style';
Vue.use(BackTop);

// 标签
import 'ant-design-vue/lib/badge/style';
Vue.use(Badge);

// 面包屑
import 'ant-design-vue/lib/breadcrumb/style';
Vue.use(Breadcrumb);

// 按钮
import 'ant-design-vue/lib/button/style';
Vue.use(Button);

import 'ant-design-vue/lib/card/style';
Vue.use(Card);

import 'ant-design-vue/lib/carousel/style';
Vue.use(Carousel);

// 多选框
import 'ant-design-vue/lib/checkbox/style';
Vue.use(Checkbox);

import 'ant-design-vue/lib/col/style';
Vue.use(Col);

import 'ant-design-vue/lib/divider/style';
Vue.use(Divider);

import 'ant-design-vue/lib/drawer/style';
Vue.use(Drawer);

// 下拉菜单
import 'ant-design-vue/lib/dropdown/style';
Vue.use(Dropdown);

// 表单
import 'ant-design-vue/lib/form/style';
Vue.use(Form);

// 图标
import 'ant-design-vue/lib/icon/style';
Vue.use(Icon);

// 输入框
import 'ant-design-vue/lib/input/style';
Vue.use(Input);

// 布局
import 'ant-design-vue/lib/layout/style';
Vue.use(Layout);

// 列表
import 'ant-design-vue/lib/list/style';
Vue.use(List);

// 全局化配置
Vue.use(LocaleProvider);
Vue.use(ConfigProvider);

// 导航菜单
import 'ant-design-vue/lib/menu/style';
Vue.use(Menu);

import 'ant-design-vue/lib/modal/style';
Vue.use(Modal);

import 'ant-design-vue/lib/pagination/style';
Vue.use(Pagination);

import 'ant-design-vue/lib/popover/style';
Vue.use(Popover);

import 'ant-design-vue/lib/progress/style';
Vue.use(Progress);

import 'ant-design-vue/lib/rate/style';
Vue.use(Rate);

import 'ant-design-vue/lib/row/style';
Vue.use(Row);

import 'ant-design-vue/lib/spin/style';
Vue.use(Spin);

import 'ant-design-vue/lib/table/style';
Vue.use(Table);

// 标签页
import 'ant-design-vue/lib/tabs/style';
Vue.use(Tabs);

import 'ant-design-vue/lib/tag/style';
Vue.use(Tag);

import 'ant-design-vue/lib/tooltip/style';
Vue.use(Tooltip);

import 'ant-design-vue/lib/skeleton/style';
Vue.use(Skeleton);
