/**
 * Reads numeric user id from JWT payload (no signature verification).
 * Matches Spring claims: user_id, userId, id (numeric sub only).
 */
export function getUserIdFromToken(token) {
  if (!token || typeof token !== "string") return null;
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    let base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    while (base64.length % 4) base64 += "=";
    const json = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    const payload = JSON.parse(json);
    const candidates = [
      payload.user_id,
      payload.userId,
      payload.id,
      payload.sub,
    ];
    for (const id of candidates) {
      if (id == null || id === "") continue;
      const s = String(id).trim();
      if (/^\d+$/.test(s)) return s;
    }
    return null;
  } catch {
    return null;
  }
}
