const { now } = require('sequelize/dist/lib/utils');
const db = require('../models');
const users = db.users;

exports.login = async (username, password) => {
    const sql = `SELECT * FROM users 
                    WHERE login = '${username}' 
                    AND password = '${password}' AND status = 1`;
    return await db.sequelize.query(sql, {
        type: db.sequelize.QueryTypes.SELECT,
    })
}