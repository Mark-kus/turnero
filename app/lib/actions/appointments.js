"use server";

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: "Please select a customer.",
  }),
  amount: z.coerce.number().gt(0, {
    message: "Please enter an amount greater than $0.",
  }),
  status: z.enum(["pending", "paid"], {
    invalid_type_error: "Please select an invoice status.",
  }),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });

export async function createAppointment(prevState, formData) {
  //   const objectFormData = Object.fromEntries(formData.entries()) // En caso de que fuera un objeto muy grande
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.",
    };
  }

  // Prepare data for insertion into the database
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split("T")[0];

  try {
    await sql`
  INSERT INTO invoices (customer_id, amount, status, date)
  VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
  `;
  } catch (error) {
    return { message: "Database Error: Failed to Create Invoice." };
  }

  revalidatePath("/dashboard/invoices"); // Vuelve a buscar los datos para esta ruta en lugar de usar los cacheados
  redirect("/dashboard/invoices");
}

const updateInvoice = formschema.omit({ id: true, date: true });

export async function updateinvoice(id, formdata) {
  const { customerid, amount, status } = updateInvoice.parse({
    customerid: formdata.get("customerid"),
    amount: formdata.get("amount"),
    status: formdata.get("status"),
  });

  const amountincents = amount * 100;

  try {
    await sql`
    update invoices
    set customer_id = ${customerid}, amount = ${amountincents}, status = ${status}
    where id = ${id}
  `;
  } catch (error) {
    return { message: "database error: failed to update invoice." };
  }

  revalidatepath("/dashboard/invoices");
  redirect("/dashboard/invoices"); // redirect hace un throw, por lo que no puede ejecutarse dentro de un try
}

export async function deleteinvoice(id) {
  try {
    await sql`delete from invoices where id = ${id}`;
    revalidatepath("/dashboard/invoices");
    return { message: "deleted invoice." };
  } catch (error) {
    return { message: "database error: failed to delete invoice." };
  }
}

// const updateInvoiceWithId = updateInvoice.bind(null, invoice.id); // De esta forma le pasamos parametros adicionales (al no usar useFormStatus, el primer parametro no es state, en este caso es id, y el segundo es FormData)
