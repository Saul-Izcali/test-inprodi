//external importation
import mongoose from 'mongoose'

// own importation
import  FlightsModel  from '../models/flights'
import  UsersModel  from '../models/user'


const flightsController = {};

// options paginate, 10 flights x page
const optionsPagination = {
    page: 1,
    limit: 10
};


flightsController.createFlight = async (req, res) => {
    try {
        const newFlights = new FlightsModel(req.body);
        // console.log(newFlights)
    
        const flight = await newFlights.save();
        console.log("Flight created");

        //this flight is assigned to each user inside his array of flights
        let usr;
        for (const key in flight.clientsData) {
            try {
                usr = await UsersModel.findById(flight.clientsData[key].clientId)
                usr.flights.push([flight._id])
                await UsersModel.findByIdAndUpdate(usr._id, {flights: usr.flights})
                console.log("user ", usr.userName, " flights updated");
            } catch (error) {
                console.error(error)
            }
        }
        
        return res.redirect('/')
    } catch (error) {
        // RocketLogger.error(err);
        console.error(error);
        return res.status(500).send({ err : "Couldn't create flight" });
    }
};


flightsController.showFlightsPaginate = async (req, res) => {
    try {
        const flights = await FlightsModel.paginate({}, optionsPagination, (err, result) => {
            res.send({ items: result })
        });

        return res.status(200).json(flights)

    } catch (error) {
        // RocketLogger.error(err);
        console.error(error);
        return res.status(500).send({ err : "Couldn't get flights" });
    }
};


flightsController.getFlightsFilterByName = async (req, res) => {
    try {
        const flights = await FlightsModel.find( { nameFlight: req.body.nameFligth} );
        if(flights.length < 1) return res.json({message: "no one flight matches"})

        return res.status(200).json(flights)

    } catch (error) {
        console.error(error);
        return res.status(500).send({ err : "Couldn't filter flights" });
    }
};


flightsController.getFlightsFilterByDate = async (req, res) => {
    try {
        // get all flights between those two dates
        const flights = await FlightsModel.find({"$and" : [{"startTime" : {"$gte" : req.body.start}}, {"startTime" : {"$lte" : req.body.end}}]});

        // if no one flight is found return this
        if(flights.length < 1) return res.json({message: "no one flight matches"})

        return res.status(200).json(flights)

    } catch (error) {
        console.error(error);
        return res.status(500).send({ err : "Couldn't filter flights" });
    }
};


flightsController.acceptFlightInvitation = async (req, res) => {
    try {
        // console.log(req.params.id);     // id flight
        // console.log(req.body.userId);   // id user
        const flight = await FlightsModel.findById(req.params.id);

        // move through all objects of clientesData and where clientId matches with the id
        // passed by req.body changes accept to true
        flight.clientsData.forEach(element => {
            if(element.clientId == req.body.userId){
                element.accept = true;
            }
        });

        await FlightsModel.findByIdAndUpdate(req.params.id, flight);

        return res.status(200).json({message: "user accepted"})

    } catch (error) {
        console.error(error);
        return res.status(500).send({ err : "Couldn't accept invitation" });
    }
};


flightsController.rejectFlightInvitation = async (req, res) => {
    try {
        const flight = await FlightsModel.findById(req.params.id);

            // get position of client id into the array of objects 
            let indexClientToDelete = flight.clientsData.map(({clientId}) => clientId.toString()).indexOf(req.body.userId)

            if(indexClientToDelete == -1) return res.status(403).json({message: "user not found"}); // if user dont exist in that array return this

            // if user had already accepted invitation return this
            if(flight.clientsData[indexClientToDelete].accept == true) return res.status(403).json({message: "user cannot deny invitation, already accepted it"});

            // deleted object of this user in clientsData
            flight.clientsData.splice(indexClientToDelete, 1)

        await FlightsModel.findByIdAndUpdate(req.params.id, flight);

            return res.status(200).json({message: "user deny invitation"});
    } catch (error) {
        console.error(error);
        return res.status(500).send({ err : "Couldn't deny invitation" });
    }
};


flightsController.subscribeFlight = async (req, res) => {
    try {
        //para suscribir un usuario a un vuelo se deben guardar sus datos en el arreglo de clientsData dentro del flightModel
        //despues se debe guardar el id de este vuelo en el arreglo de flights dentro del userModel

        const flight = await FlightsModel.findById(req.params.id);

            // get position of client id into the array of objects 
            let indexClientToDelete = flight.clientsData.map(({clientId}) => clientId.toString()).indexOf(req.body.userId)

            // if user isn't found return this status and message
            if(indexClientToDelete != -1) return res.status(403).json({message: "user cannot subscribre, already in flight"});

            const newObjectUsr = {
                clientId: mongoose.Types.ObjectId(req.body.userId),
                // clientId: req.body.userId,
                accept: true
            };

            flight.clientsData.push(newObjectUsr);

        await FlightsModel.findByIdAndUpdate(req.params.id, flight);


        // now also have to uptdate the user document
        const user = await UsersModel.findById(req.body.userId);
        
        user.flights.push([flight._id]);
        await UsersModel.findByIdAndUpdate(user._id, {flights: user.flights})

        return res.status(200).json({message: "user subscribe to flight"});
    } catch (error) {
        console.error(error);
        return res.status(500).send({ err : "Couldn't subscribe to flight" });
    }
};


flightsController.deleteUsersFlight = async (req, res) => {
    try {
        // console.log(req.params.id);     // id flight
        // console.log(req.body.userId);   // id user
        const flight = await FlightsModel.findById(req.params.id);

            // get position of client id into the array of objects 
            let indexClientToDelete = flight.clientsData.map(({clientId}) => clientId.toString()).indexOf(req.body.userId)
            if(indexClientToDelete == -1) return res.status(403).json({message: "user not found"}); // if user dont exist in that array return this

            // deleted object of this user in clientsData
            flight.clientsData.splice(indexClientToDelete, 1);


        await FlightsModel.findByIdAndUpdate(req.params.id, flight);
        
            const user = await UsersModel.findById(req.body.userId);
 
            let indexFlightToDelete = user.flights.map(value => value).indexOf(req.params.id)
            user.flights.splice(indexFlightToDelete, 1);

        await UsersModel.findByIdAndUpdate(user._id, {flights: user.flights});

        return res.status(200).json({message: "user removed from flight"})
    } catch (error) {
        // RocketLogger.error(err);
        return res.status(500).send({ err : "Couldn't remove user" });
    }
};



export default flightsController;
