const renderUser = (user) => {
    return {
        id: user._id,
        name: user.name,
        email: user.email,
        age: user.age,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    };
};

const renderUsers = (users) => {
    return {
        count: users.length,
        users: users.map(user => renderUser(user))
    };
};

const renderError = (error) => {
    return {
        error: {
            message: error.message || 'An error occurred',
            status: error.status || 500
        }
    };
};

module.exports = {
    renderUser,
    renderUsers,
    renderError
}; 