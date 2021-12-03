const { PrismaClient } = require('@prisma/client');

const Orm = (function() {
  let client;

  function createOrmClient() {
    client = new PrismaClient();
    return client;
  }

  return {
    getClient: () => {
      if(!client) {
        client = createOrmClient();
      }

      return client;
    }
  }

})();

module.exports = Orm;