const userModels = require('../models/userModels');
const bcrypt = require('bcrypt');

// Create and Save a new User
const createUser = async (req, res) => {
    try {
        const { username, password } = req.body; // Destructure the username, password from req.body
        // salt the password
        const salt = bcrypt.genSaltSync(10);
        // Hash the password
        const hash = bcrypt.hashSync(password, salt);
        console.log(hash); // Log the hash to the console
        // validating user credentials
        const user = await userModels.create({ username, password: hash });
        console.log(user); // Log the user to the console
        // check if the user exists
        if (user) {
            return res.status.json({ message: 'user already exists'});
        }
        // Create a new user
        const newUser = new userModel({email: username, password: hash});
        // Save the user
        await newUser.save();
        res.send('User created successfully');
    } catch (error) {
        res.send('Cannot create user');
    }
    // Delete User Function
    const deleteUser = async (req, res) => {
        try {
            const { username } = req.body;
            // delete the user
            await userModel.deleteOne({ username });
            res.send('User deleted successfully');
        } catch (error) {
            res.send('Cannot delete user');
        }
    }
    // Update User Function
    const updateUser = async (req, res) => {
        try {
            const { username, password } = req.body;
            // salt the password
            const salt = bcrypt.genSaltSync(10);
            // Hash the password
            const hash = bcrypt.hashSync(password, salt);
            // update the user
            await userModel.updateOne({ username }, { password: hash });
            res.send('User updated successfully');
        } catch (error) {
            res.send('Cannot update user');
        }
    }
    // get a single user
    const getUser = async (req, res) => {
        try {
            const { username } = req.body;
            // get the user
            const user = await userModel.findOne({  username });
            res.send(user);            
        } catch (error) {
            res.send('Cannot get user');        
        }                
    }   
};