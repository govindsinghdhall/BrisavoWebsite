import { Suspense } from "react";
import AuthenticationForm from "./AuthenticationForm";

export default function AuthenticationPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center text-sm text-muted">
          Loading...
        </main>
      }
    >
      <AuthenticationForm />
    </Suspense>
  );
}
