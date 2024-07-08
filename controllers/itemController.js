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

