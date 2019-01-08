import Vue from 'vue';

export default {
  nothing(){},
  getSize(size, multiple = 1) {
    let num = parseFloat(size);
    let unit = size.replace(num, '');
    return (parseFloat(size) * multiple).toFixed(4) + unit;
  },
  getRandomNum(max = 1, min = 0, fixed = 0) {
    return (Math.random() * (max - min) + min).toFixed(fixed);
  },
  getRandomColor(a = 1) {
    return `rgba(${this.getRandomNum(255)},${this.getRandomNum(255)},${this.getRandomNum(255)},${a})`;
  },
  $toast(obj = {}) {
    let Toast = Vue.extend(require('../base/toast').default);
    let toast = new Toast({el: document.createElement('div')});
    toast.msg = typeof obj === 'string' ? obj : obj.msg;
    toast.duration = obj.duration === undefined ? 2000 : obj.duration;
    toast.iconClass = obj.iconClass || '';
    toast.content = obj.content || '';
    toast.position = obj.position || 'top';
    document.body.appendChild(toast.$el);
  },
  $message(obj = {}) {
    let Message = Vue.extend(require('../base/message').default);
    let msg = new Message({el: document.createElement('div')});
    function nothing(){}
    msg.title = obj.title || '提示';
    msg.cancelText = obj.cancelText || '';
    msg.sureText = obj.sureText || '确定';
    msg.html = obj.html || '';
    msg.content = obj.content || '';
    msg.$on('sureCallback', obj.sure || nothing);
    msg.$on('cancelCallback', obj.cancel || nothing);
    document.body.appendChild(msg.$el);
  }
}
