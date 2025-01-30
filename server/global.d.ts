import { Request } from 'express';
import { User } from './src/middleware/authMiddleware';
declare global {
  namespace Express {
    interface Request {
      user?: User;  
    }
  }
}
