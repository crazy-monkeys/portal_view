export default{
    initShopId(context,payload){
        context.commit('getShopId',payload)
    },
    initShopName(context,payload){
        context.commit('getShopName',payload)
    }
}