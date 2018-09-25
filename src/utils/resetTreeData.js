export function resetTreeData(data) {
  if (data.length === 0) {
    return data
  }

  const result = []
  const temp = {}

  data.forEach(function(item) {
    temp[item.id] = item
  })

  data.forEach(function(node) {
    const parent = temp[node.parentId]

    if (parent) {
      node.text = node.title || ''
      node.label = node.title || ''

      if (node.flag) {
        node.state = { opened: true, selected: true }
      }

      if (!parent['children']) {
        parent['children'] = []
      }

      parent['children'].push(node)
    } else {
      node.text = node.title || ''
      node.label = node.title || ''

      if (node.flag) {
        node.state = { opened: true, selected: true }
      }
      result.push(node)
    }
  })
  return result
}
