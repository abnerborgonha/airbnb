const Booking = require('../models/Booking');

// Cria uma nova reserva
module.exports = {
    async store(req, res) {
        //reservar num spot especifico (selecionado pelo usuario)
        const { user_id } =  req.headers;
        const { spot_id } = req.params;
        const { date } = req.body;

        const booking = await Booking.create({
            user: user_id,
            spot: spot_id,
            date,
        });

        await booking.populate('spot').populate('user').execPopulate();

        const ownerSocket = req.connectUsers[booking.spot.user];

        if (ownerSocket) {
            req.io.to(ownerSocket).emit('booking_request', booking);
        }

        return res.json(booking);
    }
};