const { Schema, model } = require('mongoose');

const reactionSchema = new Schema(
  {
    reactionBody: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    userName: {
      type: String,
      required: true
    }
  }
)

const thoughtSchema = new Schema(
  {
     thoughtName: {
       type: String
     },
     createdAt: {
      type: Date,
      default: Date.now,
     },
     userName: {
      type: String,
      required: true
    },
     reactions: [
       reactionSchema
     ]
  }
);

thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;