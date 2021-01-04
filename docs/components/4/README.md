# operate-tag
对element-ui中的tag和autocomplete进行了组合，目前支持功能如下：
- 支持添加删除tag
- 支持标签模糊查询

## operate-tag组件

## 使用示例

```javascript
<template>
    <operate-tag
      title="单品及其他标签"
      label-width="80px"
      :tag-list="tagList"
      @close-tag="closeContentTag"
      @add-tag="addContentTag"
      @tag-search="mixTagSearch"
    />
</template>

<script>
    export default {
        data() {
          return {
            tagList: [{
              alTag: false,
              value: '',
              image: '',
            }],
          }
        },
        methods: {
            closeContentTag(index) {},
            addContentTag(index) {},
            mixTagSearch({ value, callback }) {},
        },
    }
</script>
```

## Option 属性

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- |------|:----:|-----|:-----:|
| title | 标题 | string | - | '' |
| label-width | 标题长度 | string | - | '' |
| tag-list | 标签列表| array | - | -


## events

| 事件名          | 说明                | 参数         |
| -------------- | ------------------ | ------------ |
| close-tag     | 删除标签   | function(index) {}  |
| add-tag     | 添加标签   | function(index) {}  |
| tag-search     |  模糊查询标签  | function({value, callback}) {}  |
