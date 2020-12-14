<template>
  <el-upload
    class="comp__upload-img"
    action="doInHttpReq" name="file"
    accept="image/*"
    :before-upload="beforeUpload"
    :show-file-list="false"
    :http-request="httpRequest">
    <img v-if="showImg" :src="showImg" class="avatar" alt="">
    <i v-else class="el-icon-plus avatar-uploader-icon" />
  </el-upload>
</template>

<script>
/**
 * @validError(message): 验证错误 事件
 * */

export default {
  name: "UploadImg",
  props: {
    // 限制 文件 类型, 用 ','间隔 如： 'jpg,jpeg,png' 等
    fileType: { type: String, default: '' },
    // 文件最大值  单位 kb: '123K'   M: '321M'
    maxSize: { type: [String], default: '' },
    // 上传api
    uploadApi: { type: Function, default: () => () => {} },
    // 显示的图片
    showImg: { type: String, default: '' }
  },
  data() {
    return {
      result: {
        thumb_url: '', // thumb_url
        url: ''
      }
    }
  },
  methods: {
    beforeUpload(file) {
      const fileType = file.type
      if (fileType.indexOf('image') == -1) {
        this.$emit('validError', '请选择图片文件')
        return false
      }
      if (this.fileType) { // 有限制类型
        const typeArr = this.fileType.split(',')
        // 不在 指定 类型内
        if (!typeArr.some(i => fileType.indexOf(i) != -1)) {
          this.$emit('validError', `选择文件不为 ${this.fileType} 后缀`)
          return false
        }
      }
      if (this.maxSize) {
        const unit = this.maxSize[this.maxSize.length - 1].toLowerCase()
        const num = Number(this.maxSize.substring(0, this.maxSize.length - 1))
        // KB   MB
        const maxSizeNum = unit == 'k' ? num * 1024 : num * 1024 * 1024
        if (file.size > maxSizeNum) {
          this.$emit('validError', `文件过大，仅支持${this.maxSize}b以内的的文件`)
          return false
        }
      }
      return true
    },
    async httpRequest(e) {
      const {data} = await this.uploadApi(e.file)
      this.result.thumb_url = data.thumb_url
      this.result.url = data.url
      this.$emit('success', data) // 上传成功
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@pro_common/styles/colors.scss";
.comp__upload-img {
  /deep/.el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    /deep/ &.hover {
      border-color: #409EFF;
    }
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    background-color: $gray-less;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
    background-color: $gray-more;
  }
}
</style>
