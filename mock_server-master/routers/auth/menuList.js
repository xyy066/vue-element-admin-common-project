/**
 * 菜单列表
 * */
let cnt = 1

const level1IDs = {
    agent: 100001
}

module.exports = [
    { id: level1IDs.agent, level: 1, menuName: '店家管理', parentId: 0, path: '/agent', types: 0 },
    { id: cnt++, level: 2, menuName: '店家列表', parentId: level1IDs.agent, path: '/agent/list', types: 0 },
    { id: cnt++, level: 2, menuName: '店家订单列表', parentId: level1IDs.agent, path: '/agent/orderList', types: 0 },
]