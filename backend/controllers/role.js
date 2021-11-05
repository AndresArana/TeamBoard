import role from "../models/role.js";
//validar si existe los datos
const registerRole = async (req, res) => {
  if (!req.body.name || !req.body.description)
    return res.status(400).send("incomplete data");

  const existingRole = await role.findOne({ name: req.body.name });
  if (existingRole) return res.status(400).send("the role already exist");

  const roleSchema = new role({
    name: req.body.name,
    description: req.body.description,
    dbStatus: true,
  });
  //guardar datos -> post
  const result = await roleSchema.save();
  if (!result) return res.status(400).send("failed to register role");
  return res.status(200).send({ result });
};
//listar roles -> get
const listRole = async (req,res)=>{
  const roleSchema = await role.find();
  if(!roleSchema || roleSchema.length == 0) return res.status(400).send("Empty role list");
  return res.status(200).send({roleSchema})
  //return !roleSchema || roleSchema.length ==0 ?
}
export default {registerRole, listRole};

