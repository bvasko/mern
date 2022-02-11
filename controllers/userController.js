
const { User, Thought } = require('../models');

module.exports = {
  // finding all users
  getUsers(req, res) {
    User.find()
      .then(async (users) => res.json(users))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // creating a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // finding a user by id and associated thoughts and friends
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .populate('thoughts')
      .populate('friends')
      .select('-__v')
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
// updating a user by id
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: { username: req.body.username, email: req.body.email } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'No User found with that ID :(' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // finding a user by id and then deleting it and its associated thoughts
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No such user exists' })
          : Thought.deleteMany({username: user.username})
          .then(res.json("User and associated thoughts deleted!"))
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // creating a new friend and adding it to the friends array in the user model
  newFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((friend) =>
        !friend
          ? res
              .status(404)
              .json({ message: 'No friend found with that ID :(' })
          : res.json(friend)
      )
      .catch((err) => res.status(500).json(err));
  },
  // finding a user by id and friend by the friendId and deleting the friend from the friends array in the user model
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((friend) =>
        !friend
          ? res
              .status(404)
              .json({ message: 'No friend found with that ID :(' })
          : res.json(friend)
      )
      .catch((err) => res.status(500).json(err));
  },
};