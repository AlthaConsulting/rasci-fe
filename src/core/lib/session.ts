import { cookies } from "next/headers";

export async function set(key: string) {
  const cookieStore = await cookies();
  return {
    if(value: string | undefined) {
      try {
        if (value) cookieStore.set(key, value);
      } catch {}
    },
    delete() {
      try {
        cookieStore.delete(key);
      } catch {}
    },
    to(value: string) {
      try {
        cookieStore.set(key, value);
      } catch {}
    },
  };
}
