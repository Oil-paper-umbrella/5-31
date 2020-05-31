<template>
  <div class="port">
    <el-row>
      <h1>数据导入</h1>
    </el-row>
    <el-row type="flex" class="port-operation">
      <form
        action="http://39.100.12.28:8080/dianyeAutho/readExcelServlet"
        method="post"
        enctype="multipart/form-data"
      >
        <input type="file" name="upload" />
        <input type="button" value="上传文件" />
      </form>
    </el-row>
    <el-row>
      <el-table :data="files" style="width: 100%;" border>
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="ID" width="100">
          <template slot-scope="scope">{{ scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column
          prop="fileName"
          label="文件名"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column prop="upTime" label="日期" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.upTime | filterDate }}</template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>
<script>
import requestPort from "../../../api/port.js";
export default {
  name: "port",
  data() {
    return {
      files: [],
    };
  },
  created() {
    this.getAllFiles();
  },
  methods: {
    getAllFiles() {
      requestPort.getFiles().then((data) => {
        if (data.data.message != "Success") {
          this.$message.error("查询失败！刷新试试");
        }
        let file = data.data.data.allFiles;
        for (let i = 0; i < file.length; i++) {
          let date = file[i].upTime;
          file[i].upTime = new Date(date);
        }
        this.files = file;
      });
    },
  },
};
</script>
<style lang="scss">
.port {
  overflow: hidden;
  .port-operation {
    margin-bottom: 10px;
  }
  .el-upload-list {
    float: right;
  }
  .el-upload-list__item:hover {
    background-color: #111739;
  }
  .el-upload-list__item-name {
    color: #fff;
  }
}
</style>
