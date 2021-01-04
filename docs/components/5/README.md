# autocomplete
基于element-ui autocomplete 进行封装的自动联想组件

## 使用示例

```javascript
// 场景一: 接口获取所有联想项，组件内自行依据用户输入的模糊字符串进行联想筛选，并且不需要数据回显
<template>
    <autocomplete
        v-model="form.name"
        :config="config"
        :service="fetchOptions"
        @emitSelectData="handleSelect"
        ></autocomplete>
</template>

<script>
    data() {
        return {
            config: {
                // 选中项展示类型 single
                type: 'single',
                // 联想项获取方式 local/ajax
                dataType: 'local',
                // 输入字符匹配的字段名
                queryKey: 'userName',
            },
            // 表单绑定数据
            form: {
                name: '',
            },
        }
    },
    methods: {
        fetchOptions() {
            return new Promise((resolve, reject) => {
                API.fetchOptions({}).then(res => {
                    resolve(res.data.list)
                    // res.data.list 的数据结构, 其中联想字段和 config.queryKey 同名
                    // [
                    //     {
                    //         userId: '123',
                    //         userName: '用户1',
                    //     },
                    //     {
                    //         userId: '321',
                    //         userName: '用户2',
                    //     },
                    // ]
                })
            })
        },
        handleSelect(data) {
            console.log(data)
            console.log(this.form.name)
        },
    },
</script>
```

```javascript
// 场景二: 依据用户输入的模糊字符串，接口实时返回联想项，并且不需要数据回显
<template>
    <autocomplete
        v-model="form.name"
        :config="config"
        :service="fetchOptions"
        @emitSelectData="handleSelect"
        ></autocomplete>
</template>

<script>
    data() {
        return {
            config: {
                // 选中项展示类型 single
                type: 'single',
                // 联想项获取方式 local/ajax
                dataType: 'ajax',
                // 输入字符匹配的字段名
                queryKey: 'userName',
            },
            // 表单绑定数据
            form: {
                name: '',
            },
        }
    },
    methods: {
        fetchOptions(str) {
            return new Promise((resolve, reject) => {
                API.fetchOptions({
                    name: str,
                }).then(res => {
                    resolve(res.data.list)
                    // res.data.list 的数据结构, 其中联想字段和 config.queryKey 同名
                    // [
                    //     {
                    //         userId: '123',
                    //         userName: '用户1',
                    //     },
                    //     {
                    //         userId: '321',
                    //         userName: '用户2',
                    //     },
                    // ]
                })
            })
        },
        handleSelect(data) {
            console.log(data)
            console.log(this.form.name)
        },
    },
</script>
```

```javascript
// 场景三: 接口获取所有联想项，组件内自行依据用户输入的模糊字符串进行联想筛选，并且需要数据回显
<template>
    <autocomplete
        v-model="form.name"
        :config="config"
        :back-service="fetchOptions2"
        @emitSelectData="handleSelect"
        ></autocomplete>
</template>

<script>
    mounted() {
        this.form.name = '123'
    },
    data() {
        return {
            config: {
                // 选中项展示类型 single
                type: 'single',
                // 联想项获取方式 local/ajax
                dataType: 'local',
                // 输入字符匹配的字段名
                queryKey: 'userId',
                // 选中联想项展示的字段名
                viewKey: 'userName',
            },
            // 表单绑定数据
            form: {
                name: '',
            },
        }
    },
    methods: {
        fetchOptions2(str) {
            return new Promise((resolve, reject) => {
                API.fetchOptions2({}).then(res => {
                    resolve(res.data.list)
                    // res.data.list 的数据结构, 其中联想字段和 config.viewKey 同名
                    // [
                    //     {
                    //         userId: '123',
                    //         userName: '用户1',
                    //     },
                    //     {
                    //         userId: '321',
                    //         userName: '用户2',
                    //     },
                    // ]
                })
            })
        },
        handleSelect(data) {
            console.log(data)
            console.log(this.form.name)
        },
    },
</script>
```

```javascript
// 场景四: 依据用户输入的模糊字符串，接口实时返回联想项，并且需要数据回显
<template>
    <autocomplete
        v-model="form.name"
        :config="config"
        :service="fetchOptions"
        :back-service="fetchOptions2"
        @emitSelectData="handleSelect"
        ></autocomplete>
</template>

<script>
    mounted() {
        this.form.name = '123'
    },
    data() {
        return {
            config: {
                // 选中项展示类型 single
                type: 'single',
                // 联想项获取方式 local/ajax
                dataType: 'local',
                // 输入字符匹配的字段名
                queryKey: 'userId',
                // 选中联想项展示的字段名
                viewKey: 'userName',
            },
            // 表单绑定数据
            form: {
                name: '',
            },
        }
    },
    methods: {
        fetchOptions2() {
            return new Promise((resolve, reject) => {
                API.fetchOptions2({}).then(res => {
                    resolve(res.data.list)
                    // res.data.list 的数据结构, 其中联想字段和 config.viewKey 同名
                    // [
                    //     {
                    //         userId: '123',
                    //         userName: '用户1',
                    //     },
                    //     {
                    //         userId: '321',
                    //         userName: '用户2',
                    //     },
                    // ]
                })
            })
        },
        fetchOptions(str) {
            return new Promise((resolve, reject) => {
                API.fetchOptions2({
                    name: str,
                }).then(res => {
                    resolve(res.data.list)
                    // res.data.list 的数据结构, 其中联想字段和 config.viewKey 同名
                    // [
                    //     {
                    //         userId: '123',
                    //         userName: '用户1',
                    //     },
                    //     {
                    //         userId: '321',
                    //         userName: '用户2',
                    //     },
                    // ]
                })
            })
        },
        handleSelect(data) {
            console.log(data)
            console.log(this.form.name)
        },
    },
</script>
```

## props

| 参数          |      说明              | 类型     | 可选值                   |  默认值   |
| ------------ | ---------------------- | ------- | ----------------------- | --------- |
| v-model      | 绑定值                  | string  | -                       | -         |
| config       | 配置参数                | Object  | 数据结构和可选值见使用示例  | {}        |
| service      | 联想项获取方法           | Function | 见使用示例               | () => {} |
| back-service | 回显数据获取方法         | Function | 见使用示例               | () => {} |


## events

| 事件名          | 说明                | 参数          |
| -------------- | ------------------  | ------------ |
| emitSelectData | 点击选中联想项时触发   | 选中联想项    |
