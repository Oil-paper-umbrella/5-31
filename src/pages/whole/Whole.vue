<template>
  <div id="whole">
    <!--头部-->
    <div class="header">
      运营数据管理技术服务
      <a href="javascript:history.back();" class="whole-back">
        <button class="button type1">返回</button>
      </a>
      <a href="/" class="whole-home">
        <button class="button type1"><i class="el-icon-s-home"></i>首页</button>
      </a>
    </div>
    <!--主体-->
    <div class="clearfix">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "whole",
  data() {
    return {
      isOpen:false
    };
  }
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}
#whole {
  background: #111739;
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
    a.whole-back {
      position: absolute;
      right: 3%;
      top: -18%;
    }
    a.whole-home {
      position: absolute;
      left: 3%;
      top: -18%;
      .el-icon-s-home {
        padding-right: 5px;
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
}
</style>