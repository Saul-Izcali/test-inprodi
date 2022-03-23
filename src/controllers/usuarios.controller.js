const usuariosController = {};

const bcryptjs = require('bcryptjs');
const usuarioM = require('../model/Usuarios');
const jwt = require('jsonwebtoken');

usuariosController.crearCliente = async (req, res) => {
    const nuevoUsuario = new usuarioM(req.body);

    nuevoUsuario.usuarioCliente = {
        nombre: req.body.nombre,
        apellidoPaterno: req.body.aPaterno,
        apellidoMaterno: req.body.aMaterno,
        celular: req.body.celular
    }

    nuevoUsuario.contrasena = usuariosController.encriptar(nuevoUsuario.contrasena);

    console.log(nuevoUsuario)
    await nuevoUsuario.save();

    // res.status(200).json({'estado': 'ok'})
    // req.flash('success-msg', "Te has registrado")
    res.redirect('/')
};

usuariosController.crearEmpleado = async (req, res) => {
    const nuevoUsuario = new usuarioM(req.body);

    nuevoUsuario.usuarioEmpleado = {
        nombre: req.body.nombre,
        apellidoPaterno: req.body.aPaterno,
        apellidoMaterno: req.body.aMaterno,
        celular: req.body.celular,
        puesto: req.body.puesto
    }

    nuevoUsuario.contrasena = usuariosController.encriptar(nuevoUsuario.contrasena);

    console.log(nuevoUsuario)
    await nuevoUsuario.save();

    // res.status(200).json({'estado': 'ok'})
    // req.flash('success-msg', "Usuario registrado")
    res.redirect('/')
};



// Encriptar y desencriptar
usuariosController.encriptar = (contrasena) => {
    //se encripta la contraseña que le pasan como parametro con un salto de 8 y despues la retorna
    return bcryptjs.hashSync(contrasena, 8);
};

usuariosController.desencriptar = (contrasenaEnviada, contraseña) => {
    // contraseñas de prueba
    let contraseñaPasada = contrasenaEnviada,
        contraseñaGuardadaEnLaBD = contraseña;

    // compara la contraseña que le pasaron y la del usuario que se encuentra almacenada
    // entonces se encripta la contraseña que le pasaron y la compara con la encriptada guardada en la bd
    // esto por motivos de seguridad, para no desencriptar una y compararala asi
    return bcryptjs.compare(contraseñaPasada, contraseñaGuardadaEnLaBD);
};

usuariosController.compararContrasenas = async (req, res) => {
    const { id, contrasena } = req.body;

    const usr = await usuario.findById(id);
    const contrasenaBD = usr.contrasena;
    console.log(contrasenaBD);
    
    bcryptjs.compare(contrasena, contrasenaBD, (err, coinciden) => {
        if(err){
            return res.status(401).send("error al comparar la contraseña");
        }
        res.status(200).json({coinciden});
    });
};


usuariosController.signin = async (req, res) => {
    const { usuario, contrasena } = req.body;

    const usuarioIngresado = await usuarioM.findOne({usuario: usuario});// busca un usuario con ese nombre de usuario

    if(!usuarioIngresado) return res.status(401).send("El usuario no existe"); // en caso de no encontrar retorna ese string

    //los parametros de este metodo son la contraseña de texto plano, la contraseña encriptada y el callback
    bcryptjs.compare(contrasena, usuarioIngresado.contrasena, (err, coinciden) => {
        if(err){
            return res.status(401).send("error al comparar la contraseña");
        }
        if(coinciden == true){
            const token = jwt.sign({_id: usuarioIngresado._id}, 'llaveSecreta')
            let tipoUsuario = "comun";
            let idUsuario = usuarioIngresado._id;

            // if(!usuarioIngresado) return res.status(401).send("No coinciden");

            if(usuarioIngresado.usuarioAdmin){
                tipoUsuario = "admin";
                return res.redirect('/')
            }else if(usuarioIngresado.usuarioCliente){
                tipoUsuario = "cliente";
                // localStorage.setItem('token',res.token);
                // localStorage.setItem('IDU', res.idUsuario);
                // localStorage.setItem('TipoUsr', res.tipoUsuario);
                return res.redirect('/vuelos-cliente')
            }else if (usuarioIngresado.usuarioEmpleado){
                tipoUsuario = "empleado";
                return res.redirect('/vuelos-empleado')
            }

            console.log("El usuario es valido")
    
            // res.redirect('/')
            // return res.status(200).json({token, idUsuario, tipoUsuario})
        }else{
            return res.status(401).send("El usuario no existe");
        }
    })

};

usuariosController.crearAdmin = async (req, res) => {
    console.log(req.body)
    const nuevoUsuario = new usuarioM(req.body);
    console.log(nuevoUsuario);
    
    nuevoUsuario.usuarioAdmin = {
        admin: true
    }
    nuevoUsuario.contrasena = usuariosController.encriptar(nuevoUsuario.contrasena);

    await nuevoUsuario.save();

    res.status(200).json({'estado': 'ok'})
};



module.exports = usuariosController;
