const { Router } = require('express');
const router = Router();

const { renderSignUpForm,
    renderSigninForm,
    signup,
    signin,
    logout
}
    = require('../controllers/users.controller')

router.get('/users/signUp', renderSignUpForm);

router.post('/users/signUp', signup);

router.get('/users/signIn', renderSigninForm);

router.post('/users/signIn', signin);

router.get('/users/logout', logout);



module.exports = router;