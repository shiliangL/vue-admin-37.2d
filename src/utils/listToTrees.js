
export function listToTrees(data) {
  if (Array.isArray(data)) {
    const parent = []
    for (let i = 0; i < data.length; i++) {
      const element = data[i]
      if (element.parentId === '0') {
        element.children = []
        parent.push(element)
        data.splice(i, 1)
        i--
      }
    }

    const run = parentArr => {
      for (let f = 0; f < parentArr.length; f++) {
        for (let s = 0; s < data.length; s++) {
          if (data[s].parentId === parentArr[f].id) {
            data[s].children = []
            parentArr[f].children.push(data[s])
            data.splice(s, 1)
            s--
          }
        }
        run(parentArr[f].children)
      }
    }

    run(parent)

    return parent
  }
}
