// const jwt=require('jsonwebtoken');
// const jwtAuthMiddleware=(req,res,next)=>{
//     const authorization=req.headers.authorization
//     // SO if condition will work when its condition is True
//     // now if authorization is correct then if will wrong hence not executed 
//     // else it will excetuted 
//     if (!authorization) return res.status(401).json({ error: 'Token Not Found' });
    
//     // Extract the jwt token from the Request headers
//     const token=req.headers.authorization.split(' ')[1];
//     //Breaer jkjjkjgajkj exampleToken

//     if(!token) return res.status(401).json({error:'Unauthorized'});

//     try{
//         // Verify the token using the secret key

//         const decoded=jwt.verify(token,process.env.JWT_SECRET);
//         // Attach user info to the request object
//         req.user=decoded;
//         next();




//     }

//     catch(err)
//     {
//         console.log(err);
//         return res.status(401).json({error:'Invalid Token'});
//     }

// }

// // Funciton to generate token
// const generateToken=(userData)=>{
//     // Generate a new JWT token using user data
//     return jwt.sign(userData,process.env.JWT_SECRET,{expiresIn:30000});
// }
// module.exports={jwtAuthMiddleware,generateToken};