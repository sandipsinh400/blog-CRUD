const bcrypt=require('bcryptjs')
exports.plainToHash=async(Password)=>{
    const salt =await bcrypt.genSalt(10)
    const hashpass=await bcrypt.hash(Password,salt)
    return hashpass
}
exports.HashToplain=async(Password,hash_pass)=>{
    const Match_pass=await bcrypt.compare(Password,hash_pass)
    console.log(Match_pass);
    return Match_pass
    
}