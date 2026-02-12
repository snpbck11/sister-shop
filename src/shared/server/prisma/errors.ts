type ErrorWithCode = { code?: unknown };

function hasCode(e: unknown): e is ErrorWithCode {
  return typeof e === "object" && e !== null && "code" in e;
}

export function isPrismaUniqueError(e: unknown): boolean {
  return hasCode(e) && e.code === "P2002";
}
