export async function submitOrder(orderData) {
  const response = await fetch("http://localhost:3002/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`❌ Gửi đơn hàng thất bại: ${message}`);
  }

  return await response.json(); // Trả về dữ liệu từ server
}
