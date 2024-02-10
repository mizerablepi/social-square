export async function getFormData<T>(req: Request): Promise<T> {
  let data: Record<string, FormDataEntryValue> = {};
  const formdata = await req.formData();
  formdata.forEach((value, key) => {
    data[key] = value;
  });
  return data as T;
}
