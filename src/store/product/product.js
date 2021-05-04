export default{
    namespaced: true,
    state(){
        return{
            products:[
                {name: 'Sportsbook', navLabel: 'Sports'},
                {name: 'Casino', navLabel: 'Casino'},
                {name: 'Live Casino', navLabel: 'Live Casino'},
                {name: 'Action Games', navLabel: 'Action Games'},
                {name: 'Chess Game', navLabel: 'Chess Game'},
                {name: 'Virtual', navLabel: 'Virtual'},
                {name: 'Lotto', navLabel: 'Lotto'},
            ]
        }
    },
    getters:{
        productNavLabels(state){
            const navLabels = []
            for (const item of state.products){
                navLabels.push({label: item.navLabel})
            }
            return navLabels
        }
    }
}