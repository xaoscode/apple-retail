import { signIn } from "@/auth"
import { DetailedHTMLProps, HtmlHTMLAttributes } from "react"

export function SignIn(): JSX.Element {
    return (
        <form
            action={ async (formData) => {
                "use server"
                await signIn("credentials", formData)
            } }
        >
            <label>
                Email
                <input name="email" type="email" />
            </label>
            <label>
                Password
                <input name="password" type="password" />
            </label>
            <button>Sign In</button>
        </form>
    )
}