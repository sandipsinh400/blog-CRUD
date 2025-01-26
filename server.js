const express = require('express')
const app = express()
const port = process.port || 3000
const cookieparser=require('cookie-parser')

const blogroute=require('./routes/Blogroutes')
const { db } = require('./models/Blogmodel')
const adminrout=require('./routes/Adminroutes')
const view=require('./routes/page.routes')

require('dotenv').config()
app.set('view engine','ejs')
app.use(express.static("Public"))
app.use(express.json())
app.use(cookieparser())
app.use(express.urlencoded({extended:true}))
app.use('/profile',express.static('upload'))
app.use('/api/blog',blogroute)
app.use('/api/admin',adminrout)



//page routes
app.use('/',view)

//db connected
require('./config/db').dbconnect()


app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port http://localhost:${port}`))