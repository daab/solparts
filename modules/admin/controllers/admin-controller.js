// filepath: /c:/www/solparts/modules/admin/controllers/admin-controller.js
import Admin from '../models/admin-model.js';

export const getAdmins = async (req, res) => {
  const admins = await Admin.findAll();
  res.render('admin-view', { admins });
};