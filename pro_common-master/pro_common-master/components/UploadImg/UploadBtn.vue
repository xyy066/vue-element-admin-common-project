<template>
  <el-upload
    ref="upload"
    class="comp__upload-img"
    action="doInHttpReq" name="file"
    accept="image/*"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :before-upload="beforeUpload"
    :show-file-list="true"
    :file-list="fileList"
     multiple
    :limit="1"
    :on-exceed="handleExceed"
    :http-request="httpRequest">
    <el-button size="small" type="primary">点击上传</el-button>
    <div slot="tip" class="el-upload__tip">注：只能上传jpg/png文件，且不超过300kb,图片尺寸：1024*1082px</div>
  </el-upload>
</template>

<script>
/**
 * @validError(message): 验证错误 事件
 * */

export default {
  name: "UploadBtn",
  props: {
    // 限制 文件 类型, 用 ','间隔 如： 'jpg,jpeg,png' 等
    fileType: { type: String, default: '' },
    // 文件最大值  单位 kb: '123K'   M: '321M'
    maxSize: { type: [String], default: '' },
    // 上传api
    uploadApi: { type: Function, default: () => () => {} },
    // 显示的图片
    fileList: { type: Array, default: [] }
  },
  data() {
    return {
      result: {
        thumb_url: '', // thumb_url
        url: '',
      }
    }
  },
  methods: {
    $_aaa() {
      console.log(this.$refs.upload)
      this.$refs.upload.clearFiles()
    },
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
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      console.log(fileList)
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length+ fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
    },
    async httpRequest(e) {
      const {data} = await this.uploadApi(e.file)
      this.result.thumb_url = data.thumb_url
      this.result.url = data.url
      console.log(data)
      this.$emit('success', data) // 上传成功
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@pro_common/styles/colors.scss";
.comp__upload-img {
  /deep/.el-upload {
    // border: 1px dashed #d9d9d9;
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
