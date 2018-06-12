
export function filterStatus(status) {
  switch (status) {
    case 0:
      return '待发货'
    case 1:
      return '待收货'
    case 2:
      return '退换货'
    case 3:
      return '已完成'
    case 4:
      return '已取消'
    case 5:
      return '已关闭'
    case 6:
      return '待付款'
    default:
      return ''
  }
}
