const express = require('express');

const routes = express.Router();

const passport = require('passport');

const fileupload = require('../config/fileupload');

//controller

const RegisterController = require('../controller/RegisterController');

const controller = require('../controller/MainController'); 

const ForgotPassController = require('../controller/ForgotPassController');

const ProfileController = require('../controller/ProfileController');

const CategoryController = require('../controller/CategoryController');

const SubCategoryController = require('../controller/SubCategoryController');

const ExtraSubCategoryController = require('../controller/ExSubCategoryController');

const ProductController = require('../controller/ProductController');

//routes

routes.get('/',controller.login);

routes.get('/register',RegisterController.register);

routes.post('/registerData',RegisterController.registerData);

routes.get('/login',controller.login);

routes.get('/logout',controller.logout);

routes.post('/loginData',passport.authenticate('local',{failureRedirect : '/'}),controller.loginData);

routes.get('/dashboard',passport.checkAuthentication,controller.dashboard);

routes.get('/addblog', passport.checkAuthentication, controller.addblog);

routes.post('/insertdata', fileupload, controller.insertdata);

routes.get('/viewblog', passport.checkAuthentication, controller.viewblog);

routes.get('/DeleteBlog', controller.deletedata);

routes.get('/EditBlog', controller.editdata);

routes.get('/ForgotPassword', ForgotPassController.ForgotPassword);

routes.post('/forgotemail', ForgotPassController.forgotemail);

routes.get('/OTP', ForgotPassController.OTP);

routes.post('/sendOTP', ForgotPassController.sendOTP);

routes.get('/newPassword', passport.checkAuthentication,ForgotPassController.newPassword);

routes.post('/newPassPort', ForgotPassController.newPassPort);

routes.get('/profile',passport.checkAuthentication, ProfileController.profile);

routes.post('/changeprofile', ProfileController.changeprofile);

// Category routes

routes.get('/category',passport.checkAuthentication, CategoryController.category);

routes.post('/addCategory', CategoryController.addCategory);

routes.get('/deleteCategory', CategoryController.deleteCategory);

routes.get('/editCategory', CategoryController.editCategory);

// Sub-Category routes

routes.get('/SubCategory', passport.checkAuthentication, SubCategoryController.SubCategory);
routes.post('/addSubCategory', SubCategoryController.addSubCategory);
 
// Extra Sub-Category routes

routes.get('/extraSubCategory', passport.checkAuthentication, ExtraSubCategoryController.extraSubCategory);
routes.post('/addSubSubCategory', ExtraSubCategoryController.addSubSubCategory);

// Product

routes.get('/product', passport.checkAuthentication, ProductController.product);
routes.post('/addproduct', fileupload, ProductController.addproduct);
routes.get('/productview', passport.checkAuthentication, ProductController.productview);

module.exports = routes;