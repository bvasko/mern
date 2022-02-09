const { User, Thought } = require('../models');

module.exports = {
  // finding all thoughts with associated reactions
  getThoughts(req, res){
    Thought
      .find()
      .populate('reactions')
      .then(async (thoughts) => (res.json(thoughts)))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // creating a thought and adding it to the thoughts array in the user model
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought)=> {
        return User.findOneAndUpdate(
          { username: req.body.username },
          { $addToSet: { 
              thoughts: thought._id 
            } 
          },
          { new: true }
        );
      })
      .then((user) => res.json('Created the thought 🎉'))
      .catch((err) => res.status(500).json(err));
  },
  // finding a single thought by id and its associated reactions
  getThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .populate('reactions')
      .select('-__v')
      .then(async (thought) => res.json({ thought }))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // finding a thought by id and updating it 
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: { 
          thoughtText: req.body.thoughtText, 
          reactions: req.body.reactions 
        }
      },
      { runValidators: true, new: true })
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
  removeThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thought) => res.json({thought}))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // finding a thought by id and adding a reaction to the reactions array in the thought model
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((reaction) => res.json(reaction))
      .catch((err) => res.status(500).json(err));
  },
  // finding thought by id and reaction by reactionId and deleting the reaction from the reactions array in the thought model
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: {reactionId: req.params.reactionId} } },
      { runValidators: true, new: true }
    )
      .then((reaction) => res.json(reaction))
      .catch((err) => res.status(500).json(err));
  },
};