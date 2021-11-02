import role from "../models/role.js";

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
  const result = await roleSchema.save();
  if (!result) return res.status(400).send("failed to register role");
  return res.status(200).send({ result });
};
export default {registerRole};
