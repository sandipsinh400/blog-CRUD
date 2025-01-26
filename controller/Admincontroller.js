const Admin=require('../models/Adminmodel');
const { plainToHash, HashToplain } = require('../utils/password');

exports.register=async(req,res)=>{
 
 try {
       const {Username,email, Password}=req.body
       const existEmail=await Admin.findOne({email}).countDocuments().exec()
       if(existEmail>0){
           res.json('email id is all ready existed')
       }else{
           const hash_pass = await plainToHash(Password)
           console.log(hash_pass);
           await Admin.create({
               Username,email,Password:hash_pass,
           })
         res.redirect('/login')
       }
 } catch (error) {
    res.render(error)
 }
}
exports.login=async(req,res)=>{
  try {
      const {email, Password}=req.body    
      const existEmail=await Admin.findOne({email}).countDocuments().exec()
      if(existEmail>0){
          
          const admin=await Admin.findOne({email})
         const match_pass= await HashToplain(Password,admin.Password)
         if(match_pass){
              const payload={
                  username:admin.Username,
                  email:admin.email
              }
  
              //set data into cookie
              res.cookie("admin",payload,{httpOnly:true})
              res.redirect('/')
         }else{
          res.json("plese enter your valid password")
         }
          
      }else{
          res.json("email id is not existed")
      }
  } catch (error) {
    res.render(error)
  }
}
exports.updateprofile=async(req,res)=>{
   try {
     console.log(req.body);
     console.log(req.file);
     const {email,Username}=req.body
     const existEmail=await Admin.findOne({email}).countDocuments().exec()
     if(existEmail>0){
         await Admin.updateOne(
             {email},
         {    Username,
             profile_my:req?.file?.filename
         }
         )
     }else{
         res.render('email id is not existed')
     }
   } catch (error) {
        res.render(error)
   }
    
}