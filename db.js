const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

db.defaults({session: [], books: [], users: [], transaction: []}).write();

module.exports = db;