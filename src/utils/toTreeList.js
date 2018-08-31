
export function listToTree(data) {
  if (!Array.isArray(data)) return
  const temp = {}
  const result = []
  // 遍历子节点
  const iterNode = (node) => {
    const { id } = node
    for (const key in temp) {
      if (temp[key].parentId === id) {
        temp[key].flag = true
        iterNode(temp[key])
      }
    }
  }
  // 遍历父节点
  const iterParent = (parent) => {
    if (temp[parent.parentId]) {
      temp[parent.parentId].flag = true
      iterParent(temp[parent.parentId])
    }
  }
  // data.forEach(item => temp[item.id] = item)
  for (const item of data) {
    temp[item.id] = item
  }
  data.forEach(item => {
    const { flag, parentId } = item
    const parent = temp[parentId]

    if (!parent && typeof flag === 'string') {
      iterNode(item)
    } else if (parent && typeof flag === 'string') {
      parent.flag = true
      iterParent(parent)
      iterNode(item)
    }
  })

  data.forEach(item => {
    const { flag, parentId } = item
    const parent = temp[parentId]
    if (parent && parent.flag && flag) {
      item.label = item.title
      item.text = item.title
      if (!parent['children']) {
        parent['children'] = []
      }
      parent['children'].push(item)
    } else if (!parent && flag) {
      item.label = item.title
      item.text = item.title
      result.push(item)
    }
  })
  // 设置所有菜单列表
  // this.menuList = result
  return result
}
