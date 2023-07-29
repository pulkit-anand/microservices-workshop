import cote from 'cote';
import { Restaurant, menuItems } from '../shared//database/model/restaurant';
import sequelize from '../shared/database/pgdb';


const restaurantsResponder = new cote.Responder({ name: 'restaurants responder', key: 'restaurants' })
restaurantsResponder.on('*', (req: any) => req.type && console.log(req))

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
    
    for(const rest of restaurants){
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

restaurantsResponder.on('list', (req: any) => getRestaurantsFromDb())
