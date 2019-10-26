const User = require('../models/User');
// index, show, store, update, destroy

module.exports = {
    async store(req, res) {
        // modelo do javascritp de destruturação, buscar uma valor de uma variavel atraves dela mesma
       const { email }= req.body;

       let user = await User.findOne({ email });

       if (!user) {
             const user = await User.create({ email });
       }

       return res.json(user);
    }
};