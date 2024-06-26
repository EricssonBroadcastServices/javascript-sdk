import { isPasswordValid, validatePassword } from "@ericssonbroadcastservices/app-sdk";
import { useMemo } from "react";
import { usePasswordPolicy } from "./useSystemConfig";
import { useTranslations } from "./useTranslations";

/** determine if two passwords matches each other and adheres to the password policy */
export function useValidatePasswords(pwd1: string, pwd2: string): { valid: boolean; message: string | null } {
  const policy = usePasswordPolicy();
  const [translations] = useTranslations();

  return useMemo(() => {
    if (!policy) return { valid: false, message: null };
    return validatePassword({ password: pwd1, secondPassword: pwd2, policy, translations });
  }, [translations, pwd1, pwd2, policy]);
}

export function useIsPasswordValid(psw: string) {
  const policy = usePasswordPolicy();
  return useMemo(() => {
    if (!policy) return false;
    const evaluation = isPasswordValid(psw, policy);
    return evaluation.groupsOk && evaluation.lengthOk;
  }, [psw, policy]);
}
