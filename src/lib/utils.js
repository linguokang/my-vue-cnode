
import timeago from 'timeago.js';


exports.getTabInfo = (tab, good, top, isClass) => {
  let str = '';
  let className = '';
  if (top) {
    str = '置顶';
    className = 'success';
  } else if (good) {
    str = '精华';
    className = 'warning';
  } else {
    switch (tab) {
      case 'share':
        str = '分享';
        className = 'danger';
        break;
      case 'ask':
        str = '问答';
        className = 'info';
        break;
      case 'job':
        str = '招聘';
        className = 'info';
        break;
      default:
        str = '暂无';
        className = 'info';
        break;
    }
  }
  return isClass ? className : str;
}

exports.getTimeAgo = (time) => {
  var timeagoInstance = timeago();
  return timeagoInstance.format(time,'zh_CN');
};


