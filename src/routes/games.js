import express from 'express';
import mongodb from 'mongodb';

let router = express.Router();

router.get('/', (req, res) => {
  const db = req.app.get('db');
  db.collection('games').find({}).toArray((err, games) => {
    if (err) { res.status(500).json({ errors: { global: err }}); return; }

    res.json({ games });
  });
});

router.post('/', (req, res) => {
  const db = req.app.get('db');

  db.collection('games').insertOne(req.body.game, (err, r) => {
    if (err) { res.status(500).json({ errors: { global: err }}); return; }

    res.json({ game: r.ops[0] });
  });
});

router.put('/:_id', (req, res) => {
  const db = req.app.get('db');

  db.collection('games').findOneAndUpdate(
    { _id: new mongodb.ObjectId(req.params._id) },
    { $set: req.body.game },
    { returnOriginal: false },
    (err, r) => {
      if (err) { res.status(500).json({ errors: { global: err }}); return; }

      res.json({ game: r.value });
    });
});

router.delete('/:_id', (req, res) => {
  const db = req.app.get('db');

  db.collection('games').deleteOne(
    { _id: new mongodb.ObjectId(req.params._id) },
    (err, r) => {
      if (err) { res.status(500).json({ errors: { global: err }}); return; }

      res.json({});
    });
});

export default router;