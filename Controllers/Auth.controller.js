import UserModal from "../Modals/User.model.js";
import bcrypt from 'bcrypt';
import  Jwt  from "jsonwebtoken";

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(401).json({ success: false, message: "all fields are mandotory..." })

        const user = await UserModal.findOne({ email: email })
        // console.log(user, "user")

        if (!user) return res.status(401).json({ success: false, message: "email is wrong" })

        const isPasscorrect = await bcrypt.compare(password, user.password);
        // console.log(isPasscorrect, "CHECK HERE")

        if (!isPasscorrect) {
            return res.status(401).json({ success: false, message: "Password is wrong" })
        }

        const token = await Jwt.sign({id:user._id},process.env.JWT_SECRETE)
        // console.log(token, "token")

        return res.status(200).json({ success: true, message: "Login successfully", user: { name: user.name, id: user._id }, token })

    } catch (error) { 
        return res.status(500).json({ success: false, message: error })
    }

}

export const Register = async (req, res) => {
    try {
        //console.log(req.body, "req.body")
        const { name, email, password, number } = req.body;
        if (!name || !email || !password || !number) return res.status(401).json({ success: false, message: "all fields are mandotory..." })

        const hashdPassword = await bcrypt.hash(password, 10);
        // console.log(hashdPassword,"hashedPassword")
        const user = new UserModal({
            name: name,
            email,
            password: hashdPassword,
            number
        })

        await user.save();

        return res.status(200).json({ success: true, message: "Registration Successfull" })

    } catch (error) {
        return res.status(500).json({ success: false, message: error })
    }
}

export const getCurrentUser = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) return res.status(401).json({ success: false, message: "ID is required" })
        const user = await UserModal.findById(id);
        if(!user) return res.status(401).json({success:false,message:"User not found"})

        return res.status(200).json({success:true, user:{name:user.name,id:user._id}})

    } catch (error) {
       return res.status(500).json({success: false,message:"error"})
    }
}