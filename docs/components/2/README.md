# upload
upload组件基于elementUI的upload上传做了二次封装，目前支持功能如下：
- 对图片、文件、视频三种不同资源类型的上传展示
- 支持第三方阿里云和七牛云两种上传方式
- 资源大小、数量、类型限制可配置
- 支持单个和批量上传
- 支持上传文件列表可控制显示与隐藏
- 提供处理文件大小的单位转换的方法
- 支持传入width和height进行图片剪裁
- 支持传入second、width、height进行视频截帧
- 支持上传覆盖功能
- 支持自定义上传校验beforeUpload
- 支持去掉element默认上传动画 解决编辑动画不友好行为
- 增加fileUrl.sync属性, 代处理handleUpload,handleRemove事件回调
- 增加fileUrl.sync属性, 文件回显
- 增加视频上传限制，支持清晰度(仅高清)、分辨率、码率、尺寸、大小校验、时长
- 图片默认上传有展示状态(loading, success, fail)
- 批量上传按照文件选择顺序返回
- 支持拖拽排序
- 支持通过 slot 来自定义，按钮和展示区域
- <font color=red>注意：不要用同一个变量来传递给fileSource和接受handleUpload返回的数组!!!</font>（可能会引起正在上传的文件丢失）

## 文件/视频上传：

## 照片墙

## 使用示例

```javascript
<template>
  <div class="base-upload">
    <!--采用七牛云上传图片 只能上传1张.png的图片 且图片大小不能超过1Mb 取消上传element动画 -->
    <upload
        ref="Upload"
        :third-type="1"
        :limit="1"
        :size="1"
        img-type=".png"
        :no-transition="true"
        @handleUpload="handleUpload"
        @handleRemove="handleRemove"
      />
  </div>
</template>

<script>

export default {
  data() {
    return {
      // 资源列表
      dataList: []
    }
  },
  methods: {
    // 上传回调
    handleUpload(data) {
      this.dataList = data
      console.log('dataList', this.dataList)
    },
    // 删除
    handleRemove() {
      // todo 删除
      this.dataList = []
    }
  }
}
</script>
```

## props

| 参数          |      说明              | 类型     | 可选值                   |  默认值   |
| ------------ | ---------------------- | ------- | ----------------------- | --------- |
| beforeUpload | 参照 el-upload | function | - | - |
| thirdType | 第三方上传方式 | number  | 1:七牛云 / 2:阿里云| 2|
| type | 上传类型  | string  | img  / video / file | img |
| limit | 最大允许上传个数 | number | — |  10 |
| size | 最大允许资源大小（单位：Mb）  | number  | - | - |
| imgType | 允许上传图片的类型  | string  | - | '.png,.jpg,.jpeg' |
| videoType | 允许上传的视频类型，和type=’video‘配合使用  | string  | - | 'video/mp4,video/mov' |
| fileType | 允许上传的文件类型(可传入你想要限制的文件类型的后缀名如'.txt')和type=’file‘配合使用  | string  | - | '.xls, .xlsx,.doc,.pdf' |
| multiple | 是否支持多选文件  | boolean  | true/false | false |
| isFileShow | 是否显示已上传文件列表  | boolean  | true/false | true |
| fileSource | 需要回显的上传的文件列表, 例如: [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}]  | array  | - | [] |
| width | 图片剪裁宽 | number  | - | - |
| height | 图片剪裁高 | number  | - | - |
| second | 视频截帧（单位s） | number  | - | - |
| uploadText | 上传按钮文案 | string  | - | 点击上传 |
| cover | 是否支持上传覆盖(开启后默认 limit: '1'，请勿再配置 limit 参数) | boolean  | - | false |
| noTransition | 是否取消上传动画 | boolean  | - | false |
| videoRules | 视频上传规则 | object  | - | null |
| definitionDict | 自定义清晰度标准 存在则覆盖默认spu标准 | object:{ key: videoRules } key与videoRules.definition一致时校验 | - | { high:{ codeRate: {min: 0.56,max: 0 }, maxSize: 120 } } |


## videoRules说明，所有参数均非必传，按需组合 [详情见](./src/VideoUploadValidator.js)
| 参数          |      说明              | 类型     | 可选值                   |  默认值   |
| ------------ | ---------------------- | ------- | ----------------------- | --------- |
| resolution | 允许的分辨率组合 | array | ['240p','360p','480p','720p','1080p','1440p','2160p'] 对应分辨率如下| [] |
| dimensions | 允许的视频尺寸组合 | array  | ['426*240','640*360','854*480','1280*720','1920*1080','2560*1440','3840*2160'] | [] |
| aspectRatio | 允许的宽高比组合  | array  | ['16/9','4/3','1/1','3/4','number/number'] | [] |
| duration | 视频时长（单位：秒) | object | {min:number, max:number} |  {min:0, max:0} |
| codeRate | 视频码率 (单位: mbps) | object  | {min:number, max:number}  | {min:0, max:0} |
| definition | 清晰度标准 仅只支持spu视频标准 | string  | 'high'   | '' |
| maxSize | 最大允许资源大小（单位：Mb） | number  | - | 0 |


## events

| 事件名          | 说明                | 参数         | 参数格式  |
| -------------- | ------------------ | ------------ | ---------|
| handleUpload     | 组件上传成功事件，抛出文件数组   | uploadList  | [{url:'xxx',name:'xxx',size:'xxx'}] |
| handleRemove     | 删除资源   | -  | - |
| fileUrl.sync     | 组件上传、删除时更新绑定值 | xx(绑定的属性,仅支持String/Array值类型)  | String:{上传:url字符串,移除:''}  Array:{ 上传:[url字符串，个数受limit参数影响],移除:[] } |

## Methods

| 方法名          | 说明                | 参数         | 结果示例  |
| -------------- | ------------------ | ------------ | ---------|
| handleQinImg     | 七牛云图片剪裁   | url、width、height  | - |
| handleQinVideo     | 七牛云视频截帧   | url, second, width, height  | - |
| handleAliImg     | 阿里云图片剪裁   | url、width、height  | - |
| handleAliVideo     | 阿里云视频截帧   | url, second, width, height  | - |
| handleSize |  处理资源单位转换 | fileSize （单位：byte）| 转换成对应的B/KB/MB/GB |
| handleReset | 清空当前资源 | - | — |
