'use strict'
module.exports = async (req, res, next) => {
  const method = req.method
  const url = req.originalUrl
  console.log(JSON.stringify({type: 'Request', method, url, body: req.body}))

  const defaultWrite = res.write;
  const defaultEnd = res.end;

  res.write = (...restArgs) => {
    defaultWrite.apply(res, restArgs);
  };

  res.end = (...restArgs) => {
    if (restArgs[0]) {
      const body = Buffer.from(restArgs[0]).toString('utf8');
      console.log(JSON.stringify({type: 'Response', method, url, body}))
    }
    defaultEnd.apply(res, restArgs);
  }

  next()
}