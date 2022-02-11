const { User, Thought } = require('../models');

module.exports = {
  // finding all thoughts with associated reactions
  getThoughts(req, res){
    Thought
      .find()
      .populate('reactions')
      .then(async (thoughts) => {
        return res.json(thoughts);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // creating a thought and adding it to the thoughts array in the user model
  createThought(req, res) {
    console.log(req.body)
    Thought.create(req.body)
      .then((thought)=> {
        return User.findOneAndUpdate(
          { username: req.body.username },
          { $addToSet: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'Thought created, but found no user with that ID' })
          : res.json('Created the thought 🎉')
      )
      .catch((err) => res.status(500).json(err));
  },
  // finding a single thought by id and its associated reactions
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .populate('reactions')
      .select('-__v')
      .then(async (thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json({
              thought,
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // finding a thought by id and updating it 
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: { thoughtText: req.body.thoughtText, reactions: req.body.reactions } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: 'No thought found with that ID :(' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // finding a thought by id and deleting it
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No such thought exists' })
          : res.json({
            thought,
          })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // finding a thought by id and adding a reaction to the reactions array in the thought model
  createReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((reaction) =>
        !reaction
          ? res
              .status(404)
              .json({ message: 'No reaction found with that ID :(' })
          : res.json(reaction)
      )
      .catch((err) => res.status(500).json(err));
  },
  // finding thought by id and reaction by reactionId and deleting the reaction from the reactions array in the thought model
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: {reactionId: req.params.reactionId} } },
      { runValidators: true, new: true }
    )
      .then((reaction) =>
        !reaction
          ? res
              .status(404)
              .json({ message: 'No reaction found with that ID :(' })
          : res.json(reaction)
      )
      .catch((err) => res.status(500).json(err));
  },
};