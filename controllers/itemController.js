const admin = require('firebase-admin');
const db = admin.firestore();

exports.createItem = async (req, res) => {
  try {
    const data = req.body;
    const itemRef = await db.collection('items').add(data);
    res.status(201).send(`Created a new item: ${itemRef.id}`);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.getAllItems = async (req, res) => {
  try {
    const itemsSnapshot = await db.collection('items').get();
    const items = [];
    itemsSnapshot.forEach((doc) => items.push({ id: doc.id, ...doc.data() }));
    res.status(200).json(items);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.updateItem = async (req, res) => { 
  try {
    const itemId = req.params.id;
    const data = req.body;
    const itemRef = db.collection('items').doc(itemId);
    await itemRef.update(data);
    res.status(200).send('Item updated');
  } catch (error) {
    res.status(400).send(error.message);
  }
};


exports.getItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const item = await db.collection('items').doc(itemId).get();
    if (!item.exists) {
      res.status(404).send('Item not found');
    } else {
      res.status(200).json({ id: item.id, ...item.data() });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.deleteItem = async (req, res) => { 
  try {
    const itemId = req.params.id;
    if (!itemId) throw new Error('ID is required');

    await db.collection('items').doc(itemId).delete();
    res.status(200).send(`Item ${itemId} has been deleted`);
  } catch (error) {
    res.status(400).send(error.message);
  }
}
