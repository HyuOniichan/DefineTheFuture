import { AccountInputCard } from "@/components/shared";
import { useApiLogin } from "../authHooks";

export default function LoginPage() {
    const loginMutation = useApiLogin();

    return (
        <div>
            <AccountInputCard type="login" mutation={loginMutation} />
        </div>
    )
}
