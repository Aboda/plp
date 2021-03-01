const path = require('path');

exports.srv = (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'basehtml\inicio.html'))
};