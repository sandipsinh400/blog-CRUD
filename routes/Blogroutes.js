const route = require('express').Router()
const blogcontroller = require('../controller/Blogcontroller')
const upload = require('../Middleware/Fileuploads')

route.post('/', upload.single('profile_name'), blogcontroller.store)
route.get('/:id', blogcontroller.trash)
route.post('/:id', upload.single('profile_name'), blogcontroller.updateblog)

module.exports = route
