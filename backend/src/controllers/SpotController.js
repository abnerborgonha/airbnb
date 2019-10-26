const User = require('../models/User');
const Spot = require('../models/Spot');

module.exports  = {
    async index(req, res) {
        const { tech  } = req.query;

        // Passando uma String em um filtro que é um arrey  e retornar os spots daquela tecnologia(filtro)  
        const spots = await Spot.find({ techs: tech});

        return res.json(spots);
    },

    async store(req, res) {
        
        const { filename } = req.file;
        const { company, techs, price } = req.body;
        const { user_id } = req.headers;

        //valida se o usuario relamente existe
        const user = await User.findById(user_id);

        if (!user) {
            return res.status(400).json({error: 'User does not exists'});
        }

        // grava o spot no banco de dados
        const spot = await Spot.create({
            user: user_id,
            thumbnaill: filename,
            company,
            techs: techs.split(',').map(tech => tech.trim()),
            price
        });

        return res.json({  spot });
    }
};
