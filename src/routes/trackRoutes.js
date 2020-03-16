const express = require('express');
const mongoose = require('mongoose');
const Track = mongoose.model('Track');
const requireAuth = require('../middlewares/requireAuth');
const router = express.Router();

router.use(requireAuth);

router.get('/tracks/:trackId', requireAuth, async (req, res) => {
  const tracks = await Track.find({
    userId: req.user.id,
    _id: req.params.trackId,
  });
  res.json(tracks);
});
router.get('/tracks', requireAuth, async (req, res) => {
  const tracks = await Track.find({userId: req.user.id});
  res.send(tracks);
});
router.post('/tracks', requireAuth, async (req, res) => {
  console.log('Request Header', req.body);

  const {name, locations} = req.body;
  if (!name || !locations) {
    return res.status(422).send({err: 'You must provide a name and location'});
  }
  try {
    console.log(locations);
    const track = new Track({
      name: name,
      locations: locations,
      userId: req.user._id,
    });
    console.log(track);
    await track.save();
    res.send(track);
  } catch (err) {
    res.status(422).send({err: err.message});
  }
});
module.exports = router;
