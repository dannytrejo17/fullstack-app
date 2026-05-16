"use client";

import { useActionState } from "react";
import { submitContact, type ContactState } from "@/actions/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const initial: ContactState = {};

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, initial);

  return (
    <form
      action={formAction}
      className="w-full space-y-4 rounded-2xl bg-white p-6 shadow-md"
    >
      <div className="space-y-2">
        <Label htmlFor="name">Nombre</Label>
        <Input id="name" name="name" autoComplete="name" required />
        {state.fieldErrors?.name && (
          <p className="text-sm text-red-600">{state.fieldErrors.name}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
        />
        {state.fieldErrors?.email && (
          <p className="text-sm text-red-600">{state.fieldErrors.email}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Mensaje</Label>
        <Textarea id="message" name="message" required rows={5} />
        {state.fieldErrors?.body && (
          <p className="text-sm text-red-600">{state.fieldErrors.body}</p>
        )}
      </div>
      {state.ok && state.message && (
        <p className="text-sm text-teal-700 font-medium">{state.message}</p>
      )}
      {!state.ok && state.message && !state.fieldErrors && (
        <p className="text-sm text-red-600">{state.message}</p>
      )}
      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Enviando…" : "Enviar mensaje"}
      </Button>
    </form>
  );
}
