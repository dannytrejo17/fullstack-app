"use client";

import { useActionState } from "react";
import { publishProduct, type Publish } from "@/actions/publish-product";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const initial: Publish = {};

export function PublicarForm() {
  const [state, formAction, pending] = useActionState(publishProduct, initial);
  
  return (
    <form
      action={formAction}
      className="w-full space-y-4 rounded-2xl bg-white p-6 shadow-md"
    >
      <div className="space-y-2">
        <Label htmlFor="name">Nombre</Label>
        <Input id="name" name="name" required placeholder="Ej. Bicicleta urbana" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="price">Precio (€)</Label>
        <Input
          id="price"
          name="price"
          type="number"
          min={0}
          step={0.01}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="category">Categoría</Label>
        <Input id="category" name="category" required placeholder="Electrónica" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="province">Provincia</Label>
          <Input id="province" name="province" required placeholder="Barcelona" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="city">Ciudad</Label>
          <Input id="city" name="city" required placeholder="Terrassa" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Descripción</Label>
        <Textarea id="description" name="description" required rows={4} />
      </div>
      {state.message && (
  <p className="text-sm text-red-600">{state.message}</p>
)}
      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Publicando…" : "Publicar"}
      </Button>
    </form>
  );
}
