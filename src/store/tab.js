export default {
    state: {
        isCollapse: false,//控制菜单的展开与收起
        //面包屑数据
        tabList: [{
            path: '/',
            name: 'home',
            label: '首页',
            icon: 's-home',
            url: '/home'
        }]
    },
    mutations: {
        //修改菜单展开与收起的方法
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse
        },
        //更新面包屑数据
        selectMenu(state, value) {
            //点击首页时不更新
            if (value.name !== 'home') {
                const index = state.tabList.findIndex(item => item.name === value.name)
                //点击同一菜单不更新
                if(index === -1){
                    state.tabList.push(value)
                }
            }
        }
    }
}