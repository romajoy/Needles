// NeedleMindr

const mongoose = require('mongoose')

// Match Schema
const needleSchema = new mongoose.Schema({
    // type: {type: String, required: true}, // needle or hook, if hook show size, brand, material?
    size: {type: String, required: true}, // ex. US 6
    brand: {type: String}, // ex. Chicagoo
    style: {type: String}, // ex. Circular
    long: {type: String}, // ex. 16"
    material: {type: String}, // ex. metal, dropdown menu
    point: {type: String}, // ex. lace point, dropdown menu
    setComplete: {type: Boolean}, // yes or no // only show if DPN or Straight
    inUse: {type: Boolean}, // yes or no
    project: {type: String}, // ex. Polyrhythm // only show if inUse is Y
    replace: {type: Boolean}, // want to replace soon
    favorite: {type: Boolean}, // true or false
    misc: {type: String} // ex. not great for socks, best for wool
})

const Needle = mongoose.model('Needle', needleSchema)
module.exports = Needle
