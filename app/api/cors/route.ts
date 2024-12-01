export async function OPTIONS(request: Request) {
  console.log("???");
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "https://blog.hkound.pe.kr",
      "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, Cookie",
      "Access-Control-Allow-Credentials": "true",
    },
  });
}
