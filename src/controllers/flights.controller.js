//external importation

// own importation
import  FlightsModel  from '../models/flights'


const flightsController = {};


flightsController.createFlight = async (req, res) => {
    try {
        const newFlights = new FlightsModel(req.body);
    
        await newFlights.save();
        console.log("Flight created");
        
        return res.redirect('/')
    } catch (error) {
        // RocketLogger.error(err);
        return res.status(500).send({ err : "Couldn't create flight" });
    }
};



export default flightsController;
