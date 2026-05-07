# Formularios e interacción

## CreateProduct

Formulario controlado en `src/pages/CreateProduct.tsx`.

### Estado del formulario

```ts
const [form, setForm] = useState<CreateProductInput>(emptyForm);
const [errors, setErrors] = useState<FormErrors>({});
```

Cada campo actualiza el estado con un único handler:

```ts
const handleChange = (e) => {
  const { name, value } = e.target;
  setForm(prev => ({ ...prev, [name]: name === "price" ? Number(value) : value }));
  setErrors(prev => ({ ...prev, [name]: undefined })); // limpia el error al escribir
};
```

### Validación

Se valida antes del submit. Si hay errores, se muestran bajo cada campo y no se envía la petición:

```ts
const validate = (): boolean => {
  const newErrors: FormErrors = {};
  if (!form.name.trim()) newErrors.name = "El nombre es obligatorio";
  if (form.price <= 0) newErrors.price = "El precio debe ser mayor que 0";
  if (!form.description.trim()) newErrors.description = "La descripción es obligatoria";
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
```

### Estados de envío

- `submitting`: deshabilita el botón y muestra "Publicando..."
- `serverError`: muestra el error de la API si falla el POST
- En éxito: redirige a `/products` con `navigate`
