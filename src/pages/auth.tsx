import { type FormEvent, useState } from "react";
import { ArrowLeft, ArrowRight, Building2, Eye, LockKeyhole, Mail, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { authHighlights } from "@/data/site";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Logo } from "@/components/marketing/logo";
import { useAuth } from "@/contexts/auth-context";

export function AuthPage({ mode }: { mode: "login" | "register" }) {
  const isRegister = mode === "register";
  const navigate = useNavigate();
  const auth = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatusMessage("");
    setErrorMessage("");

    if (isRegister && !acceptedTerms) {
      setErrorMessage("Setujui terms terlebih dahulu untuk membuat akun.");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = isRegister
        ? await auth.register({ name, email, password })
        : await auth.login({ email, password });

      setStatusMessage(`Berhasil masuk sebagai ${result.name}.`);
      window.setTimeout(() => navigate("/product"), 500);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Auth request gagal.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-canvas text-ink">
      <div className="grid min-h-screen lg:grid-cols-[0.9fr_1.1fr]">
        <aside className="hidden border-r border-hairline bg-surface-alt p-8 lg:flex lg:flex-col lg:justify-between">
          <Logo />
          <div>
            <Badge>Auth</Badge>
            <h1 className="mt-4 max-w-lg text-[48px] font-semibold leading-[1.1] tracking-[-2.4px]">
              Account access with quiet infrastructure styling.
            </h1>
            <p className="mt-5 max-w-md text-base leading-[1.5] text-mid-gray">
              The auth pages use the same shadcn form primitives and the same radius hierarchy.
            </p>
          </div>
          <div className="grid gap-3">
            {authHighlights.map(({ label, value, icon: Icon }) => (
              <div key={label} className="flex items-center justify-between rounded-[24px] border border-hairline bg-paper p-5 shadow-subtle">
                <div className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-[18px] bg-canvas text-ink">
                    <Icon className="size-4" />
                  </span>
                  <span className="text-sm text-mid-gray">{label}</span>
                </div>
                <span className="font-semibold">{value}</span>
              </div>
            ))}
          </div>
        </aside>

        <section className="flex items-center justify-center px-4 py-8 sm:px-6 sm:py-10">
          <div className="w-full max-w-md">
            <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
              <Logo />
              <Button asChild variant="secondary">
                <Link to="/">
                  <ArrowLeft />
                  Home
                </Link>
              </Button>
            </div>
            <Card>
              <form onSubmit={handleSubmit}>
                <CardHeader>
                  <Badge className="w-fit">{isRegister ? "Create account" : "Welcome back"}</Badge>
                  <CardTitle className="text-[24px] leading-[1.33] tracking-[-0.6px]">
                    {isRegister ? "Register workspace" : "Login to workspace"}
                  </CardTitle>
                  <CardDescription>
                    {isRegister
                      ? "Create your first workspace with compact shadcn form controls."
                      : "Continue to your monochrome operations dashboard."}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isRegister ? (
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <div className="relative">
                        <Building2 className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-mid-gray" />
                        <Input
                          id="name"
                          value={name}
                          onChange={(event) => setName(event.target.value)}
                          placeholder="Nusa Retail"
                          className="pl-9"
                          minLength={2}
                          required
                        />
                      </div>
                    </div>
                  ) : null}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-mid-gray" />
                      <Input
                        id="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        type="email"
                        placeholder="nama@company.co"
                        className="pl-9"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-mid-gray" />
                      <Input
                        id="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        type="password"
                        placeholder="Minimal 8 karakter"
                        className="px-9"
                        minLength={8}
                        required
                      />
                      <Eye className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-mid-gray" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-4 text-sm">
                    <Label className="flex items-center gap-2 text-mid-gray">
                      <Checkbox
                        checked={isRegister ? acceptedTerms : undefined}
                        onCheckedChange={(checked) => setAcceptedTerms(checked === true)}
                      />
                      {isRegister ? "I agree to terms" : "Remember me"}
                    </Label>
                    {!isRegister ? (
                      <Link to="/login" className="text-ink hover:underline">
                        Forgot password?
                      </Link>
                    ) : null}
                  </div>
                  {errorMessage ? (
                    <p className="rounded-[18px] bg-canvas px-3 py-2 text-sm text-ember">{errorMessage}</p>
                  ) : null}
                  {statusMessage ? (
                    <p className="rounded-[18px] bg-canvas px-3 py-2 text-sm text-ink">{statusMessage}</p>
                  ) : null}
                  <Button className="w-full" disabled={isSubmitting} type="submit">
                    {isSubmitting ? "Processing..." : isRegister ? "Create workspace" : "Login"}
                    <ArrowRight />
                  </Button>
                  <div className="relative py-1">
                    <Separator />
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-paper px-3 text-xs text-mid-gray">
                      or
                    </span>
                  </div>
                  <Button variant="outline" className="w-full" type="button">
                    Continue with Google
                  </Button>
                </CardContent>
                <CardFooter className="justify-center text-sm text-mid-gray">
                  {isRegister ? "Already have an account?" : "No account yet?"}
                  <Link to={isRegister ? "/login" : "/register"} className="ml-1 font-medium text-ink hover:underline">
                    {isRegister ? "Login" : "Register"}
                  </Link>
                </CardFooter>
              </form>
            </Card>
            <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-[18px] px-3 py-2 text-sm text-ember">
              <Trash2 className="size-4" />
              Delete demo workspace
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
