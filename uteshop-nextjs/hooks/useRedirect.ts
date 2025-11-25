"use client";
import { useRouter } from "next/navigation";

export const useRedirect = () => {
  const router = useRouter();

  const redirectByRole = (role: string) => {
    switch (role) {
      case "ADMIN":
        router.push("/admin");
        break;
      case "USER":
        router.push("/user");
        break;
      default:
        router.push("/");
    }
  };

  return { redirectByRole };
};
