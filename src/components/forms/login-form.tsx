"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { loginAction } from "@/actions/login/mutations";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import authStore from "@/services/store/auth";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  email: z
    .string()
    .email({ message: "Por favor, insira um endereço de email válido." }),
  password: z.string().min(6, {
    message: "A senha deve ter pelo menos 6 caracteres.",
  }),
});

function LoginForm() {
  const { setUser } = authStore();
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
    defaultValues: {},
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const session = await loginAction({
        email: data.email,
        password: data.password,
      });

      window.localStorage.setItem("@myHourly:session", JSON.stringify(session));
      setUser({
        email: session.user.email,
        id: session.user.id,
        name: session.user.name,
        role: session.user.role,
        daily_work_hours: session.user.daily_work_hours,
        daily_work_minutes: session.user.daily_work_minutes,
      });
      router.push("/dashboard");
      toast({
        description: "Logado com sucesso!",
        variant: "default",
      });
    } catch (error) {
      toast({
        description: "Email ou senha inválidos",
        title: "Erro",
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-[95%] flex-col justify-between gap-2 sm:w-3/12"
      >
        <h3 className="mb-5 text-2xl font-bold">Login</h3>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="XGw9m@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input placeholder="********" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          disabled={form.formState.isSubmitting}
          type="submit"
          className="mt-auto w-full"
        >
          {form.formState.isSubmitting ? "Criando..." : "Criar"}
        </Button>
      </form>
    </Form>
  );
}

export default LoginForm;
