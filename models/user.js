const mongoose = require('mongoose');
const validator = require('validator');


const shema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Проверьте правильность ввода Email',
    },
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: [true, 'Поле является обязательным'],
    minLength: [2, "Должно быть больше 2-х символов, сейчас вы ввели '{VALUE}'"],
    maxLength: [30, "Должно быть меньше 30 символов, сейчас вы ввели '{VALUE}'"]
  },
});

shema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

module.exports = mongoose.model('user', shema);