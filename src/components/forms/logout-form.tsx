import { logoutAction } from "@/actions/login/mutations";
import authStore from "@/services/store/auth";
import { Button } from "react-day-picker";

const LogoutForm = () => {
  const { logout } = authStore();
  return (
    <form
      action={async () => {
        await logoutAction();
        logout();
      }}
    >
      <Button type="submit">Sair?</Button>
    </form>
  );
};

export default LogoutForm;
