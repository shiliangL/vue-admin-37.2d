export function toTreeData(data, attributes) {
  const resData = data
  const tree = []

  for (let i = 0; i < resData.length; i++) {
    if (resData[i].resParentId === attributes.rootId) {
      const obj = {
        id: resData[i][attributes.id],
        title: resData[i][attributes.name],
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
          if (chiArr[i].id === resData[j][attributes.parentId]) {
            const obj = {
              id: resData[j][attributes.id],
              title: resData[j][attributes.name],
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
//     parentId: 'resParentId',
//     name: 'resName',
//     rootId: 1
// };
// let treeData = toTreeData(data, attributes);
