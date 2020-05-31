import Vue from 'vue'
import Whole from './Whole.vue'
import store from '../../store'
import axios from '../../control/filter/http.js'
import router from "./router";
import VueAxios from 'vue-axios'
Vue.use(VueAxios,axios);
Vue.config.productionTip = false


import 'element-ui/lib/theme-chalk/index.css';
import {
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Cascader,
  Button,
  Alert,
  Icon,
  MessageBox,
  Message,
  Notification
} from 'element-ui';

Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Button);
Vue.use(Alert);
Vue.use(Icon);
Vue.use(Cascader);
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;

new Vue({
  store,
  router,
  render: h => h(Whole)
}).$mount('#whole')
