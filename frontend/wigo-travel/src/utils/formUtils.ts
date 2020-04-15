export class FormFieldHelper {
  constructor(private fieldPrefix: string) {}

  fieldName = (name: string) => `${this.fieldPrefix}.${name}`
  hasError = (errors: any, fieldName: string) =>
    errors && errors[this.fieldPrefix] && errors[this.fieldPrefix][fieldName]
}
