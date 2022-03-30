//external importation
import  bcryptjs  from 'bcryptjs'
import  jwt  from 'jsonwebtoken'

// own importation
import  UserModel  from '../models/user'
import  rolesModel  from '../models/roles'


const authController = {};


authController.login = async (req, res) => {
    try {
        console.log("janfadlfkn")
        const { userName, password } = req.body;

        const currentUser = await UserModel.findOne({userName}).populate('roles');// busca un usuario con ese nombre de usuario
        if(!currentUser) return res.status(401).send("user doesnt exist"); // en caso de no encontrar retorna ese string

        console.log(currentUser);

        //los parametros de este metodo son la contraseña de texto plano, la contraseña encriptada y el callback
        bcryptjs.compare(password, currentUser.password, (err, coinciden) => {
            if(err){
                return res.status(401).send("error comparing password");
            }
            if(coinciden == true){
                const token = jwt.sign({_id: currentUser._id}, process.env.JWT_SECRET, {
                    expiresIn: 432000
                })

                console.log("user is valid")
                console.log(token)

                return res.redirect('/see-flights-client')
            }else{
                return res.status(401).send("user doesnt exist");
            }
        })   
    } catch (err) {
        console.log(err)
    }

};



export default authController;
