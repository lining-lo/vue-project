<template>
    <div class="tabs">
        <el-tag v-for="(tag, index) in tags" :key="tag.path" :closable="tag.name !== 'home'"
            :effect="tag.name === $route.name ? 'dark' : 'plain'" @click="changeMenu(tag)"
            @close="handleClose(tag, index)">
            {{ tag.label }}
        </el-tag>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'ComponentTag',
    computed: {
        ...mapState({
            tags: state => state.tab.tabList
        })
    },
    methods: {
        //点击tag实现跳转
        changeMenu(tag) {
            this.$router.push(tag.name)
        },
        //点击tag的x号实现删除功能
        handleClose(tag, index) {
            //调用tab仓库中删除指定tag数据的方法
            this.$store.commit('closeTag', tag)

            //删除后的跳转逻辑
            //删除的不是当前路由---不跳转
            let length = this.tags.length
            console.log('length', length, '--index', index);


            if (tag.name !== this.$route.name) {
                return
            }
            //删除的是当前路由且是最后一个tag---向前一个跳转
            if (length === index) {
                this.$router.push(this.tags[index-1].name)
            }else{ //删除的是当前路由且不是最后一个tag---向后一个跳转
                this.$router.push(this.tags[index].name)
            }
        }
    }
}
</script>

<style lang='less' scoped></style>