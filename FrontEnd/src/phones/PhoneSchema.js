import { number, object, setLocale, string, date } from "yup";
import { ptForm } from "yup-locale-pt";
import { parse, isDate } from "date-fns";

setLocale(ptForm);

function parseDateString(value, originalValue) {
  const parsedDate = isDate(originalValue)
    ? originalValue
    : parse(originalValue, "yyyy-MM-dd", new Date());

  return parsedDate;
}

export let phoneSchema = object().shape({
    brand: string().required("Campo obrigatório").default("").max(100),
    model: string().required("Campo obrigatório").default("").max(100),
    memory: number().required("Campo obrigatório").typeError("Informe um valor maior ou igual a 1 (GB)").default(0).min(1),
    date: date().required("Campo obrigatório").default(() => new Date()).typeError("Insira uma data válida")
	.transform(parseDateString)
        .max(new Date(), "Insira uma data válida")
});