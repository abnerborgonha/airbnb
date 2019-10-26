const mongoose = require('mongoose');

const SpotSchema = new  mongoose.Schema({
    thumbnaill:  String,
    company: String,
    price: Number,
    techs: [String],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    //Configuração que passa a asseitar o campo virtual na requisição JSON
    toJSON: {
        virtuals: true,
    }
});

//Criar um campo não existe no banco de dados mas existe virtualmente no JS

SpotSchema.virtual('thumbnail_url').get(function() {
    return `http://10.0.0.5:3333/files/${this.thumbnaill}`;
});
module.exports = mongoose.model('Spot', SpotSchema);