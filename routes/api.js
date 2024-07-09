const express = require('express');
 const router = express.Router();
 const itemController = require('../controllers/itemController');

 router.post('/items', itemController.createItem);
 router.get('/items', itemController.getAllItems);
 router.get('/items/:id', itemController.getItem);
 router.delete('/items/:id', itemController.deleteItem);
 router.put('/items/:id', itemController.updateItem);
 module.exports = router;