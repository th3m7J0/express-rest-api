const ninjaModel = require('../models/ninja');

module.exports = {
  create:function (req,res,next) {
      ninjaModel.create(req.body).then(function (ninja) {
          res.send(ninja);
      }).catch(next);
  },

  readNearestNinja:function (req,res,next) {
      // ninjaModel.find({}).then(function (ninjas) {
      //     res.send(ninjas);
      // }).catch(next);
      ninjaModel.aggregate([{
          $geoNear: {
              near:{'type': 'Point', 'coordinates': [parseFloat(req.query.lng), parseFloat(req.query.lat)],},
              maxDistance: 100000,
              spherical: true,
              distanceField: "dist.calculated"
          },
      }]).then(function (ninjas) {
          res.send(ninjas);
      }).catch(next);
  },

  update:function (req,res,next) {
      ninjaModel.findByIdAndUpdate({_id:req.params.id},req.body).then(function (oldNinja) {

          ninjaModel.findOne({_id:req.params.id}).then(function (newNinja) {
              res.send({old:oldNinja,new:newNinja});
          });

      }).catch(next);
  },
  delete: function (req,res,next) {
      ninjaModel.findByIdAndRemove({_id:req.params.id}).then(function (ninja) {
          res.send(ninja);
      }).catch(next);
  }
};