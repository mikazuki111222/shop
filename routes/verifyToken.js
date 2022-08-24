
const jwt = require('jsonwebtoken')

const verifytoken = (req,res,next) =>{
    const authHeader = req.headers.verifytoken
    if(authHeader){
        const token = authHeader.split(" ")[1]
        jwt.verify(token,process.env.SEC_KEY_JWT,(err,user)=>{
            if(err) res.status(403).json('token is not valid')
            req.user = user
            next()
        })
    }else{
        return res.status(401).json('you are not authenticated')
    }
}

const verifyTokenAndAuthorization = (req,res,next)=>{
    verifytoken(req,res,()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next()
        }else{
            res.status(403).json('you are not alowed')
        }
    })
}

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
      if (req.user.isAdmin) {
        next();
      } else {
        res.status(403).json("You are not alowed to do that!");
      }
    });
  };

module.exports = {verifytoken,verifyTokenAndAuthorization};