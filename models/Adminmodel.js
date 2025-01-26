const { Schema, Types, model } = require("mongoose");

const common={
    type: String,
    required: true,
    trim: true,
}
const adminschema= new Schema({
    Username:common,
    email:common,
    Password:{
        ...common,
        unique:false
    },
    profile_my:String

},{
    timestamps:true
})
const adminstore=model("admin",adminschema)
module.exports=adminstore