const User = require('../models/userModel');
const { renderUser, renderUsers, renderError } = require('../views/userViews');

// Get all users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(renderUsers(users));
    } catch (error) {
        res.status(500).json(renderError(error));
    }
};

// Get user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json(renderError({ message: 'User not found', status: 404 }));
        }
        res.status(200).json(renderUser(user));
    } catch (error) {
        res.status(500).json(renderError(error));
    }
};

// Create new user
exports.createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(renderUser(user));
    } catch (error) {
        res.status(400).json(renderError(error));
    }
};

// Update user
exports.updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json(renderError({ message: 'User not found', status: 404 }));
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        res.status(200).json(renderUser(updatedUser));
    } catch (error) {
        res.status(400).json(renderError(error));
    }
};

// Delete user
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json(renderError({ message: 'User not found', status: 404 }));
        }

        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: 'success',
            message: 'User deleted successfully'
        });
    } catch (error) {
        res.status(500).json(renderError(error));
    }
}; 