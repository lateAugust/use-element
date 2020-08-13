<template>
  <el-scrollbar
    :tag="tag"
    style="height: 100%; width: 100%;"
    ref="bar"
    :noresize="noresize"
    class="none-scroll"
  >
    <slot></slot>
  </el-scrollbar>
</template>

<script>
/*
 * 注意, 不要同时出现纵向和横向的滚动条, 否则自己要控制好事件的变化
 * */
export default {
  data() {
    return {};
  },
  props: {
    /*
     * 滚动条的默认位置, 可以加载完成后变化
     * */
    scroll: Number,
    vertical: {
      // 滚动条的方向, true为纵向
      type: Boolean,
      default: true,
    },
    noresize: { type: Boolean, default: true }, // 如果 container 尺寸不会发生变化，最好设置(true)它可以优化性能
    tag: {
      type: String,
      default: "div",
    },
    /**
     * onScroll事件, 返回e.target
     */
    onScroll: {
      type: Function,
    },
    disabled: {
      type: Boolean,
      default: true,
    },
    /*
     * 距离底部多少触发, 默认0
     * */
    reachBottom: {
      type: Number,
      default: 0,
    },
    /*
     * 距离顶部多少触发, 默认0
     * */
    reachTop: {
      type: Number,
      default: 0,
    },
    /*
     * 距离左边多少触发, 默认0
     * */
    reachLeft: {
      type: Number,
      default: 0,
    },
    /*
     * 距离右边多少触发, 默认0
     * */
    reachRight: {
      type: Number,
      default: 0,
    },
  },
  watch: {
    scroll() {
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
    handleScroll(e) {
      let target = e.target;
      this.onScroll && this.onScroll(target);
      if (this.vertical) {
        let { scrollTop, offsetHeight, scrollHeight } = target;
        if (scrollTop < this.reachTop) this.$emit("reach-top");
        if (scrollHeight - offsetHeight - scrollTop <= this.reachBottom)
          this.$emit("reach-bottom");
      } else {
        let { scrollLeft, offsetWidth, scrollWidth } = target;
        if (scrollLeft === this.reachLeft) this.$emit("reach-left");
        if (scrollWidth - offsetWidth - scrollLeft <= this.reachRight)
          this.$emit("reach-right");
      }
    },
  },
  mounted() {
    this.handlerScroll(this.scroll || 0);
    if (this.disabled) return;
    this.$nextTick(() => {
      let scroll = document.querySelector(".none-scroll .el-scrollbar__wrap");
      if (!scroll) return;
      scroll.addEventListener("scroll", this.handleScroll);
    });
  },
};
</script>

<style lang="scss" scoped>
.none-scroll ::v-deep .el-scrollbar__wrap {
  &::-webkit-scrollbar {
    display: none;
  }
  margin: 0 !important;
}
</style>
