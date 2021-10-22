const mongoose = require('mongoose')
const Schema  = mongoose.Schema

// module.exports = mongoose => {
//     const Country = mongoose.model(
//         "country",
//         mongoose.Schema(
//             {
//                 country_name: Array,
//                 description: String,
//                 image: String,
//                 top_sights: Array
//             },
//             {
//                 timestamps: true
//             }
//         )
//     )
//     return Country
// }

const CountrySchema = new Schema({
    country_name: String,
    description: String,
    image: String,
    top_sights: Array
}, {
    timestamps: true
})

module.exports = mongoose.model('country', CountrySchema)