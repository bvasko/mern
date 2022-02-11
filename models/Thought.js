const { Schema, model, Types } = require('mongoose');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId, 
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: true
    }
  }
)

const thoughtSchema = new Schema(
  {
     thoughtText: {
       type: String,
       required: true,
       max: 256
     },
     createdAt: {
      type: Date,
      default: Date.now,
     },
     username: {
      type: String,
      required: true
    },
     reactions: [
       reactionSchema
     ]
  },
  {
    toJSON: {
      virtuals: true
    },
    id: false,
  }
);

thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);
const handleError = (err) => console.error(err);

module.exports = Thought;