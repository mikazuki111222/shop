const User = require('../models/User')
const {verifytoken, verifyTokenAndAuthorization} = require('./verifyToken')

const router = require('express').Router()

router.put('/:id',verifyTokenAndAuthorization, async (req,res)=>{
    if (req.body.password) {
       req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.SEC_KEY_PASS
          ).toString()
    }

    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{new:true}
        )
        res.status(200).json(updatedUser)
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router