<template>
    <div class="manage">
        <!-- dialog提示框 -->
        <el-dialog :title="modalType === 0 ? '新增用户' : '修改用户'" :before-close="handleClose" :visible.sync="dialogVisible"
            width="50%">
            <!-- form表单 -->
            <el-form ref="form" :rules="rules" :inline="true" :model="form" label-width="80px">
                <el-form-item prop="name" label="姓名">
                    <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item prop="age" label="年龄">
                    <el-input v-model="form.age" placeholder="请输入年龄"></el-input>
                </el-form-item>
                <el-form-item prop="sex" label="性别">
                    <el-select v-model="form.sex" placeholder="请选择">
                        <el-option label="男" :value="1"></el-option>
                        <el-option label="女" :value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="birth" label="出生日期">
                    <el-date-picker value-format="yyyy-MM-dd" v-model="form.birth" type="date" placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item prop="addr" label="地址">
                    <el-input v-model="form.addr" placeholder="请输入地址"></el-input>
                </el-form-item>
            </el-form>
            <!-- 底部的确定|取消按钮 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="submit()">确 定</el-button>
            </span>
        </el-dialog>
        <div class="manage-header">
            <el-button type="primary" @click="handleAdd()">+新增</el-button>
            <!-- 搜索表单 -->
            <el-form ref="searchForm" :model="form" label-width="80px" inline>
                <el-form-item>
                    <el-input placeholder="请输入搜索姓名" v-model="searchForm.name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSearch">搜索</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="common-table">
            <!-- 用户列表表格 -->
            <el-table stripe :data="tableData" height="90%" style="width: 100%">
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column prop="age" label="年龄"></el-table-column>
                <el-table-column prop="sex" label="性别">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px;">{{ scope.row.sex == 1 ? '男' : '女' }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="birth" label="出生日期"></el-table-column>
                <el-table-column prop="addr" label="地址"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <div class="pager">
                <el-pagination layout="prev, pager, next" :total="total" @current-change="handlePage">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import { getUserList, addUser, editUser, deleteUser } from '../../api'
export default {
    name: 'User',
    data() {
        return {
            //控制弹出框显示与隐藏
            dialogVisible: false,
            //用户列表数据
            tableData: [],
            //控制弹窗的类型
            modalType: 0,//0新增，1编辑
            //分页的页数
            total: 0,
            //分页的参数
            pageData: {
                page: 1,
                limit: 10
            },
            //搜索表单数据
            searchForm: {
                name: ''
            },
            //新增|修改用户表单信息
            form: {
                name: '',
                age: '',
                sex: '',
                birth: '',
                addr: ''
            },
            //新增用户表单校验规则
            rules: {
                name: [{ required: true, message: '请输入姓名' }],
                age: [{ required: true, message: '请输入年龄' }],
                sex: [{ required: true, message: '请选择性别' }],
                birth: [{ required: true, message: '请选择日期' }],
                addr: [{ required: true, message: '请输入地址' }]
            },
        };
    },
    methods: {
        //新增|修改用户的方法
        submit() {
            //表单校验
            this.$refs.form.validate((valid) => {
                //通过校验
                if (valid) {
                    //对后续数据进行处理
                    //新增用户
                    if (this.modalType === 0) {
                        addUser(this.form).then(() => {
                            //重新获取用户列表
                            this.getList()
                        })
                        //修改用户
                    } else {
                        editUser(this.form).then(() => {
                            //重新获取用户列表
                            this.getList()
                        })
                    }
                    //清空数据
                    this.$refs.form.resetFields()
                    //关闭弹窗
                    this.dialogVisible = false
                }
            })
        },
        //关闭弹窗时清空数据的方法
        handleClose() {
            //清空数据
            this.$refs.form.resetFields()
            //关闭弹窗
            this.dialogVisible = false
        },
        //获取用户列表|分页的方法
        getList() {
            getUserList({ params: {...this.searchForm,...this.pageData} }).then(({ data }) => {
                //用户列表数据
                this.tableData = data.list
                //分页页数
                this.total = data.count || 0
            })
        },
        //处理新增弹窗的方法
        handleAdd() {
            //打开弹窗
            this.dialogVisible = true
            //设置弹窗类型为新增0
            this.modalType = 0
        },
        //处理修改弹窗并回显数据方法
        handleEdit(row) {
            //打开弹窗
            this.dialogVisible = true
            //设置弹窗类型为修改
            this.modalType = 1,
                //回显数据,注意需要对当前数据进行深拷贝
                this.form = JSON.parse(JSON.stringify(row))
        },
        //删除用户的方法
        handleDelete(row) {
            this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                //删除用户 
                deleteUser({ id: row.id }).then(() => {
                    //提示信息
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    //重新获取用户列表
                    this.getList()
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        //选择页码时的回调
        handlePage(currentPage) {
            this.pageData.page = currentPage
            this.getList()
        },
        //搜索用户的方法
        onSearch(){
            this.getList()
        }
    },
    mounted() {
        //取出用户列表数据
        this.getList()
    }
}
</script>

<style lang="less" scoped>
.manage {
    height: 90%;
    .manage-header{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .common-table {
        position: relative;
        height: calc(100% - 62px);

        .pager {
            position: absolute;
            bottom: 0;
            right: 20px;
        }
    }
}
</style>