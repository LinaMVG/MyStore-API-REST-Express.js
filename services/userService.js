const boom = require('@hapi/boom');

const getConnection = require('../libs/postgres');
const pool = require('../libs/postgresPool');

const {models} = require('./../libs/sequelize')

class UserService {
  constructor() {
    this.pool = pool;
    this.pool.on('error', (err) => console.error(err));
  }

  async create(data) {
    return data;
  }

  async find() {
    const rta = await models.User.findAll();
    return rta;

    //2
    // const query = 'SELECT * FROM tasks';
    // const rta = await this.pool.query(query);
    // return rta.rows;

    //1
    // const client = await getConnection();
    // const rta = await client.query('SELECT * FROM tasks');
    // return rta.rows;
  }

  async findOne(id) {
    return { id };
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }
}

module.exports = UserService;
