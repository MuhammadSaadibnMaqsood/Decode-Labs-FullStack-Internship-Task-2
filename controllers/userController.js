const users = [
  {
    id: 1,
    firstName: 'Ava',
    lastName: 'Patel',
    email: 'ava.patel@example.com',
    role: 'developer'
  },
  {
    id: 2,
    firstName: 'Noah',
    lastName: 'Sharma',
    email: 'noah.sharma@example.com',
    role: 'tester'
  }
];

const validateUserPayload = (payload) => {
  if (!payload || typeof payload !== 'object') {
    return 'Request body must be a JSON object.';
  }

  const { firstName, lastName, email, role } = payload;

  if (!firstName || typeof firstName !== 'string' || firstName.trim().length === 0) {
    return 'firstName is required and must be a non-empty string.';
  }

  if (!lastName || typeof lastName !== 'string' || lastName.trim().length === 0) {
    return 'lastName is required and must be a non-empty string.';
  }

  if (!email || typeof email !== 'string' || !/^\S+@\S+\.\S+$/.test(email)) {
    return 'email is required and must be a valid email address.';
  }

  if (!role || typeof role !== 'string' || role.trim().length === 0) {
    return 'role is required and must be a non-empty string.';
  }

  return null;
};

const getUsers = (req, res) => {
  res.json({
    status: 'success',
    data: users
  });
};

const getUserById = (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({
      status: 'error',
      message: 'User id must be a positive integer.'
    });
  }

  const user = users.find((item) => item.id === id);

  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: `User with id ${id} not found.`
    });
  }

  res.json({
    status: 'success',
    data: user
  });
};

const createUser = (req, res) => {
  const validationError = validateUserPayload(req.body);

  if (validationError) {
    return res.status(400).json({
      status: 'error',
      message: validationError
    });
  }

  const nextId = users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1 : 1;
  const newUser = {
    id: nextId,
    firstName: req.body.firstName.trim(),
    lastName: req.body.lastName.trim(),
    email: req.body.email.trim(),
    role: req.body.role.trim()
  };

  users.push(newUser);

  res.status(201).json({
    status: 'created',
    data: newUser
  });
};

module.exports = {
  users,
  validateUserPayload,
  getUsers,
  getUserById,
  createUser
};
