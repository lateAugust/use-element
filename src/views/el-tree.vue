<template>
  <div style="width: 30%; margin: auto;">
    <el-tree
      :data="data"
      ref="tree"
      node-key="id"
      :props="defaultProps"
      :default-checked-keys="defaultCheckedKeys"
      :default-expanded-keys="defaultExpandedKeys"
    >
      <template v-slot:default="{ node, data }">
        <div @click="handleClick(node, data)">
          <span :class="{ active: currentData.includes(data.id) }">
            {{ node.label }}
          </span>
        </div>
      </template>
    </el-tree>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1",
                },
                {
                  id: 10,
                  label: "三级 1-1-2",
                },
              ],
            },
            {
              id: 100,
              label: "100",
              children: [
                {
                  id: 101,
                  label: "101",
                },
                {
                  id: 102,
                  label: "102",
                },
              ],
            },
          ],
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1",
            },
            {
              id: 6,
              label: "二级 2-2",
            },
          ],
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1",
            },
            {
              id: 8,
              label: "二级 3-2",
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
      defaultExpandedKeys: [3, 8],
      defaultCheckedKeys: [3, 8],
      currentData: [3, 8],
      temporary: [],
      changeStatus: true,
    };
  },
  methods: {
    handleClick({ childNodes, key, parent }) {
      if (!childNodes.length) {
        let array = [];
        array.push(key);
        while (true) {
          key = parent.key;
          if (key === undefined) break;
          array.push(key);
          parent = parent.parent;
        }
        this.currentData = array;
        console.log(array);
      }
    },
  },
};
</script>

<style scoped>
.active {
  color: blue;
}
</style>
