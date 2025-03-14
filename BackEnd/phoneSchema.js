const { object, string, number, date } = require('yup');

const phoneSchema = object().shape({
    brand: string().required().max(100),
    model: string().required().max(100),
    memory: number().required().min(1),
    date: date().required().default(() => new Date())
        .max(new Date(), "Insira uma data válida")
});

module.exports = { phoneSchema };