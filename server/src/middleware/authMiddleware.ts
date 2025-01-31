import { Response, Request,NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export interface User {
    id:number,
    iast:number,
    exp:number
}
export const authMiddleware =(req:Request,res:Response,next:NextFunction)=>{
    try { 
     const authHeader = req.headers.authorization
     if(authHeader === null || authHeader === undefined){
        res.status(401).json({status:401, message:'UnAuthorized'})
        return;
       }
       const token = authHeader.split(" ")[1]
       // verify token 
        jwt.verify(token,process.env.JWT_SECRET!,(err,decoded)=>{
            if (err) {
                 res.status(401).json({ message: 'Invalid or expired token' })
                 return;
              }
              req.user  = decoded as User
              
              next()
        })

             
    } catch (error) {
        res.status(500).json({error:'Internal Server Error'})
    }
}



