const { Schema, model } = require("mongoose");
const { propfind } = require("../routes/Blogroutes");

const common = {
    type: String,
    trim: true,
}
const blogschema = new Schema({
    Blog_Category:{
        ...common,
        require:true
    },
    Blog_Title: common,
    Contact_number:{
        ...common,  
        type:Number
    },
    Message:common,
    profile_name:String
},{
    timestamps:true
})
const Blogstore = model('blog', blogschema)
module.exports = Blogstore