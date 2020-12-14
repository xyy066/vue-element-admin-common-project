<template>
<div class="dev-mgr__card--example">
  <CardSimple title="components/Title/TitleBar.vue 示例">
    <NormalForm :config="formConfig" />
  </CardSimple>
</div>
</template>

<script>
import CardSimple from "@pro_common/components/Card/CardSimple.vue"
import NormalForm from "@pro_common/components/NormalForm/NormalForm.vue"

export default {
  name: "DevMgrCardExample",
  data() {
    return {
      title: "components/Title/TitleBar.vue 示例", // 测试混合git
      formConfig: { // 表单配置项
        inline: true,
        items: [
          { type: "input", initVal: "", prop: "a", label: "示例Label", placeholder: "请填写示例value", rightClass: "test-right-class" },
          {
            type: "select", initVal: "", prop: "b", label: "示例Label1", placeholder: "请填写示例value1", rightClass: "test-right-class",
            items: [{ label: "开启", value: "1" }, { label: "关闭", value: "2" }],
            togglePrefix: {
              active: val => val == "1"
            }
          },
          { type: "input", initVal: "", prop: "c", label: "示例Label3", placeholder: "请填写示例value3", rightClass: "test-right-class" },
          { type: "input", initVal: "", prop: "d", label: "示例Label3", placeholder: "请填写示例valued", rightClass: "test-right-class" },
          { type: "input", initVal: "", prop: "e", label: "示例Label3", placeholder: "请填写示例valuee", rightClass: "test-right-class" },
          { type: "input", initVal: "", prop: "f", label: "示例Label3", placeholder: "请填写示例valuef", rightClass: "test-right-class" }
        ]
      }
    }
  },
  components: {
    CardSimple,
    NormalForm
  }
}
</script>

<style lang="scss" scoped>
.dev-mgr__card--example {
  box-sizing: border-box;
  padding: 20px;
  /deep/ .test-right-class {
    width: 200px;
  }
}
</style>
