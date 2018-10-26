var Activity = require('../models/Activity');

exports.list = (req, h) => {
  return Activity.find({}).exec().then((activity) => {
    return { activities: activity };
  }).catch((err) => {
    return { err: err }
  });
}

exports.get = (req, h) => {
  return Activity.findById(req.params.id).exec().then((activity) => {
    if (!activity) return { message: 'Activity not found' };
    return { activity: activity };
  }).catch((err) => {
    return { err: err }
  });
}

exports.create = (req, h) => {
  const activityData = {
    name: req.payload.name
  };

  return Activity.create(activityData).then((activity) => {
    return {
      message: 'Activity created successfully',
      activity: activity
    };
  }).catch((err) => {
    return { err: err }
  });
}

exports.delete = (req, h) => {
  return Activity.remove({ _id: req.params.id }).exec(function (err, activity) {
    if (err) return { dberror: err };

    return { 
      message: 'Activity deleted successfully',
      success: true 
    };
  });
}