exports.servidor = (req, res) => {
    let message;
    for (var prop in req) {
        message = message + " " + prop + ": " + req[prop] + "\n";
    }
    message = message + "end of content";
    res.status(200).send(message);
  };