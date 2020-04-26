var cookies = {};

cookies.setCookie = function(req, res, next) {
  if (req.cookies.cookie !== undefined) {
    var i = parseInt(req.cookies.cookie);
    i++;
    console.log('cookie:', i);
    res.cookie('cookie', i);
  } else {
    res.cookie('cookie', 1);
    console.log('cookie:', 1);
  }
  next();
}

module.exports = cookies