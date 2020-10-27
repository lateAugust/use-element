<template>
  <div class="home">
    <router-link
      :to="item.to"
      tag="el-button"
      v-for="item of buttons"
      :key="item.to"
      >{{ item.title }}</router-link
    >
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  data() {
    return {
      buttons: [
        { to: "/el-tree", title: "el-tree" },
        { to: "/el-scrollbar", title: "el-scrollbar" },
        { to: "/thumbnail-slide", title: "thumbnail-slide" },
        { to: "/jsx", title: "jsx" },
      ],
    };
  },
};
</script>
