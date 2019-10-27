import request from '@/utils/request'
import {post,post_array} from '@/utils/request'

export default{
    namespaced:true,
    state:{
        orders:[],
         visible:false,
         title:'添加订单信息',
         loading:false
    },
    mutations:{
        showModal(state){
            state.visible = true;
        },
        closeModal(state){
            state.visible = false;
        },
        refreshOrders(state,orders){
            state.orders = orders;
        },
        setTitle(state,title){
            state.title = title;
        },
        beginLoading(state){
        state.loading = true;
        },
        endLoading(state){
        state.loading = false;
        }
    },
    actions:{
        async batchDeleteCustomer(context,ids){
        // 1. 批量删除
        let response = await post_array("/order/batchDelete",{ids})
        // 2. 分发
        context.dispatch("findAllOrders");
        // 3. 返回结果
        return response;
        },
        //通过id删除订单
        async deleteOrderById(context,id){
            let response = await request.get("/order/deleteById?id="+id);
            context.dispatch('findAllOrders');
            return response;
        },
        //重载页面
        async findAllOrders(context){
            context.commit('beginLoading');
            let response = await request.get("/order/findAll");
            context.commit("refreshOrders",response.data);
            context.commit('endLoading');
        },
        //添加或修改
        async saveOrUpdateOrder(context,payload){
            let response = await post("/orderveOrUpdate",payload);
            context.dispatch("findAllOrders");
            context.commmit('closeModal');
            return response;
        }
    }
}