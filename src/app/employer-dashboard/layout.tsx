// app/employer-dashboard/layout.tsx
import React from "react";
import { getCurrentUser } from "@/features/auth/server/auth.queries";
import { redirect } from "next/navigation";

export default async function EmployerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login"); // call redirect() — it throws a redirect response
  }

  if (user.role !== "employer") {
    redirect("/dashboard");
  }

  return <>{children}</>;
}
