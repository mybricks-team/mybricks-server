
const db = require('../database')

class FileDao {

  createFile = async ({
    name,
    creatorId,
    creatorName,
    extName,
    description,
    uri,
    version,
  }) => {
    const info = db.prepare(`
      insert into file(
        name,
      )
    `).run();
  }
}

module.exports = new FileDao();