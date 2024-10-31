import vue from 'vue'
import Vuex from 'vuex'
import router,{resetRouter} from "../router";
import createpersistence from 'vuex-persistedstate'
vue.use(Vuex)


function addNewRoute(menuList){
    console.log(menuList)
    let routes = router.options.routes
    console.log(routes)
    routes.forEach(routeItem=>{
        if(routeItem.path==="/index"){
            menuList.forEach(menu=>{
                let childRoute =  {
                    path:'/'+menu.menuclick,
                    name:menu.menuname,
                    meta:{
                        title:menu.menuname
                    },
                    component:()=>import('../components/'+menu.menucomponent)
                }
                routeItem.children.push(childRoute)
            })
        }
    })
    resetRouter()
    router.addRoutes(routes)
}

export default new Vuex.Store({
    state: {
        menu: [],
        tableData: [],
        foodres: 0,
        liferes: 0,
        walkres: 0,
        clothres:0,
        useres:0,
    },
    mutations: {
        updateFoodres(state, value) {
            state.foodres = value;
        },
        updateLiferes(state, value) {
            state.liferes = value;
        },
        updateWalkres(state, value) {
            state.walkres = value;
        },
        updateClothres(state, value) {
            state.clothres = value;
        },
        updateUseres(state, value) {
            state.useres = value;
        },
        clearTableData(state) {
            state.tableData = [];
        },
        clearResData(state){
          state.foodres = 0
          state.walkres = 0
          state.liferes = 0
            state.clothres = 0
            state.useres = 0
        },
        setTableData(state, data) {
            state.tableData = data;
        },
        setMenu(state,menuList) {
            state.menu = menuList
            //添加路由
            addNewRoute(menuList)
        },
        setRouter(state,menuList) {
            //添加路由
            addNewRoute(menuList)
        }
    },
    getters: {
        getMenu(state) {
            return state.menu
        },
    },
    plugins:[createpersistence()]
})