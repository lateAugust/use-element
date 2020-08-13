<template>
  <div style="width: 500px; height: 500px; border: 1px solid #000;">
    <scroll
      @reach-top="reachTop"
      @reach-bottom="reachBottom"
      @reach-left="reachLeft"
      @reach-right="reachRight"
      :vertical="true"
      :reach-top="100"
      :reach-bottom="300"
    >
      <div style="width: 1000px; height: 1000px;"></div>
    </scroll>
  </div>
</template>

<script>
import scroll from "@/components/scroll";
export default {
  components: {
    scroll,
  },
  methods: {
    reachTop() {
      console.log(1, "top");
    },
    reachBottom() {
      console.log(3, "bottom");
    },
    reachRight() {
      console.log(2, "right");
    },
    reachLeft() {
      console.log(4, "left");
    },
  },
};
</script>

<style scoped></style>
