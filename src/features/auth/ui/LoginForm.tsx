"use client";

import { login } from "@/entities/auth";
import { adminLoginSchema, TAdminLoginInput } from "@/entities/auth/model/schema";
import { Button, ErrorMessage, Input } from "@/shared/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export function LoginForm() {
  const router = useRouter();
  const sp = useSearchParams();
  const next = sp.get("next") || "/admin";
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TAdminLoginInput>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: TAdminLoginInput) => {
    setServerError(null);
    const r = await login(data);

    if (r.success) {
      router.replace(next);
    } else {
      setServerError("Неверный логин или пароль");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-screen h-screen flex items-center justify-center">
      <fieldset
        disabled={isSubmitting}
        className="space-y-5 max-w-md w-full bg-admin-background rounded-2xl p-5">
        <Input placeholder="email" {...register("email")} error={errors.email?.message} />
        <Input
          type="password"
          placeholder="password"
          {...register("password")}
          error={errors.password?.message}
        />
        {serverError && <ErrorMessage error={serverError} />}
        <Button type="submit" isLoading={isSubmitting} className="w-full">
          Войти
        </Button>
      </fieldset>
    </form>
  );
}
