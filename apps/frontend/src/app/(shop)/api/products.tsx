export async function getProducts() {
  const res = await fetch("http://localhost:3000/api/products/get-products", {
    method: "GET",

  })
  return res.json()
}