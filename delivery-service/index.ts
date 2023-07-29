import cote from 'cote'

const deliveryResponder = new cote.Responder({ name: 'delivery responder', key: 'deliveries' })
deliveryResponder.on('*', (req: any) => req.type && console.log(req))

const deliveries = []
let idCounter = 0

deliveryResponder.on('create delivery', (req:any ) => {
    const delivery = { id: idCounter++, orderId: req.order.id, eta: 30, status: 'pending' }
    deliveries.push(delivery)
    return Promise.resolve(delivery)
})