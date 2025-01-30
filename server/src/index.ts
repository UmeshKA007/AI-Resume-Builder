import express,{ Application } from 'express'
import cors from 'cors'
import userRoutes from './routes/userRoutes'
const app:Application = express()

const PORT = 8000

app.use(cors())
app.use(express.json())
app.use('/api/v1/user',userRoutes)

app.listen( PORT,()=>{
  console.log(`Server is running on PORT ${PORT}`)
})

