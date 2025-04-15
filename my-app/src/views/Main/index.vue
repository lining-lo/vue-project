<template>
    <div>
        <el-container>
            <el-aside width="auto">
                <component-aside />
            </el-aside>
            <el-container>
                <el-header>
                    <component-header />
                </el-header>
                <component-tag />
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>

    </div>
</template>

<script>
import ComponentAside from '@/components/ComponentAside.vue';
import ComponentHeader from '@/components/ComponentHeader.vue';
import ComponentTag from '@/components/ComponentTag.vue';
export default {
    name: 'Main',
    components: {
        ComponentAside,
        ComponentHeader,
        ComponentTag
    }
}
</script>

<style lang="less" scoped>
.el-header {
    padding: 0;
}

</style>