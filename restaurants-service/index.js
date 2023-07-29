const cote = require('cote')
const {Restaurant, menuItems} = require('../shared/database/model/restaurant');
const sequelize = require('../shared/database/pgdb');


const restaurantsResponder = new cote.Responder({ name: 'restaurants responder', key: 'restaurants' })
restaurantsResponder.on('*', req => req.type && console.log(req))


restaurantsResponder.on(req => req.type && console.log(req))


async function initializeRestaurantsData() {
    const restaurants = [{
        name: 'Italian Restaurant',
        menu: [{
            name: 'Pizza',
            price: 14
        }, {
            name: 'Pasta',
            price: 12
        }]
    }, {
        name: 'American Restaurant',
        menu: [{
            name: 'Hamburger',
            price: 10
        }, {
            name: 'Hot dog',
            price: 10
        }]
    }]
    
    for(rest of restaurants){
        await Restaurant.create(rest, {
            include: [
                {
                    association: menuItems,
                    as: 'menu'
                }
            ]
        });
    }
}

const getRestaurantsFromDb = async () => {
    try {
        await sequelize.sync({force: true});
        const count = await Restaurant.count();
        if(count === 0){
            await initializeRestaurantsData();
        }
        const result = await Restaurant.findAll({ include: ["menu"] });    
        return result;
    }
    catch (error) {
        console.log(error)
    }

}

restaurantsResponder.on('list', req => getRestaurantsFromDb())
