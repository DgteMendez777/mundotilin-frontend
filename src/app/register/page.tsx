import RegisterForm from "@/components/forms/RegisterForm";

export default function RegisterPage() {
    return(
        <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,#1b1230_0%,#05070a_45%)] px-4 py-10">
            <RegisterForm />
        </main>
    );
}