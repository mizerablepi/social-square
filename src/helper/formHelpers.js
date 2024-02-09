export async function getFormData(req) {
  let data = {};
  (await req.formData()).forEach((value, key) => {
    data[key] = value;
  });
  return data;
}
