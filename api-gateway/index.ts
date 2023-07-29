import express from 'express'
import bodyParser from 'body-parser'
import cote from 'cote'

const app = express()

app.use(bodyParser.json())

const restaurantsRequester = new cote.Requester({ name: 'restaurants requester', key: 'restaurants' })

const orderRequester = new cote.Requester({ name: 'order requester', key: 'orders' })

const deliveryRequester = new cote.Requester({ name: 'delivery requester', key: 'deliveries' })

app.get('/restaurants', async (req:any, res:any) => {
    const restaurants = await restaurantsRequester.send({ type: 'list' })
    res.send(restaurants);
})

app.post('/order', async (req:any, res:any) => {
    const order = await orderRequester.send({ type: 'create order', order: req.body })
    const delivery = await deliveryRequester.send({ type: 'create delivery', order })

    res.send({ order, delivery })
})

app.listen(3000, () => console.log('listening'))
