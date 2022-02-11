
const router = require('express').Router();
// deconstructing the controllers from the userController.js
const {
  getUsers,
  createUser,
  getSingleUser,
  updateUser,
  deleteUser,
  newFriend,
  deleteFriend,
} = require('../../controllers/userController');
router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getSingleUser).delete(deleteUser).put(updateUser);

router.route('/:userId/friends/:friendId').post(newFriend).delete(deleteFriend);

module.exports = router;