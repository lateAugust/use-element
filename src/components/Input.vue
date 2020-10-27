<script>
export default {
  data() {
    return {
      names: ["suffix", "prefix", "prepend", "append"],
    };
  },
  methods: {
    change(e) {
      this.$emit("input", e);
    },
    /**
     * slots slot
     */
    createElement() {
      let elements = [];
      for (let [key, val] of Object.entries(this.$slots)) {
        let item = val[0];
        if (this.names.includes(key)) {
          let ele = <item.tag slot={item.data.slot}>{item.children}</item.tag>;
          elements.push(ele);
        }
      }
      return elements;
    },
  },
  computed: {
    form() {
      let parent = this.$parent;
      let parentName = parent.$options.componentName;
      while (parentName !== "ElForm") {
        parent = parent.$parent;
        parentName = parent.$options.componentName;
      }
      return parent;
    },
  },
  render() {
    const attrs = this.$attrs;
    return (
      <div class="dis-c">
        <el-input
          size={this.form.size}
          {...{ attrs }}
          onInput={(e) => {
            this.change(e);
          }}
        >
          {this.createElement()}
        </el-input>
      </div>
    );
  },
};
</script>
