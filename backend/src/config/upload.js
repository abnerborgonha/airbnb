const multer = require('multer');
const path = require('path');

module.exports = {

    //diskStorage Salva nos arquivos
    storage: multer.diskStorage({

        //informa o destino da pasta 
        destination: path.resolve(__dirname, '..', '..', 'uploads'),

        //nome do arquivo do upload
        filename: (req, file, cb) => {
            const ext = path.extname(file.originalname);
            const name = path.basename(file.originalname, ext);

            cb(null,  `${name}-${Date.now()}${ext}`);
        },
    }),
};