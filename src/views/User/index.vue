<template>
    <div class="manage">
        <el-button type="primary" @click="dialogVisible = true">+新增</el-button>
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
    </div>
</template>

<script>
export default {
    name: 'User',
    data() {
        return {
            dialogVisible: false,
            form: {
                name: '',
                age: '',
                sex: '',
                birth: '',
                addr: ''
            },
            rules: {
                name: [{ required: true, message: '请输入姓名' }],
                age: [{ required: true, message: '请输入年龄' }],
                sex: [{ required: true, message: '请选择性别' }],
                birth: [{ required: true, message: '请选择日期' }],
                addr: [{ required: true, message: '请输入地址' }]
            }
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
        }
    }
}
</script>

<style></style>