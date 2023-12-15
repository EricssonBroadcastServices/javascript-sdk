import { validatePassword } from "@ericssonbroadcastservices/app-sdk";
import { useMemo } from "react";
import { usePasswordPolicy } from "./useSystemConfig";
import { useTranslations } from "./useTranslations";

export function useValidatePassword(pwd1: string, pwd2: string): { valid: boolean; message: string | null } {
  const policy = usePasswordPolicy();
  const [translations] = useTranslations();
  if (!policy) return { valid: false, message: null };
  return useMemo(
    () => validatePassword({ password: pwd1, secondPassword: pwd2, policy, translations }),
    [translations, pwd1, pwd2, policy]
  );
}
