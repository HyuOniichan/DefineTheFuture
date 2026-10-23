import { useState, type SyntheticEvent } from "react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Logo } from "../Sidebar/Logo"
import { Link } from "@tanstack/react-router"
import type { AuthLoginMutationType, AuthRegisterMutationType } from "@/features/auth"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Eye, EyeOff } from "lucide-react"


type AccountInputCardProps =
    | {
        type: "login",
        mutation: AuthLoginMutationType,
    }
    | {
        type: "register",
        mutation: AuthRegisterMutationType,
    };


const navLinks = {
    login: {
        curName: 'Login',
        curLink: '/login',
        toName: 'Register',
        toLink: '/register',
    },
    register: {
        curName: 'Register',
        curLink: '/register',
        toName: 'Login',
        toLink: '/login',
    },
}


export function AccountInputCard({ type, mutation }: AccountInputCardProps) {
    const [showPass, setShowPass] = useState<boolean>(false);

    const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        if (type === "login") {
            const username = formData.get("username");
            const password = formData.get("password");

            if (!username || !password) return;

            const body = {
                username: username.toString().trim(),
                password: password.toString().trim(),
            }

            mutation.mutate({ body });
        }

        if (type === "register") {
            const username = formData.get("username");
            const password = formData.get("password");
            const displayName = formData.get("displayName");

            if (!username || !password || !displayName) return;

            const body = {
                username: username.toString().trim(),
                password: password.toString().trim(),
                display_name: displayName.toString().trim(),
            }

            mutation.mutate({ body });
        }
    }

    return (
        <Card className="w-full max-w-sm min-w-120">
            <div className="ml-6">
                <Logo />
            </div>
            <CardHeader>
                <CardTitle className="font-bold text-[24px]">
                    {type == "login" && "Login to your account"}
                    {type == "register" && "Register new account"}
                </CardTitle>
                <CardAction>
                    <Link to={navLinks[type].toLink}>
                        <Button variant="link">{navLinks[type].toName}</Button>
                    </Link>
                </CardAction>
            </CardHeader>
            <CardContent>
                <form id="authForm" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-6">
                        {type == "register" && (
                            <div className="grid gap-2">
                                <Label htmlFor="displayName">Display Name</Label>
                                <Input
                                    id="displayName"
                                    name="displayName"
                                    type="text"
                                    placeholder="Sat Thu 567"
                                    required
                                />
                            </div>
                        )}
                        <div className="grid gap-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                name="username"
                                type="text"
                                placeholder="traidatchiriengminhta"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                                {type == 'login' && (
                                    <Link
                                        to={navLinks["register"].curLink}
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </Link>
                                )}
                            </div>
                            <InputGroup>
                                <InputGroupInput
                                    id="password"
                                    name="password"
                                    type={showPass ? "text" : "password"}
                                    placeholder="secret"
                                    required
                                />
                                <InputGroupAddon
                                    align="inline-end"
                                    className="hover:cursor-pointer"
                                    onClick={() => setShowPass(!showPass)}
                                >
                                    {showPass ? <Eye /> : <EyeOff />}
                                </InputGroupAddon>
                            </InputGroup>
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex-col">
                <Button
                    type="submit"
                    className="w-full"
                    form="authForm"
                    disabled={mutation.isPending}
                >
                    {mutation.isPending ? "Waiting for love..." : navLinks[type].curName}
                </Button>
            </CardFooter>
        </Card>
    )
}
