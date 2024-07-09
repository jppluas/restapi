const express = require('express');
 const router = express.Router();
 const itemController = require('../controllers/itemController');

 router.post('/items', itemController.createItem);
 router.get('/items', itemController.getAllItems);
 router.put('/items/:id', itemController.updateItem);
 module.exports = router;