
import express , {Request , Response} from "express";
import { ProductRoutes } from './modules/products/products.route';
import { OrderRoutes } from './modules/orders/orders.route';
const app = express()



//step 1 : to use parsers
app.use(express.json());


//products route
app.use('/api/products', ProductRoutes);

// order routes 
app.use('/api/orders', OrderRoutes);

//const port = 3000
app.get('/', (req : Request, res : Response) => {
  res.send('Hello World!')
})

export default app;