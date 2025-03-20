<template>
    <div class="manage">
        <!-- dialog提示框 -->
        <el-dialog title="提示" :before-close="handleClose" :visible.sync="dialogVisible" width="50%">
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
                        <el-option label="男" value="1"></el-option>
                        <el-option label="女" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="birth" label="出生日期">
                    <el-date-picker v-model="form.birth" type="date" placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item prop="addr" label="地址">
                    <el-input v-model="form.addr" placeholder="请输入地址"></el-input>
                </el-form-item>
            </el-form>
            <!-- 底部的确定|取消按钮 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </span>
        </el-dialog>
        <div class="manage-header">
            <el-button type="primary" @click="dialogVisible = true">+新增</el-button>
            <!-- 用户列表表格 -->
            <el-table :data="tableData" style="width: 100%">
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
        </div>
    </div>
</template>

<script>
import { getUserList } from '../../api'
export default {
    name: 'User',
    data() {
        return {
            //控制弹出框显示与隐藏
            dialogVisible: false,
            //新增用户表单数据
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
            //用户列表数据
            tableData: []
        };
    },
    methods: {
        //提交新增用户表单的方法
        submit() {
            //表单校验
            this.$refs.form.validate((valid) => {
                //通过校验
                if (valid) {
                    //对后续数据进行处理
                    console.log('form', this.form);
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
        //修改用户的方法
        handleEdit(row) {
            console.log('修改用户的方法');
        },
        //删除用户的方法
        handleDelete(row) {
            console.log('删除用户的方法');
        }
    },
    mounted() {
        getUserList().then(({ data }) => {
            //取出获取用户列表的数据
            this.tableData = data.list
        })
    }
}
</script>

<style></style>