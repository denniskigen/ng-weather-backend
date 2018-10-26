var Mood = require('../models/Mood');

exports.list = (req, h) => {
  return Mood.find({}).exec().then((mood) => {
    return { moods: mood };
  }).catch((err) => {
    return { err: err }
  });
}

exports.get = (req, h) => {
  return Mood.findById(req.params.id).exec().then((mood) => {
    if (!mood) return { message: 'Mood not found' };
    return { mood: mood };
  }).catch((err) => {
    return { err: err }
  });
}

exports.create = (req, h) => {
  const activityData = {
    name: req.payload.name
  };

  return Mood.create(activityData).then((mood) => {
    return {
      message: 'Mood created successfully',
      mood: mood
    };
  }).catch((err) => {
    return { err: err }
  });
}

exports.delete = (req, h) => {
  return Mood.findById(req.params.id).exec(function (err, mood) {

    if (err) return { dberror: err };
    if (!mood) return { message: 'Mood not found' };

    mood.remove(function (err) {
      if (err) return { dberror: err };

      return { success: true };
    });
  });
}