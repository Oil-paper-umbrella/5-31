<template>
  <div id="show">
    <!--主体-->
    <div class="main clearfix">
      <div class="border-container show-view">
        <p class="open">
          <router-link to="/whole/pie" tag="div">
            <i class="el-icon-full-screen"></i>
          </router-link>
        </p>
        <Pie></Pie>
        <span class="top-left border-span"></span>
        <span class="top-right border-span"></span>
        <span class="bottom-left border-span"></span>
        <span class="bottom-right border-span"></span>
      </div>
      <div class="border-container show-view">
        <Map></Map>
        <span class="top-left border-span"></span>
        <span class="top-right border-span"></span>
        <span class="bottom-left border-span"></span>
        <span class="bottom-right border-span"></span>
      </div>
      <div class="border-container show-view">
        <p class="open">
          <router-link to="/whole/bar" tag="div">
            <i class="el-icon-full-screen"></i>
          </router-link>
        </p>
        <Bar></Bar>
        <span class="top-left border-span"></span>
        <span class="top-right border-span"></span>
        <span class="bottom-left border-span"></span>
        <span class="bottom-right border-span"></span>
      </div>
      <div class="border-container show-view">
        <p class="open">
          <router-link to="/whole/radar" tag="div">
            <i class="el-icon-full-screen"></i>
          </router-link>
        </p>
        <Radar></Radar>
        <span class="top-left border-span"></span>
        <span class="top-right border-span"></span>
        <span class="bottom-left border-span"></span>
        <span class="bottom-right border-span"></span>
      </div>
      <div class="border-container show-view">
        <p class="open">
          <router-link to="/whole/line" tag="div">
            <i class="el-icon-full-screen"></i>
          </router-link>
        </p>
        <Pline></Pline>
        <span class="top-left border-span"></span>
        <span class="top-right border-span"></span>
        <span class="bottom-left border-span"></span>
        <span class="bottom-right border-span"></span>
      </div>
      <div class="border-container show-view">
        <Trend></Trend>
        <span class="top-left border-span"></span>
        <span class="top-right border-span"></span>
        <span class="bottom-left border-span"></span>
        <span class="bottom-right border-span"></span>
      </div>
    </div>
  </div>
</template>

<script>
let Pie = () => import("../../components/echarts/pie/FourModules.vue");
let Bar = () => import("../../components/echarts/bar/Bar.vue");
let Pline = () => import("../../components/echarts/line/Line.vue");
let Map = () => import("../../components/echarts/map/Map.vue");
let Radar = () => import("../../components/echarts/radar/Radar.vue");
let Trend = () => import("../../components/echarts/trend/Trend.vue");
export default {
  name: "show",
  props: {
    nums: Number
  },
  data() {
    return {
      pageStyle: {
        height: "100%"
      }
    };
  },
  created() {
    this.getClientHeight();
  },
  components: {
    Pie,
    Bar,
    Pline,
    Radar,
    Map,
    Trend
  },
  methods: {
    getClientHeight() {
      let clientHeight = document.documentElement
        ? document.documentElement.clientHeight
        : document.body.clientHeight;
      this.pageStyle.height = clientHeight - 125 + "px";
    }
  },
  mounted() {
    this.getClientHeight();
    let pd_this = this;
    // 监听浏览器窗口的变化
    window.onresize = function() {
      pd_this.getClientHeight();
    };
  }
};
</script>

<style lang="scss">
a:link,
a:visited,
a:active {
  text-decoration: none;
}
* {
  box-sizing: border-box;
}
*::-webkit-scrollbar {
  width: 4px;
}
*::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background-color: rgba(0, 0, 0, 0.1);
}
*::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background-color: rgba(0, 0, 0, 0.1);
}
#show {
  background: #111739;
  .el-icon-full-screen {
    // 全屏 icon 样式
    font-size: 1.5rem;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 2;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: " ";
  }
  .clearfix:after {
    clear: both;
  }
  .header {
    height: 80px;
    position: relative;
    padding-top: 13px;
    font-size: 36px;
    color: #00ffff;
    text-align: center;
    background: url("./../../assets/images/bg.png") top center no-repeat;
    a.a-access {
      position: absolute;
      right: 3%;
      top: -18%;
    }
  }
  .main {
    padding: 0 20px 20px;
    .border-container {
      .open {
        width: 20%;
        margin: auto;
      }
      position: relative;
      margin-top: 15px;
      padding: 5px 5px 0 5px;
      border: 1px solid #54dcf2;
      .el-icon-alisuoxiao {
        font-size: 1.5rem;
        position: absolute;
        top: 0;
        right: 0;
        z-index: 2;
      }
      span.border-span {
        display: block;
        position: absolute;
        width: 35px;
        height: 35px;
      }
      span.top-left {
        top: -4px;
        left: -4px;
        border-top: 3px solid #54dcf2;
        border-left: 3px solid #54dcf2;
      }
      span.top-right {
        top: -4px;
        right: -4px;
        border-top: 3px solid #54dcf2;
        border-right: 3px solid #54dcf2;
      }
      span.bottom-left {
        bottom: -4px;
        left: -4px;
        border-bottom: 3px solid #54dcf2;
        border-left: 3px solid #54dcf2;
      }
      span.bottom-right {
        bottom: -4px;
        right: -4px;
        border-bottom: 3px solid #54dcf2;
        border-right: 3px solid #54dcf2;
      }
    }
  }
  .button {
    position: relative;
    padding: 0.5em 1.5em;
    border: none;
    background-color: transparent;
    cursor: pointer;
    outline: none;
    font-size: 18px;
    margin: 1em 0.8em;
  }
  .button.type1 {
    color: #00ffff;
  }
  .button.type1.type1::after,
  .button.type1.type1::before {
    content: "";
    display: block;
    position: absolute;
    width: 20%;
    height: 20%;
    border: 2px solid;
    transition: all 0.6s ease;
    border-radius: 2px;
  }
  .button.type1.type1::after {
    bottom: 0;
    right: 0;
    border-top-color: transparent;
    border-left-color: transparent;
    border-bottom-color: #566473;
    border-right-color: #566473;
  }
  .button.type1.type1::before {
    top: 0;
    left: 0;
    border-bottom-color: transparent;
    border-right-color: transparent;
    border-top-color: #566473;
    border-left-color: #566473;
  }
  .button.type1.type1:hover:after,
  .button.type1.type1:hover:before {
    width: 100%;
    height: 100%;
  }
  .show-view {
    width: 30%;
    height: 350px;
    float: left;
    color: #00ffff;
    margin: 1.5%;
    overflow: inherit;
  }
}
</style>