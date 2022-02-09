const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  addFriend,
  removeFriend
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);
router.route('/:userId').delete(deleteUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser);
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;
