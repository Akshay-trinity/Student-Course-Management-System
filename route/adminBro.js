const adminBro = require('admin-bro')
const adminBroExpress = require('admin-bro-expressjs')
const adminBroMongoose = require('admin-bro-mongoose')
const mongoose = require('mongoose')

adminBro.registerAdapter(adminBroMongoose)


const admin = new adminBro({
  databases: [mongoose],
  rootPath: '/admin',
})

const router = adminBroExpress.buildRouter(admin)

module.exports = router

