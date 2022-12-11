const express = require('express');
const { create, verifyEmail, signIn, makePayement, payementVerification } = require('../controller/user');
const { userVaidator, validate, signInValidator  } = require('../middleware/validator');

const router = express.Router();

router.post('/create', userVaidator, validate, create);
router.post('/verify-email',verifyEmail);
router.post('/signIn',signInValidator,validate,signIn);
router.post('/payement',makePayement);
// router.post('/payement-verification',payementVerification);


module.exports = router;