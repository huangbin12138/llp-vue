<template>
  <div class="database">
    <div class="lists flex">
      <div class="item por" :key="ind" v-for="(item, ind) in tableList">
        <div class="tb-name wot" @click="getColList(ind)">{{ind}}</div>
        <div class="drop-tb poa icon-cross r t" @click="dropTables(ind)"></div>
      </div>
      <div class="item icon-plus" @click="toggleCreateTable"></div>
      <div class="item" @click="dropTables('initSqlLog')">初始化sql日志</div>
    </div>
    <div class="edit-box curtain" v-show="!editBoxHide">
      <div class="content abs-mc">
        <input class="title tal" placeholder="请输入表格名称" v-model="tableName"/>
        <ul class="detail tal">
          <li :class="activeCol === ind && 'show'" :key="ind" v-for="(item, ind) in columnList">
            <div class="col-name">
              <input @focus="colNameFocus(ind)" type="text" placeholder="请输入列名称" v-model="item.name">
            </div>
            <div>
              <span>说明：</span>
              <input class="commit" type="text" v-model="item.comment">
            </div>
            <div>
              <span>列类型：</span>
              <select type="text" id="col-type" v-model="item.type">
                <option value="">请选择列类型</option>
                <option v-for="item in colTypes" :key="item" :value="item">{{item}}</option>
              </select>
              <input type="number" v-model="item.type_len" placeholder="字段长度"/>
            </div>
            <div class="check">
              <span>约束：</span>
              <div class="checkbox">
                <div v-for="(label, ind) in powers">
                  <label :for="'pws' + ind">{{label}}</label>
                  <input @change="checkChange(item, ind)" :id="'pws' + ind" v-model="item[ind]" type="checkbox"/>
                </div>
              </div>
            </div>
            <div>
              <span>默认值：</span>
              <input class="default" type="text" v-model="item.default">
            </div>
          </li>
        </ul>
        <div class="add-col icon-plus" @click="addCol"></div>
        <div class="button dpf">
          <span @click="toggleCreateTable">取消</span>
          <span @click="submit">提交</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "edit-database",
    data() {
      return {
        tableName: '',
        tableList: [],
        columnList: [{type: ''}],
        columnObj: {type: ''},
        powers: {
          primary_key: '主键',
          auto: '自增',
          no_null: '非空',
          // unique: '唯一值',
        },
        colTypes: ['int', 'char', 'varchar'],
        activeCol: 0,
        editBoxHide: true,
        editType: 'createTable',
        msg: 'edit-database'
      }
    },
    watch: {
      //
    },
    methods: {
      toggleCreateTable() {
        this.activeCol = 0;
        this.editBoxHide = !this.editBoxHide;
        if (this.editBoxHide) {
          this.editType = 'createTable';
          this.tableName = '';
          this.columnList = [{type: ''}];
        }
      },
      colNameFocus(index) {
        this.activeCol = index;
      },
      checkChange(item, key){
        if(key === 'auto' && item.auto) {
          item.primary_key = true;
        }
      },
      submit() {
        this.$ajax('', {
          type: this.editType,
          uid: 1,
          table_name: this.tableName,
          column_list: this.columnList
        }).then(res => {
          this.$toast('添加成功');
          this.showTables();
          this.toggleCreateTable();
        }).catch(this.$err);
      },
      addCol() {
        let cols = this.columnList;
        let len = cols.length;
        cols[len - 1].name && this.columnList.push({...this.columnObj}) && (this.activeCol = len);
      },
      dropTables(tableName) {
        let html = `确定删除表格: <b style="color: red">${tableName}</b>？`;
        let type = 'dropTables';
        let tips = '删除成功！';
        if(tableName === 'initSqlLog') {
          html = '确定初始化sql日志？';
          type = tableName;
          tips = '初始化sql日志成功';
        }
        this.$message({
          html,
          cancelText: '取消',
          sure: () => {
            this.$ajax('', {
              type: type,
              uid: 1,
              tableName
            }).then(res => {
              tableName !== type && this.showTables();
              this.$toast(tips);
            }).catch(this.$err);
          },
        });
      },
      getColList(tbName = '') {
        this.columnList = this.tableList[tbName];
        this.tableName = tbName;
        this.editType = 'editTable';
        this.toggleCreateTable();
      },
      showTables(table_name = '') {
        this.$ajax('', {
          type: 'showTables',
          table_name,
          uid: 1
        }).then(res => {
          if (table_name) {
          } else {
            this.tableList = res;
          }
        }).catch(this.$err);
      },
    },
    created() {
      this.showTables();
    }
  }
</script>

<style scoped>

</style>
