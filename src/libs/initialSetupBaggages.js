import baggageModel from '../models/baggage';

export const createBaggages = async () => {
    try {
        if (await baggageModel.estimatedDocumentCount() > 0) return;
    
        const values  = await Promise.all([
            new baggageModel({name : 'Básica', description: '2 equipajes de mano estándar que en conjunto no superen 10 kg y que cada uno mida máximo 55 x 40 x 25 cm (largo x ancho x alto)'}).save(),
            new baggageModel({name : 'Clásica', description: '2 equipajes de mano grandes que en conjunto no superen 20 kg y que cada uno mida máximo 55 x 40 x 25 cm (largo x ancho x alto)'}).save(),
            new baggageModel({name : 'Plus', description: '2 equipajes de mano grandes que en conjunto no superen 20 kg y que cada uno mida máximo 55 x 40 x 25 cm (largo x ancho x alto). Espacio preferente en la cabina para tu equipaje de mano (sujeto a disponibilidad). 1 equipaje documentado de hasta 25 kg y 158 cm totales (largo + ancho + alto)'}).save()
        ]);
    
        console.log(values)

    } catch (err) {
        console.error("error creating roles" ,err)
    }    

}