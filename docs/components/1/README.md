# table
表格组件
![avatar](https://cdn.nlark.com/yuque/0/2019/png/294832/1573561418287-e39d2904-c51b-47cf-82d8-a682fe0fd55b.png)

## 使用示例

```javascript
<template>
    <table
        :list="list"
        :loading="loading"
        :config="config"
        @tableEvents="tableEvents" />
</template>

<script>
    import moment from 'moment'
    // 示例自定义组件
    import { BtnGroup } from './someWhere'


    export default {
        components: {
            BtnGroup
        },
        data() {
            return {
                loading: false,
                config: {
                    // 表格多选配置，非必填
                    selectOptions: {
                      	// 是否需要表格可多选
                        needSelect: true,
                      	// 选择项变化事件需要调用的方法名
                        event: 'selectChange',
                    },
                    // 分页配置，必填
                    pageOptions: {
                      	// 当前总条目数
                        total: 1,
                      	// 当前每页条目数
                        pageSize: 20,
                      	// 当前页码
                        currentPage: 1,
                      	// 当前每页可选条目数
                        pageSizes: [10, 20, 50, 100],
                    },
                    // 表格配置，必填
                    tableOptions: [
                        {
                            width: '120',
                            align: 'center',
                            label: '自定义组件',
                            type: 'com',
                            // 自定义组件
                            compInfo: {
                                // 自定义组件名
                                comp: BtnGroup,
                            },
                        },
                        {
                            // 当前列宽度
                            width: '120',
                            // 当前列取值
                            prop: 'id',
                            // 当前列文案
                            label: 'id',
                            // 当前列对齐方式，center/left/right
                            align: 'center',
                            // 当前列类型，text/img/btn/com/time
                            type: 'text',
                        },
                        {
                            width: '120',
                            label: '操作人/时间',
                            prop: 'editTime',
                            align: 'center',
                            // 当前列渲染模板方法
                            html: ({ adminUserName, editTime }) => (
                                `
                                    <p>操作人: ${ adminUserName || '--' }</p>
                                    <p>时间: ${ this.formatTime(editTime) }</p>
                                `
                            ),
                            // 当前列是否需要依据排序，不需要使用列排序可不填该项
                            sortable: 'custom',
                            type: 'text',
                        },
                        {
                            type: 'time',
                            // 时间显示格式，不填默认是'YYYY-MM-DD HH:mm:ss'，具体格式参考 http://momentjs.cn/docs/#/displaying/
                            formatRule: 'YYYY-MM-DD HH:mm:ss',
                            width: '120',
                            label: '时间',
                            // 必须保证 prop 的值是秒级时间戳，例如：1574331468
                            prop: 'editTime',
                            align: 'center',
                        },
                        {
                            width: '120',
                            // 当前列图片预览组件取值，类型为数组，不需要使用图片预览组件可不填该项
                            imagePaths: 'imagePaths',
                            label: '交易凭证',
                            align: 'center',
                        },
                        {
                            width: '120',
                            label: '操作',
                            align: 'center',
                            type: 'btn',
                            // 是否固定列位置，left/right，不需要使用固定列可不填该项
                            fixed: 'right',
                            // 当前列按钮配置，类型为数组
                            btnInfo: [
                                {
                                    // 当前按钮文案
                                    btnText: '编辑',
                                    // 当前按钮类型，text/button
                                    type: 'text',
                                    // 当前按钮大小，medium/small/mini
                                    size: 'small',
                                    // 当前按钮点击需要调用的方法名
                                    event: 'handleEdit',
                                },
                                {
                                    btnText: '删除',
                                    type: 'text',
                                    size: 'small',
                                    event: 'handleDelete',
                                },
                            ]
                        },
                    ]
                },
            }
        },
        methods: {
            comEventHandle(res) {
                console.log(res)
            },
            selectChange(res) {
                console.log(res)
            },
            handleEdit(row) {
              	console.log(row)
            },
            handleDelete(row) {
              	console.log(row)
            },
            tableEvents(eventObject) {
                this[eventObject.eventName](eventObject.itemData)
            },
            formatTime(val) {
                if (!val) return '--'
                return moment(val * 1000).format('YYYY-MM-DD HH:mm:ss')
            },
        },
    }
</script>
```
```javascript
// 示例自定义组件 BtnGroup

<template>
    <div>
        <el-button v-if="rowData.valid === 1" @click="handleClick">
            编辑
        </el-button>
    </div>
</template>

<script>
export default {
    props: {
        // 必须要有这个props 用于接收 table 当前 column 的数据
        rowData: {
            type: Object,
            required: true
        }
    },
    data() {
        return {}
    },
    methods: {
        handleClick() {
            // 此处的 emit 事件名固定为 'innerEvents' 用于 table 组件接收处理
            this.$emit('innerEvents', {
                // eventName 可随意自定义 只需要调用层单文件有同名的 methods 即可
                eventName: 'comEventHandle'
            })
        }
    }
}
</script>

<style scoped lang="scss"></style>

```

## props

| 参数          |      说明              | 类型     | 可选值                   |  默认值   |
| ------------ | ---------------------- | ------- | ----------------------- | --------- |
| list         | table 显示的数据  | Array  | -                       | - |
| loading      | table loading 状态的当前 this.data 对应 key  | Boolean  | true/false | - |
| config.tableOptions | table 配置参数  | Array  | 数据结构和可选值见使用示例 | [] |
| config.pageOptions | 分页配置参数  | Object  | 数据结构和可选值见使用示例 | {} |


## events

| 事件名          | 说明                | 参数         |
| -------------- | ------------------ | ------------ |
| tableEvent     | table 内抛出的事件   | eventObject  |
