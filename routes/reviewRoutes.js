const express = require('express');
const authController = require('../controllers/authController');
const reveiwController = require('../controllers/reviewController');

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router
  .route('/')
  .get(reveiwController.getAllReview)
  .post(
    authController.restrictTo('user'),
    reveiwController.setTourUserIds,
    reveiwController.createReview
  );

router
  .route('/:id')
  .get(reveiwController.getReview)
  .patch(
    authController.restrictTo('user', 'admin'),
    reveiwController.updateReview
  )
  .delete(
    authController.restrictTo('user', 'admin'),
    reveiwController.deleteReveiw
  );

module.exports = router;
