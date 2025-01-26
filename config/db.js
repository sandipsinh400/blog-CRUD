const { default: mongoose } = require("mongoose");

exports.dbconnect=()=>{
mongoose.connect('mongodb+srv://zalasandipsinh3185:y637HINk7yWhLEVF@school.x4mcg.mongodb.net/blog')
.then(()=>{
    console.log("db....connect....🤣");
})
.catch((err)=>{
    console.log(err);
})}