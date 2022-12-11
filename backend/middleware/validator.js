const { check, validationResult } = require('express-validator');

exports.userVaidator = [
    check('name')
        .trim()
        .not()
        .isEmpty()
        .withMessage("Last Name can not be empty"),

    check('phoneNumber')
        .trim()
        .isInt()
        .not()
        .isEmpty()
        .withMessage("Phone Number can not be empty")
        .isLength({min: 10, max: 10})
        .withMessage("Phone Number must be 10 digit long!"),

    check('email')
        .normalizeEmail()
        .isEmail()
        .withMessage("Invalid Emial!"),

    check('age')
    .trim()
    .not()
    .isEmpty()
    .withMessage("Age can not be empty"),

    check('password')
        .trim()
        .not()
        .isEmpty()
        .withMessage("Password can not be empty")
        .isLength({min: 6, max: 20})
        .withMessage("Password must be 8 to 20 character long"),
];


exports.signInValidator = [
    check('email')
        .normalizeEmail()
        .isEmail()
        .withMessage("Invalid Emial!"),

    check('password')
        .trim()
        .not()
        .isEmpty()
        .withMessage("Password can not be empty")
]


exports.validate = (req, res, next) => {
    const error = validationResult(req).array();

    if(error.length){
        return res.json({error: error[0].msg})
    }

    next();

}
