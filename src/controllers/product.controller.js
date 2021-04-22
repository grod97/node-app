const productsCtrl = {};
const Product = require('../models/product');

productsCtrl.renderProductForm = (req, res) => {
   res.render('products/new-product');
};
productsCtrl.createNewProduct = async  (req, res) => {
    const { title, category, ubication, price, description } = req.body;
    const newProduct = new Product({ title, category, ubication, price, description });
    newProduct.user = req.user.id;
    await newProduct.save();
    req.flash('success_msg', 'Note Created Succesfully');
    res.redirect('/products')
};
productsCtrl.renderProducts =async (req, res) => {
    const products = await Product.find({user: req.user.id}).sort({createAt : 'desc'});
    res.render('products/all-products', {products});
};
productsCtrl.renderEditForm = async(req, res) => {
    const product = await Product.findById(req.params.id);
    if (product.user != req.user.id){
        req.flash('error_msg', 'Not Authorized');
        return res.redirect('/products');
    } 
    res.render('products/edit-product', {product});
};
productsCtrl.uptadeProduct =async (req, res) => {
    const {title, category, ubication ,  price, description}=req.body;
    await Product.findByIdAndUpdate(req.params.id, {title,category, ubication, price, description});
    req.flash('success_msg', 'Note Uptade Succesfully');
    res.redirect('/products');
};
productsCtrl.deleteProduct = async(req, res) => {
    await Product.findByIdAndDelete(req.params.id)
    req.flash('success_msg', 'Note deleted Succesfully');
    res.redirect('/products')
};

module.exports = productsCtrl;