import { number, object, setLocale, string, date } from "yup";
import { ptForm } from "yup-locale-pt";

setLocale(ptForm);

const getFormatedDate = (currentDate) => {
    return currentDate.split('/').reverse().join('-');
  }

export let phoneSchema = object().shape({
    brand: string().required("Campo obrigatório").default("").max(100),
    model: string().required("Campo obrigatório").default("").max(100),
    memory: number().required("Campo obrigatório").typeError("Informe um valor maior ou igual a 1 (GB)").default(0).min(1),
    date: date().required("Campo obrigatório").default(() => new Date()).typeError("Insira uma data válida")
        .min(getFormatedDate('01/01/1950'), "Insira uma data válida")
        .max(getFormatedDate(new Date().toLocaleDateString()), "Insira uma data válida")
});