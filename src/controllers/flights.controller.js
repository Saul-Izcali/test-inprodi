//external importation

// own importation
import  FlightsModel  from '../models/flights'


const flightsController = {};

const optionsPagination = {
    page: 1,
    limit: 10
};

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


flightsController.showFlightsPaginate = async (req, res) => {
    try {
        const flights = await FlightsModel.paginate({}, optionsPagination, (err, result) => {
            res.send({
                        items: result
                    })
        });

        return res.status(200).json(flights)

    } catch (error) {
        // RocketLogger.error(err);
        return res.status(500).send({ err : "Couldn't see flight" });
    }
};


flightsController.getFlightsFilterByName = async (req, res) => {
    try {
        const flights = await FlightsModel.find( { nameFlight: req.body.nameFligth} );
        if(flights.length < 1) return res.json({message: "no one flight matches"})

        return res.status(200).json(flights)

    } catch (error) {
        // RocketLogger.error(err);
        return res.status(500).send({ err : "Couldn't see flight" });
    }
};

flightsController.getFlightsFilterByDate = async (req, res) => {
    try {

        const flights = await FlightsModel.find({"$and" : [{"startTime" : {"$gte" : req.body.start}}, {"startTime" : {"$lte" : req.body.end}}]});

        if(flights.length < 1) return res.json({message: "no one flight matches"})

        return res.status(200).json(flights)

    } catch (error) {
        // RocketLogger.error(err);
        return res.status(500).send({ err : "Couldn't see flight" });
    }
};



export default flightsController;
