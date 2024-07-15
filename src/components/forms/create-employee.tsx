"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { createEmployee } from "@/actions/employee/mutations";
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
import { onBlurFormat } from "@/shared/format";
import { workSchema } from "@/shared/schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "O nome de usuário deve ter pelo menos 2 caracteres.",
  }),
  email: z
    .string()
    .email({ message: "Por favor, insira um endereço de email válido." }),
  password: z.string().min(6, {
    message: "A senha deve ter pelo menos 6 caracteres.",
  }),
  role: z.enum(["ADMIN", "USER"]),
  daily_work_hours: workSchema("hours"),
  daily_work_minutes: workSchema("minutes"),
});

function CreateEmployee() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
    defaultValues: {},
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      await createEmployee({
        email: data.email,
        name: data.username,
        password: data.password,
        role: "ADMIN",
        phone: "1234567890",
        daily_work_hours: Number(data.daily_work_hours),
        daily_work_minutes: Number(data.daily_work_minutes),
      });

      toast({
        description: "Funcionário criado com sucesso!",
        variant: "default",
      });
    } catch (error) {
      toast({
        description: "Ocorreu um erro ao criar o funcionaário.",
        title: "Erro",
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-[95%] flex-col justify-between gap-2"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Permissão</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a permissão" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="ADMIN">Administrador</SelectItem>
                  <SelectItem value="USER">Funcionário</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="daily_work_hours"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Horas diárias</FormLabel>
                <FormControl>
                  <Input
                    placeholder="144 Horas"
                    {...field}
                    onBlur={(e) => onBlurFormat(e, "Horas")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="daily_work_minutes"
            render={({ field }) => {
              const { value, ...rest } = field;

              return (
                <FormItem>
                  <FormLabel>Minutos diários</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="60 Min"
                      {...rest}
                      onBlur={(e) => onBlurFormat(e, "Min")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>

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

export default CreateEmployee;
