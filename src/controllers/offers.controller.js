//external importation
 
// own importation
import  FlightsModel  from '../models/flights'
import  UsersModel  from '../models/user'

// * se va a checar cada 24 horas los vuelos
// * si el vuelo aun no ha pasado la fecha continua
// * si el vuelo faltan menos de 5 dias para que salga continua
// * si el vuelo tiene mas de la mitad de su capacidad disponible continua
// * si el vuelo aun no ha tenido un descuento
// rebaja a la mitad el costo por asiento

export const funcionDescuentos = setInterval(async ()=>{
        try {
            console.log("interval")
            const flights = await FlightsModel.find( { $and : [ {startTime : { $gt :  Date.now()}} , { appliedOffer : false }]} );

            flights.forEach( async (element) => {
                let difference = element.startTime - Date.now()

                if(difference < 430000000 ){    // every 5 days aprox
                    if ( element.currentCapacity < element.totalCapacity/2 ) {
                        let discount = element.costPerSeat * 0.5 // 50% off
                        element.costPerSeat = discount
                        element.appliedOffer = true

                        await FlightsModel.findByIdAndUpdate(element._id,  element);
                        console.log("updated flight cost")
                    }
                }
            });

        } catch (error) {
            console.error(error)
        }
}, 600000); 

