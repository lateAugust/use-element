<template>
  <div class="flex w100 h100">
    <i
      class="pre dir el-icon-arrow-left"
      :style="{ 'min-height': imageHeight + 'px', width: '25px' }"
      @click="index = index <= 0 ? itemsLen - 1 : --index"
      v-if="dirChange"
    ></i>
    <section
      class="items flex h100 margin-lr"
      style="overflow-y: auto; width: calc(100% - 50px);"
      ref="wrap"
    >
      <el-row
        tag="ul"
        class="item flex h100"
        :style="{
          width: itemsLen * imageWidth + 'px',
          transition: `all ${transition / 1000}s ease`,
          transform: `translateX(${transformX}px)`,
        }"
      >
        <el-col
          tag="li"
          v-for="(item, i) of items"
          :key="i"
          :style="{ width: imageWidth + 'px' }"
          class="img-item cursor-pointer h100"
          :class="{ 'margin-left-5': itemsLen !== i - 1 && i !== 0 }"
        >
          <div @click="index = i" class="w100 h100">
            <img
              :src="item[imageKey]"
              alt
              class="w100 h100 dis-b"
              :style="{ 'min-height': imageHeight + 'px' }"
            />
            <span
              :class="{ active: i === index }"
              class="mask w100 h100"
            ></span>
            <p
              class="text-title text-center"
              v-if="gMethods.nonEmptyProp(item[titleKey])"
            >
              {{ item[titleKey] }}
            </p>
          </div>
        </el-col>
      </el-row>
      <span class="spacer"></span>
    </section>
    <i
      class="next dir el-icon-arrow-right"
      :style="{ 'min-height': imageHeight + 'px', width: '25px' }"
      @click="index = index >= itemsLen - 1 ? 0 : ++index"
      v-if="dirChange"
    ></i>
  </div>
</template>

<script>
export default {
  name: "thumbnail-slide",
  data() {
    return {
      index: 0,
      wrapWidth: 0,
      showCount: 0,
      transformX: 0,
      initiaCount: 0,
    };
  },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    transition: {
      type: Number,
      default: 500,
    },
    dirChange: {
      type: Boolean,
      default: true,
    },
    imageWidth: {
      type: Number,
      default: 100,
    },
    imageHeight: {
      type: Number,
      default: 75,
    },
    imageKey: {
      type: String,
      default: "src",
    },
    titleKey: {
      type: String,
      default: "name",
    },
  },
  watch: {
    index(index) {
      if (index < this.showCount || this.initiaCount >= this.itemsLen) {
        this.transformX = 0;
      } else if (index >= this.itemsLen - this.showCount) {
        this.transformX = -this.itemsLen * this.imageWidth + this.wrapWidth;
      } else if (index >= this.showCount) {
        this.transformX = -(index - this.showCount || 1) * this.imageWidth;
      }
      this.$emit("change", index);
    },
  },
  computed: {
    itemsLen() {
      return this.items.length;
    },
  },
  methods: {
    getWidth(ele, attr) {
      return parseFloat(getComputedStyle(ele)[attr]);
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.wrapWidth = this.getWidth(this.$refs.wrap, "width");
      this.initiaCount = this.wrapWidth / this.imageWidth;
      this.showCount = Math.round(this.initiaCount / 2);
    });
  },
};
</script>

<style lang="scss">
ul {
  padding: 0;
  margin: 0;
  li {
    list-style: none;
    padding: 0;
    margin: 0;
  }
}
p {
  margin: 0;
}
.dir {
  width: 40px;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 25px;
  text-align: center;
  line-height: 3;
  cursor: pointer;
}
.margin-left-5 {
  margin-left: 5px;
}
.items {
  .item {
    .img-item {
      position: relative;
      width: 100px;
      background: rgba(0, 0, 0, 0.5);
      .mask {
        position: absolute;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.5);
      }
      .mask:hover {
        background: transparent !important;
      }
      .active {
        background: transparent !important;
      }
      .text-title {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        background: rgba(0, 0, 0, 0.6);
        color: white;
      }
    }
  }
}
.items::-webkit-scrollbar {
  display: none;
}
</style>
