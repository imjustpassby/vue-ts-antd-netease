/* eslint-disable */
/**
 * 该文件是为了按需加载，剔除掉了一些不需要的框架组件。
 * 减少了编译支持库包大小
 *
 * 当需要更多组件依赖时，在该文件加入即可
 */
import Vue from 'vue';
import Antd from 'ant-design-vue';
let {
  BackTop,
  LocaleProvider,
  Layout,
  Input,
  Pagination,
  Button,
  Form,
  Row,
  Col,
  Modal,
  Table,
  Tabs,
  Icon,
  Badge,
  Popover,
  Dropdown,
  List,
  Avatar,
  Spin,
  Menu,
  Drawer,
  Tooltip,
  Alert,
  Tag,
  Divider,
  Carousel,
  Skeleton,
  message,
  ConfigProvider,
  Progress,
  Comment,
  Empty
} = Antd;

Vue.use(Empty);
Vue.use(Comment);
Vue.use(Progress);
Vue.use(ConfigProvider);
Vue.use(BackTop);
Vue.use(LocaleProvider);
Vue.use(Pagination);
Vue.use(Layout);
Vue.use(Input);
Vue.use(Button);
Vue.use(Form);
Vue.use(Row);
Vue.use(Col);
Vue.use(Modal);
Vue.use(Table);
Vue.use(Tabs);
Vue.use(Icon);
Vue.use(Badge);
Vue.use(Popover);
Vue.use(Dropdown);
Vue.use(List);
Vue.use(Avatar);
Vue.use(Spin);
Vue.use(Menu);
Vue.use(Drawer);
Vue.use(Tooltip);
Vue.use(Alert);
Vue.use(Tag);
Vue.use(Divider);
Vue.use(Skeleton);
Vue.use(Carousel);
// Vue.use(VueCropper)
// Vue.use(notification)

Vue.prototype.$confirm = Modal.confirm;
Vue.prototype.$message = message;
Vue.prototype.$info = Modal.info;
Vue.prototype.$success = Modal.success;
Vue.prototype.$error = Modal.error;
Vue.prototype.$warning = Modal.warning;
