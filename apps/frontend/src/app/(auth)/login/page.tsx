import { Metadata } from "next";
import { AuthCard } from "../ components/authCard/AuthCard";

export const metadata: Metadata = {
    title: 'login'
}

export default function Login() {
    return (
        <div >
            <AuthCard></AuthCard>
        </div>
    );
}
