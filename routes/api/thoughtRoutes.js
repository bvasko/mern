const router = require('express').Router();
// deconstructing the exported controllers from the thoughtController.js
const {
  getThoughts,
  createThought,
  getSingleThought,
  updateThought,
  deleteThought,
  newReaction,
  deleteReaction
} = require('../../controllers/thoughtController');
// setting up the routes for each controller
router.route('/').get(getThoughts).post(createThought);
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);
router.route('/:thoughtId/reactions').post(newReaction);
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;