export const verifyFlightHours = async (tiempoLlegada, tiempoPartida) => {
    if (tiempoLlegada < tiempoPartida) {
        return res.status(400).send({ err : "The start date can't be less than the end date." });
    }
};