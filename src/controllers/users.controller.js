//external importation
import  bcryptjs    from 'bcryptjs'
import  jwt         from 'jsonwebtoken'

// own importation
import  UserModel   from '../models/user'
import  rolesModel  from '../models/roles';


const usersController = {};


usersController.createUser = async (req, res) => {
    try {
        console.log(req.body)
        const {roles} = req.body
        const newUser = new UserModel(req.body);
        newUser.password = usersController.encryptPassword(newUser.password);
    
        if(roles){
            const foundRoles = await rolesModel.find({name : {$in: roles}})
            newUser.roles = foundRoles.map(role => role._id);
        }else{
            const role = await rolesModel.findOne({name : "client"});
            newUser.roles = [role._id];
        }

        console.log(newUser)
        await newUser.save();
        console.log("user created")
    
        return res.redirect('/')
    } catch (error) {
        // RocketLogger.error(err);
        return res.status(500).send({ err : "Couldn't create user" });
    }
};


/*
usersController.createEmployee = async (req, res) => {
    try {
        const newUser = new UserModel(req.body);
        newUser.password = usersController.encryptPassword(newUser.password);
    
        await newUser.save();
    
        return res.redirect('/')
    } catch (error) {
        return res.status(500).send({ err : "Couldn't create user" });
    }
};

usersController.createAdmin = async (req, res) => {
    try {
        const newUser = new UserModel(req.body);
        newUser.password = usersController.encryptPassword(newUser.password);
    
        await newUser.save();
    
        return res.redirect('/')
    } catch (error) {
        return res.status(500).send({ err : "Couldn't create user" });
    }
};
*/


usersController.encryptPassword = (password) => {
    //se encripta la contraseña que le pasan como parametro con un salto de 8 y despues la retorna
    return bcryptjs.hashSync(password, 8);
};


export default usersController;
