<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: { type: String, default: '' },
    title: { type: String, default: '' },
    redNumber: { type: [Number, String], default: 0 }
  },
  render(h, context) {
    const { icon, title, redNumber } = context.props
    const vnodes = []
    if (icon) vnodes.push(<svg-icon icon-class={icon}/>)
    if (title) {
      if (!redNumber) { // 没红点数
        vnodes.push(<span slot='title'>{(title)}</span>)
      } else {
        vnodes.push(
          <el-badge slot='title' value={redNumber}>
            <span>{(title)}</span>
          </el-badge>
        )
      }
    }
    return vnodes
  }
}
</script>
