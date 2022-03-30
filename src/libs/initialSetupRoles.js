import rolesModel from '../models/roles';

export const createRoles = async () => {
    try {
        if (await rolesModel.estimatedDocumentCount() > 0) return;
    
        const values  = await Promise.all([
            new rolesModel({name : 'admin'}).save(),
            new rolesModel({name : 'employee'}).save(),
            new rolesModel({name : 'client'}).save()
        ]);
    
        console.log(values)

    } catch (err) {
        console.error("error creating roles" ,err)
    }    

}