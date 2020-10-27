<template>
  <div class="el-form-item" :class="[size ? 'el-form-item--' + size : '']">
    <!-- <el-form-item> -->
    <label
      class="el-form-item__label"
      :style="labelStyle"
      v-if="label || $slots.label"
    >
      <slot name="label">{{ label + labelSuffix }}</slot>
    </label>
    <div class="el-form-item__content" :style="contentStyle">
      <slot></slot>
    </div>
    <!-- </el-form-item> -->
    <!-- <div>{{ Date.now() }}</div> -->
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      size: undefined,
      labelWidth: undefined,
      labelPosition: undefined,
      labelSuffix: undefined,
    };
  },
  mounted() {
    const { labelWidth, size, labelPosition, labelSuffix } = this.form;
    this.size = size;
    this.labelWidth = labelWidth;
    this.labelPosition = labelPosition;
    this.labelSuffix = labelSuffix || "";
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
    labelStyle() {
      const ret = {};
      if (this.labelPosition === "top") return ret;
      const labelWidth = this.$attrs.labelWidth || this.labelWidth;
      if (labelWidth) {
        ret.width = labelWidth;
      }
      return ret;
    },
    contentStyle() {
      const ret = {};
      let attrs = this.$attrs;
      const label = attrs.label;
      if (this.labelPosition === "top") return ret;
      if (!label && !this.labelWidth) return ret;
      const labelWidth = attrs.labelWidth || this.labelWidth;
      ret.marginLeft = labelWidth;
      return ret;
    },
  },
  updated() {
    console.log("updated");
  },
};
</script>
