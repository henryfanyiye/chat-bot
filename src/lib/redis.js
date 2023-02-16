'use strict'
const {createClient} = require('redis')

const client = createClient()

client.on('error', err => console.log('Redis Client Error', err));

client.connect();

const get = async (key) => {
  return await client.get(key)
}

const set = async (key, value, expire) => {
  return await client.set(key, value, {EX: expire})
}

const del = async (key) => {
  return await client.del(key)
}

module.exports = {get, set, del}