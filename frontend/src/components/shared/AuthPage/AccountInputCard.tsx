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

type AccountInputCardType = "login" | "register";

interface AccountInputCardProps {
    type: AccountInputCardType;
}

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

export function AccountInputCard({ type }: AccountInputCardProps) {
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
                <form>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
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
                            <Input
                                id="password"
                                type="password"
                                placeholder="secret"
                                required
                            />
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex-col">
                <Button type="submit" className="w-full">
                    {navLinks[type].curName}
                </Button>
            </CardFooter>
        </Card>
    )
}
