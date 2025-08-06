import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import Auth from '../Models/Auth.Model.js'
dotenv.config();
export const signupController = async (req, res) => {
    try {
        const { username, email, password, role, phoneNumber } = req.body;
        if (!username || !email || !password || !role) {
            return res.status(400).json({
                message: "Please fill all the mendatory fields"
            })
        }
        if (password.length < 8) {
            return res.status(400).json({
                message: "Password must be at least 8 characters long"
            });
        }

        const existingUser = await Auth.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                message: "User already exists"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await Auth.create({
            username,
            email,
            password: hashedPassword,
            role,
            phoneNumber
        })
        return res.status(201).json({
            message: `User created successfully with role ${role}`,
            newUser
        });
    } catch (error) {
        console.log("error in signup controller" + error.message);
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

export const signinController = async (req, res) => {
    try {
        const { nameoremail, password, role } = req.body;
        if (!nameoremail || !password || !role) {
            return res.status(400).json({
                message: "Please fill all the mendatory fields"
            })
        }
        const existingUser = await Auth.findOne({
            $or: [
                { username: nameoremail },
                { email: nameoremail }
            ]
        });
        console.log(password)
        if (!existingUser) {
            return res.status(400).json({
                message: "User doesnot exist"
            })
        }
        if (existingUser.role !== role) {
            return res.status(403).json({
                message: `Unauthorized role access`
            });
        }
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials"
            })
        }
        const token = jwt.sign(
            { id: existingUser._id, role: existingUser.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        )
        return res.status(200).json({
            message: `User logged in successfully with role ${role}`,
            user: {
                id: existingUser._id,
                name: existingUser.name,
                email: existingUser.email,
                role: existingUser.role, 
            },
            token
        })
    } catch (error) {
        console.log("Signin Error " + error.message);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}