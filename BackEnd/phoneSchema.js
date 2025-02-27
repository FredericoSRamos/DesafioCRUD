const { object, string, number, date } = require('yup');

const getFormatedDate = (currentDate) => {
    return currentDate.split('/').reverse().join('-');
  }

const phoneSchema = object().shape({
    brand: string().required().max(100),
    model: string().required().max(100),
    memory: number().required().min(1),
    date: date().required().default(() => new Date())
        .min(getFormatedDate('01/01/1950'))
        .max(getFormatedDate(new Date().toLocaleDateString()))
});

module.exports = { phoneSchema };