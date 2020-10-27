<script>
export default {
  methods: {
    label(item, key) {
      return key ? item[key] : item;
    },
    change(e) {
      this.$emit("input", e);
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
        <el-select
          size={this.form.size}
          {...{ attrs }}
          onChange={(e) => {
            this.change(e);
          }}
        >
          {attrs.items.map((item, index) => {
            return (
              <el-option
                key={index}
                label={this.label(item, attrs.label)}
                value={this.label(item, attrs.valueKey)}
              >
                {this.$scopedSlots.default &&
                  this.$scopedSlots.default({
                    content: this.label(item, attrs.label),
                  })}
              </el-option>
            );
          })}
        </el-select>
      </div>
    );
  },
};
</script>
