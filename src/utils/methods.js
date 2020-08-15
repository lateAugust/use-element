function getKey(items, keys) {
  let str = "";
  for (let item of keys) {
    let val = items[item].toString();
    str += val;
  }
  return str;
}
export default {
  /**
   * 判断是否为合法的http
   * @param {String} v
   */
  isHttp(v) {
    return /^https?:\/\//.test(v);
  },
  /**
   * 判断是否不为空
   * @param {*} v
   */
  nonEmptyProp(v) {
    return (
      (v === 0 || !!v) &&
      !/\[object (undefined|null)\]/gi.test(Object.prototype.toString.call(v))
    );
  },
  /**
   *  对象去重
   * @param {Array} array 去重的数组
   * @param {Array} attrs 以这个的字段为准
   * @param {Boolean} forward true 前面覆盖后面, false 后面覆盖前面
   */
  doWeightArray(array, attrs, forward = false) {
    let object = {};
    for (let i = 0; i < array.length; i++) {
      let item = array[i];
      let index = i;
      let key = getKey(item, attrs);
      let value = object[key];
      if (forward && value) {
        index = value.index;
        continue;
      }
      object[key] = { data: item, index };
    }
    let values = Object.values(object);
    let len = values.length - 1;
    let arr = new Array(len);
    values.forEach((item) => {
      arr.splice(item.index, 1, item.data);
    });
    return arr.filter((item) => item);
  },
  /**
   * 添加小数点
   * @param {Number|String} x
   * @param {Number} few 保留几位小数点, 默认两位
   */
  toDecimal(x, few = 2) {
    let f = parseFloat(x);
    if (isNaN(f)) {
      throw new Error("NaN");
    }
    let divisor = Math.pow(10, few);
    f = Math.round(x * divisor) / divisor;
    let s = f.toString();
    let rs = s.indexOf(".");
    if (rs < 0) {
      rs = s.length;
      s += ".";
    }
    while (s.length <= rs + few) {
      s += "0";
    }
    return s;
  },
  /**
   * 删除对象中为空属性的项
   * @param {Object} object
   */
  delAllEmptyProps(object) {
    let obj = JSON.parse(JSON.stringify(object));
    for (let [key, val] of Object.entries(obj)) {
      if (!val && !/^(number|boolean)$/gi.test(typeof val)) {
        Reflect.deleteProperty(obj, key);
      } else if (typeof val === "number" && val < 0) {
        Reflect.deleteProperty(obj, key);
      } else if (val instanceof Array && !val.length) {
        Reflect.deleteProperty(obj, key);
      } else if (
        /^[object object]$/gi.test(Object.prototype.toString.call(val)) &&
        !Object.keys(val).length
      ) {
        Reflect.deleteProperty(obj, key);
      }
    }
    return obj;
  },
  /**
   * 判断数据类型, 调用typeof方法
   */
  dataType: {
    "[object String]": "string",
    "[object Number]": "number",
    "[object Boolean]": "boolean",
    "[object Symbol]": "Symbol",
    "[object Undefined]": "undefined",
    "[object Null]": "null",
    "[object Function]": "function",
    "[object Date]": "date",
    "[object Array]": "array",
    "[object RegExp]": "regexp",
    "[object Object]": "object",
    "[object Error]": "error",
    "[object HTMLDocument]": "htmlDocument",
    "[object Window]": "window",
    typeof(v) {
      return this[Object.prototype.toString.call(v)];
    },
  },
  /**
   * 返回数组, 传入前, 请确保数据可用
   */
  returnArray(v) {
    return v instanceof Array ? v : [v];
  },
};
