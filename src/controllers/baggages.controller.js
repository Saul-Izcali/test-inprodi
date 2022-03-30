//external importation

// own importation
import  BaggagesModel   from '../models/baggage'
import  FlightsModel   from '../models/flights'


const baggageController = {};


baggageController.addBaggage = async (req, res) => {
    try {

        const flight = await FlightsModel.findById(req.body.flightId);
            if(!flight) return res.status(403).json({ message : "flight not found"})
        
        let i = flight.clientsData.map(({clientId}) => clientId.toString()).indexOf(req.body.userId)
            if(i == -1) return res.status(403).json({message: "user not found inside the flight"}); // if user isn't subscribe return this
            if(flight.clientsData[i].accept == false) return res.status(403).json({message: "user has not accepted flight invitation"});
        
        const baggage = await BaggagesModel.findById(req.params.id);
            if(!baggage) return res.status(403).json({message: "baggage is not valid"}); // if this baggage isn't saved on database return this

            flight.clientsData[i].baggage = req.params.id

        await FlightsModel.findByIdAndUpdate(flight._id , flight)

        return res.status(200).json({ message : "user baggage saved"})
    } catch (error) {
        console.error(error)
        // RocketLogger.error(err);
        return res.status(500).send({ err : "Couldn't add user baggage" });
    }
};

baggageController.deleteBaggage = async (req, res) => {
    try {
        const flight = await FlightsModel.findById(req.body.flightId);
            if(!flight) return res.status(403).json({ message : "flight not found"});

        let i = flight.clientsData.map(({clientId}) => clientId.toString()).indexOf(req.body.userId)
            if(i == -1) return res.status(403).json({message: "user not found inside the flight"}); // if user isn't subscribe return this
            if(!flight.clientsData[i].baggage) return res.status(403).json({message: "user haven't baggage"});

        flight.clientsData[i].baggage = null;
        await FlightsModel.findByIdAndUpdate(flight._id, flight);
        // await FlightsModel.findByIdAndUpdate(flight._id, {$unset: {"clientsData[i].baggage" : ""}});

        return res.status(200).json({ message : "user baggage deleted"})
    } catch (error) {
        console.error(error)
        return res.status(500).send({ err : "Couldn't deleted user baggage" });
    }
};


export default baggageController;
