const { Router } = require('express')
const router = Router()

const { 
    renderProductForm,
    createNewProduct,
    renderProducts,
    renderEditForm,
    uptadeProduct,
    deleteProduct } = require('../controllers/product.controller');

    const {isAuthenticated}= require('../helpers/auth')


router.get('/product/add',isAuthenticated, renderProductForm);
router.post('/product/new-product', isAuthenticated, createNewProduct);

router.get('/product',isAuthenticated, renderProducts)

router.get('/product/edit/:id',isAuthenticated, renderEditForm)
router.put('/product/edit/:id', isAuthenticated,  uptadeProduct)

router.delete('/product/delete/:id',isAuthenticated, deleteProduct)


module.exports = router