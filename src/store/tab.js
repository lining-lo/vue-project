import Cookies from "js-cookie"
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
        }],
        //动态的左侧菜单数据
        menuList: [],
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
                if (index === -1) {
                    state.tabList.push(value)
                }
            }
        },
        //删除指定tag数据
        closeTag(state, tag) {
            const index = state.tabList.findIndex(item => tag.name === item.name)
            state.tabList.splice(index, 1)
        },
        //更新左侧菜单数据的方法
        setMenu(state, value) {
            //更新数据
            state.menuList = value
            //存入cookie
            Cookies.set('menu', JSON.stringify(value))
        },
        //动态添加路由的方法
        addMenu(state, router) {
            const menu = JSON.parse(Cookies.get('menu'))
            //判断缓存中是否有数据
            if (!menu) return
            state.menuList = menu
            
            //组装动态路由的数据
            const menuArray = []
            menu.forEach(item => {
                //有Childen项
                if (item.children) {
                    item.children = item.children.map(item => {
                        item.component = () => import(`../views/${item.url}`)
                        return item
                    })
                    menuArray.push(...item.children)
                }else{
                    item.component = () => import(`../views/${item.url}`)
                    menuArray.push(item)
                }
            });
            console.log(menuArray);
            
            menuArray.forEach(item => {
                router.addRoute('Main',item)
            })
        }
    }
}