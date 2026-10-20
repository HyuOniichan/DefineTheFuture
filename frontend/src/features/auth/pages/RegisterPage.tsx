import { AccountInputCard } from "@/components/shared";
import { useApiRegister } from "../authHooks";

export default function RegisterPage() {
    const registerMutation = useApiRegister();

    return (
        <div>
            <AccountInputCard type="register" mutation={registerMutation} />
        </div>
    )
}
