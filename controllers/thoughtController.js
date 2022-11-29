const { User, Thought } = require('../models');

module.exports = {
    getThoughts(req, res) {
        Thought.find()
        .then(async (thoughts) => {return res.json(thoughts)})
    },
    createThought(req, res) {
        Thought.create(req.body)
        .then((thought) => {
            return User.findOneAndUpdate(
                { username: req.body.username },
                { $push: { thoughts: thought._id}},
                { new: true }
            )
        })
        .then((updatedUser) => 
            !updatedUser
            ? res.status(404).json({ message: 'Thought created, but no user found with that username.' })
            : res.json(`Created new thought from ${updatedUser.username}!`)    
    )
    .catch((err) => res.status(500).json(err))
    }
}