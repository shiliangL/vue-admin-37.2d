export function menuToTree(data) {
  const resData = data
  const tree = [] // 父级

  for (let i = 0; i < resData.length; i++) {
    // parentId 没有则为顶层父级
    if (!resData[i].parentId) {
      const obj = {
        id: resData[i].id,
        title: resData[i].title,
        children: []
      }
      tree.push(obj)
      resData.splice(i, 1)
      i--
    }
  }
  run(tree)
  function run(chiArr) {
    if (resData.length !== 0) {
      for (let i = 0; i < chiArr.length; i++) {
        for (let j = 0; j < resData.length; j++) {
          if (chiArr[i].id === resData[j].parentId) {
            const obj = {
              id: resData[j].id,
              title: resData[j].title,
              icon: resData[j].icon,
              resourceUrl: resData[j].resourceUrl,
              children: []
            }
            chiArr[i].children.push(obj)
            resData.splice(j, 1)
            j--
          }
        }
        run(chiArr[i].children)
      }
    }
  }

  return tree
}

// let data = allRes;
// // 属性配置信息
// let attributes = {
//     id: 'resourcesId',
//     parentId: 'parentId',
//     name: 'resName',
//     rootId: 1
// };
// let treeData = toTreeData(data, attributes);
