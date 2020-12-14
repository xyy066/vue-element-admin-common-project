/**
 * 权限类接口
 * */
const express = require("express")
const authRouter = express.Router()
const { responseSuccess } = require('../../utils/response.js')
const menuList = require('./menuList.js')

// 登录接口
authRouter.post('/login', (req, res) => {
    res.json(responseSuccess({
        username: req.body.username,
        token: `mock_one_${Date.now()}`
    }))
})
// 菜单列表
authRouter.post('/getMenu', (req, res) => {
    res.json(responseSuccess(menuList))
})

module.exports = authRouter
