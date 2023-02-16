'use strict'

exports.success = (data) => {
  return {
    code: 200,
    message: 'SUCCESS',
    data
  }
}

exports.error = (code, message) => {
  return {code, message}
}