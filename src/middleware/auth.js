// externar importation
import  jwt  from 'jsonwebtoken'

// own importation
import UserModel from '../models/user'
import rolesModel from '../models/roles'


const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers["token"];
    
        if(!token) return res.status(403).json({error: "no token provided"});

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded._id;

        const user = await UserModel.findById(req.userId);
        if (!user) return res.status(404).json({ message: "no user found"});
    
        next();
    } catch (error) {
        console.error(error);
        return res.status(403).json({ message: "error token"})
    }
}

const isClient = async(req, res, next) => {
    const user = await UserModel.findById(req.userId);
    const roles = await rolesModel.find({_id: { $in: user.roles }})

    for (const i in roles) {
        if (roles[i].name === "client") {
            next();
            return;
        }
    }
    return res.status(403).json({ message : "require client token"})
}

const isEmployee = async(req, res, next) => {
    const user = await UserModel.findById(req.userId);
    const roles = await rolesModel.find({_id: { $in: user.roles }})

    for (const i in roles) {
        if (roles[i].name === "employee") {
            next();
            return;
        }
    }

    return res.status(403).json({ message : "require employee token"})
}

const isAdmin = async(req, res, next) => {
    const user = await UserModel.findById(req.userId);
    const roles = await rolesModel.find({_id: { $in: user.roles }})

    for (const i in roles) {
        if (roles[i].name === "admin") {
            next();
            return;
        }
    }
    return res.status(403).json({ message : "require admin token"})
}

export {verifyToken, isClient, isEmployee, isAdmin};