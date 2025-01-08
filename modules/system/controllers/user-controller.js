import User from '../models/user-model.js';

export const renderIndex = (req, res) => {
  res.render('index-view', { title: 'Home' });
};

// Obtener todos los usuarios
export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.render('user-view', { users });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Obtener un usuario por ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.render('user-detail-view', { user });
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Crear un nuevo usuario
export const createUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const newUser = await User.create({ username, password });
    res.status(201).send(newUser);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Actualizar un usuario existente
export const updateUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findByPk(req.params.id);
    if (user) {
      user.username = username;
      user.password = password;
      await user.save();
      res.send(user);
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Eliminar un usuario
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      await user.destroy();
      res.send({ message: 'User deleted' });
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};