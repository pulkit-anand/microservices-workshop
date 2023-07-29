import cote from 'cote'

const orderResponder = new cote.Responder({ name: 'order responder', key: 'orders' })
orderResponder.on('*', (req: any) => req.type && console.log(req))

const orders = []
let idCounter = 0

orderResponder.on('create order', (req: any) => {
    const order = { id: idCounter++, ...req.order, status: 'preparing' }

    orders.push(order)
    return Promise.resolve(order)
})
