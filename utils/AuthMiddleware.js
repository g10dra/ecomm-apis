const { ValidateJWT } = require("./JwtUtil");

const AuthMiddleware = function (req, res, next) {
   //exclude public routes first 
   const publicRoutes = ['/','/users/register','/users/login','/product/getAll' ]; // '/users/create-super-admin'
   const currentRoute = req.path;
   if (publicRoutes.includes(currentRoute)) {
       next();
   } else {
        //check the auth token
        const bearerHeader = req.headers['authorization'];
        if (typeof bearerHeader !== 'undefined') {
            const bearer = bearerHeader.split(' ');
            const token = bearer[1];
            //validate token
            ValidateJWT(token, function (err, decoded) { 
                if (err) return res.status(401).json({ error: true, message: 'Failed to authenticate token.' });
                req.currentUserId=decoded.user_id;
                if(currentRoute.includes('/product') && Boolean(decoded?.IsAdmin)===false){
                    res.status(403).json({
                        error:true,
                        message: "Forbidden, you are not Authorised to manage products!"
                    })
                }else{
                 next();
                }
            });
        } else {
            res.status(401).json({
                error:true,
                message: "Auth Token is missing in headers!"
            })
        }
    }
    
}
module.exports={
    AuthMiddleware
}