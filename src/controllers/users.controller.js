const usersCtrl = {};

const passport = require('passport');

const User = require('../models/user');

usersCtrl.renderSignUpForm = (req, res) => {
    res.render('users/signUp');

};

usersCtrl.signup = async (req, res) => {
    const errors = [];

    const {name , email, password, confirm_password}= req.body;
    if(password != confirm_password){
        errors.push({text: 'Passwords do not match'});
    }
    if (password.length < 4 ){
        errors.push({text:'Passwords must be ay least 4 characters'});
    }
    if(errors.length> 0){
        res.render('/users/signUp',{
            errors,
            name,
            email,
            password,
            confirm_password,
        })

    }else{
        const emailUser = await User.findOne({email: email});
        if(emailUser){
            req.flash('error_msg', 'The email is already in use');
            res.redirect('/users/signUp');
        }else {
            const newUser = new User({name, email, password});
            newUser.password = await newUser.encryptPassword(password)
            await newUser.save();
            req.flash('success_msg', 'You are registered');
            res.redirect('/users/signIn');
        }
        
    }
};

usersCtrl.renderSigninForm =(req, res) =>{
    res.render('users/signIn');
};

usersCtrl.signin =  passport.authenticate('local', {
    failureRedirect : '/users/signIn',
    successRedirect : '/products',
    failureFlash: true
});

usersCtrl.logout = (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out now');
    res.redirect('/users/signIn');
}




module.exports = usersCtrl;