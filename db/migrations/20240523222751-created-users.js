'use strict';
const {UserSchema, USER_TABLE} = require('./../models/userModel')

module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(USER_TABLE, UserSchema);
  },

  async down (queryInterface) {
    await queryInterface.drop(USER_TABLE);
  }
};
