const db = require("../../data/db-config")

const getAll = () => {
  // KODLAR BURAYA
  return db("accounts");
}

const getById = id => {
  // KODLAR BURAYA
  return db("accounts").where("id",id).first();
}

const create = async account => {
  // KODLAR BURAYA
const [id]= await db("accounts").insert(account)  
return getById(id);
}

const updateById = async (id, account) => {
  // KODLAR BURAYA
  await db("accounts").where("id", id).update(account)
  return getById(id);
}

const deleteById = id => {
  // KODLAR BURAYA
 
  return db("accounts").where("id", id).delete()
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
