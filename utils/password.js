const bcrypt=require('bcryptjs')
exports.plainToHash=async(password)=>{
    const salt =await bcrypt.genSalt(10)
    const hashpass=await bcrypt.hash(password,salt)
    return hashpass
}
exports.HashToplain=async(password,hash_pass)=>{
    const Match_pass=await bcrypt.compare(password,hash_pass)
    console.log("hash password",Match_pass);
    return Match_pass
    
}