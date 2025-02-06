const express = require('express')
const app = express()
const port = process.port || 3000
const cookieparser=require('cookie-parser')

const blogroute=require('./routes/Blogroutes')
const { db } = require('./models/Blogmodel')
const adminrout=require('./routes/Adminroutes')
const view=require('./routes/page.routes')
const flash=require('express-flash')
const session=require('express-session')
const passport=require('passport')
const passportauth=require('./config/passport')
passportauth(passport)

app.use(express.json())
app.use(express.urlencoded({extended:true}))

require('dotenv').config()
app.set('view engine','ejs')
app.use(express.static("public"))

app.use(cookieparser())
app.use(session({
    secret: 'dfdsfdsf',
    resave: false, // Only save if something changed
    saveUninitialized: false, // Don't create sessions for unauthenticated users
    cookie: { secure: false } // Set `true` if using HTTPS
}));

app.use(flash())
app.use(session({ secret: 'dfdsfdsf', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());


require('./config/db').dbconnect()
app.use('/profile',express.static('upload'))
app.use('/api/blog',blogroute)
app.use('/api/admin',adminrout)



//page routes
app.use('/',view)

//db connected


app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port http://localhost:${port}`))