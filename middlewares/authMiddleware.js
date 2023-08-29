const authenticateToken =(req,res,next)=>{
    const authHeader = req.headers['authorization']
    console.log('authHeader',authHeader);

    const token = authHeader && authHeader.split(' ')[1]
    console.log('token', token)
} 

export {authenticateToken}