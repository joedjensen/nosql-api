const { User, Thought } = require('../models');

module.exports = {
    createUser(req, res) {
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err))
    },
    getUsers(req, res) {
        User.find()
        .then(async (users) => {return res.json(users)})
    },
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
          .select('-__v')
          .populate('friends')
          .populate('thoughts')
          .then(async (user) =>
            !user
              ? res.status(404).json({ message: 'No user with that ID' })
              : res.json({
                  user,
                })
          )
          .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
          });
      },
      addFriend(req, res) {
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { $addToSet: { friends: req.params.friendId } },
          { runValidators: true, new: true }
        )
          .then((user) =>
            !user
              ? res
                  .status(404)
                  .json({ message: 'No user found with that ID :(' })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
      },
      removeFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: {friends: req.params.friendId}},
            { runValidators: true, new: true }
            )
              .then((user) =>
                !user
                  ? res
                      .status(404)
                      .json({ message: 'No user found with that ID :(' })
                  : res.json(user)
              )
              .catch((err) => res.status(500).json(err));
      },
      deleteUser(req, res) {
        User.findOneAndRemove({ _id: req.params.userId })
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'No such user exists' })
              : User.updateMany(
                  { friends: req.params.userId },
                  { $pull: { friends: req.params.userId } },
                  { new: true }
                ).then((friends) =>
                !friends
                  ? res.json({
                      message: 'User deleted, no friends found',
                    })
                  : res.json({ message: 'User deleted, removed from friends lists' })
              )
              .catch((err) => {
                console.log(err);
                res.status(500).json(err);
              })
          )
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },
      updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true}
        )
        .then((user) =>
        !user
            ? res.status(404).json({ message: "No user with this id"})
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err))
      }
};