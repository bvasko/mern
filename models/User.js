const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thought'
      }
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user'
      }
    ],
    email: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
    }
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  });
  userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
  });
const User = model('user', userSchema);

module.exports = User;