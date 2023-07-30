import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import cote from 'cote'
import { CustomRequest, authenticateJWT, createAuthToken } from '../shared/middlewares/auth.middleware'

const app = express()

app.use(bodyParser.json())

const restaurantsRequester = new cote.Requester({ name: 'restaurants requester', key: 'restaurants' })

const orderRequester = new cote.Requester({ name: 'order requester', key: 'orders' })

const deliveryRequester = new cote.Requester({ name: 'delivery requester', key: 'deliveries' })

app.get('/restaurants', async (req:Request, res:Response) => {
    const restaurants = await restaurantsRequester.send({ type: 'list' })
    res.send(restaurants);
})

app.post('/order', authenticateJWT, async (req:Request, res:Response) => {
    const {userId} = (req as CustomRequest).payload as {userId: number};
    const order = await orderRequester.send({ type: 'create order', order: req.body, userId:  userId});
    const delivery = await deliveryRequester.send({ type: 'create delivery', order })
    res.send({ order, delivery })
})

app.get('/my-orders', authenticateJWT, async(req: Request, res: Response) => {
    const {userId} = (req as CustomRequest).payload as {userId: number};
    const orders = await orderRequester.send({type: 'find orders', userId});
    res.send(orders)
});


app.post('/login', async( req: Request, res: Response) => {
    const { username, password } = req.body;
    const token = await restaurantsRequester.send({type: 'customer login', credentials: {username, password}});
    res.send({
        token
    });
})


app.listen(3000, () => console.log('listening'))
