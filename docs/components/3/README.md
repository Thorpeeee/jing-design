# drag
基于 sortablejs 的拖拽组件

## quick start

#### 配合 el-table 实现可拖拽表格
```vue
<template>
  <Drag
    types="table"
    class-name="el-table__body tbody"
  >
    <el-table :data="list">
      ...
    </el-table>
  </Drag>
</template>

<script>
export default {
  data() {
    return {
      // 表格拖拽后数据会自动排序，无需多余方法
      list: []
    }
  },
}
</script>
```

### 普通组件，需自行交换顺序
```vue
<template>
  <Drag
    types="upload"
    class-name="el-upload-list"
    @onDraggableEnd="handleDraggableEnd"
  >
    <el-upload :file-list="fileList">
      ...
    </el-upload>
  </Drag>
</template>

<script>
export default {
  data() {
    return {
      fileList: [],
    }
  },
  methods: {
    handleDraggableEnd({ newIndex, oldIndex }) {
      this.insertSortList(this.fileList, newIndex, oldIndex)
    },
    insertSortList(arr, newIndex, oldIndex) {
      const target = arr.splice(oldIndex, 1)[0]
      arr.splice(newIndex, 0, target)
    },
  },
}
</script>
```

## props

| 参数          |      说明              | 类型     | 可选值                   |  默认值   |
| ------------ | ---------------------- | ------- | ----------------------- | --------- |
| types | 写 table 时会自动排序 el-table 内的数据 | String | - | - |
| className | 需要拖拽的元素的容器的类名 | String | - | - |
| handle | 拖拽的控制位置的选择器 | String | - | - |
| animate | 动画速率  | Number  | - | 100 |
| disable | 禁止拖拽 | Boolean | — |  false |


## events

| 事件名          | 说明                | 参数         | 参数格式  |
| -------------- | ------------------ | ------------ | ---------|
| onDraggableEnd | 拖拽完成后触发 | sortable onEnd 事件的对象 | { newIndex, OldIndex... } |
