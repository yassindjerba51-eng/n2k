"use client";

import { useActionState } from "react";
import { authenticate } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FlaskRound, AlertCircle, ArrowRight } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function LoginPage() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5] font-[var(--font-body)] p-4">
      <Card className="w-full max-w-md shadow-lg border-slate-200/60">
        <CardHeader className="space-y-4 text-center pb-6">
          <div className="flex justify-center">
            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-[#0A2540] shadow-sm">
              <FlaskRound className="w-8 h-8 text-emerald-400" />
            </div>
          </div>
          <div className="space-y-1.5">
            <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">
              Administration N2K
            </CardTitle>
            <CardDescription className="text-slate-500 text-sm">
              Connectez-vous avec vos identifiants sécurisés
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-5">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="admin@n2k.tn"
                  required
                  className="h-11 bg-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Mot de passe
                </Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  required
                  minLength={6}
                  className="h-11 bg-white"
                />
              </div>
            </div>

            {errorMessage && (
              <Alert variant="destructive" className="py-2.5">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-xs">{errorMessage}</AlertDescription>
              </Alert>
            )}

            <Button
              className="w-full h-11 bg-[#0A2540] hover:bg-[#0A2540]/90 text-white shadow-sm font-medium transition-all"
              type="submit"
              disabled={isPending}
            >
              {isPending ? "Connexion en cours..." : "Se connecter"}
              {!isPending && <ArrowRight className="w-4 h-4 ms-2" />}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
