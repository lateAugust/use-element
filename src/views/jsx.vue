<template>
  <section style="width: 300px; margin: 0 auto;">
    <el-form size="mini" label-position="center" label-width="20px">
      <!-- <el-form-item v-for="(item, index) of array" :key="index"> -->
      <!-- <Input
        v-model="value['value' + (index ? index : '')]"
        v-for="(item, index) of array"
        :key="index"
      ></Input> -->
      <formItem v-for="(item, index) of array" :key="index">
        <template v-slot:default="obj">
          <Input
            v-model="value['value' + (index ? index : '')]"
            :size="obj.size"
          />
        </template>
      </formItem>

      <!-- <el-form-item v-for="(item, index) of array" :key="(index + 1) * 10000">
        <Select
          :items="options"
          v-model="select['select' + (index ? index : '')]"
          @change="
            (e) => {
              change(e, index);
            }
          "
        ></Select>
      </el-form-item> -->
    </el-form>
  </section>
</template>
<script>
import Input from "@/components/Input";
import Select from "@/components/Select";
import formItem from "@/components/form-item";
export default {
  name: "jsx",
  components: {
    Input,
    Select,
    formItem,
  },
  data() {
    return {
      value: {},
      select: {},
      array: new Array(200).fill(1),
      options: [
        "1",
        "2",
        "3",
        "5",
        "6",
        "8",
        "6",
        "882",
        "11",
        "223",
        "33",
        "344",
        "44",
        "100",
        "101",
        "102",
        "103",
        "104",
        "105",
        "106",
        "107",
        "109",
        "139",
        "134",
        "167",
        "198",
        "109",
        "1090",
      ],
    };
  },
  beforeCreate() {},
  mounted() {
    this.$nextTick(() => {
      console.log(new Date().getTime(), "mounted");
      // console.log(this.$children);
    });
  },
  beforeUpdate() {
    // debugger;
    // console.log(222334);
  },
  methods: {
    change(e, index) {
      let key = "select" + (index ? index : "");
      console.log(e, "select" + (index ? index : ""), key);
      this.$set(this.select, key, e);
      // this.value[key] = e;
    },
  },
};
</script>
