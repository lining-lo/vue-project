<template>
    <div>
        <el-container>
            <el-aside width="200px"><component-aside /></el-aside>
            <el-container>
                <el-header>Header</el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>

    </div>
</template>

<script>
import ComponentAside from '@/components/ComponentAside.vue';
export default {
    name: 'Main',
    components: {
        ComponentAside
    }
}
</script>

<style></style>