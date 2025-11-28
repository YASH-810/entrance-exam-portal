export async function logout() {
  await fetch("/api/auth/logout", { method: "GET" });
  window.location.href = "/auth/login"; // redirect after clearing cookie
}
