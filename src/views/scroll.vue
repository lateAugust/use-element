<template>
  <div style="width: 500px; height: 500px; border: 1px solid #000;">
    <el-scrollbar
      :tag="tag"
      style="height: 100%; width: 100%;"
      ref="bar"
      :noresize="noresize"
      class="none-scroll"
    >
      <div style="width: 1000px; height: 1000px;"></div>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    scroll: Number,
    vertical: {
      // 滚动条的方向, true为纵向
      type: Boolean,
      default: true,
    },
    noresize: { type: Boolean, default: false }, // 如果 container 尺寸不会发生变化，最好设置它可以优化性能
    tag: {
      type: String,
      default: "div",
    },
  },
  watch: {
    scroll(v) {
      this.handlerScroll();
    },
  },
  methods: {
    handlerScroll(v) {
      if (v < 0) throw new Error("滚动高(宽)度必须大于0");
      if (v === 0) return;
      this.$refs.bar.wrap[
        this.vertical ? "scrollTop" : "scrollLeft"
      ] = this.scroll;
      this.$nextTick((_) => {
        this.$refs.bar.handleScroll();
      });
    },
  },
  mounted() {
    this.handlerScroll(this.scroll || 0);
  },
};
</script>

<style lang="scss" scoped>
.none-scroll ::v-deep .el-scrollbar__wrap {
  &::-webkit-scrollbar {
    display: none;
  }
  margin: 0;
}
</style>
