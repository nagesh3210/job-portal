"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Eye, EyeOff, Lock } from "lucide-react";
import { registrationAction } from "../../features/auth/server/auth.action";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { toast } from "sonner";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RegisterUserWithConfirmData,
  registerUserWithConfirmSchema,
} from "@/features/auth/auth.schema";

const Registration: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerUserWithConfirmSchema),
    defaultValues: { role: "applicant" }
  });

  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (data: RegisterUserWithConfirmData) => {

    console.log("onSubmit — form data:", data);   // <--- add this line

    const result = await registrationAction(data);

    if (result.status === "success") toast.success(result.message);
    else toast.error(result.message);
  };



  return (
    <div className="h-screen overflow-hidden bg-slate-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28 }}
        className="w-full max-w-md mx-auto"
      >
        <Card className="overflow-visible shadow-lg">
          <CardHeader className="flex flex-col items-center pt-6">
            <div className="w-12 h-12 rounded-full bg-neutral-900 flex items-center justify-center text-white text-lg shadow-sm">
              <User size={20} />
            </div>

            <CardTitle className="mt-3 text-center text-lg leading-tight">
              Join Our Job Portal
            </CardTitle>

            <CardDescription className="text-center text-xs text-slate-500">
              Create your account to get started
            </CardDescription>
          </CardHeader>

          <CardContent className="p-4">
            <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
              {/* Full Name */}
              <div>
                <Label className="text-xs font-medium">Full Name *</Label>
                <div className="relative mt-1">
                  <Input
                    placeholder="Enter your full name"
                    {...register("name")}
                    className={`pl-10 py-2.5 text-sm box-border ${errors.name
                      ? "border border-destructive focus:border-destructive focus:ring-1 focus:ring-destructive outline-none"
                      : ""
                      }`}
                  />
                  <User
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                    size={14}
                  />
                </div>
                {errors.name && (
                  <p className="text-sm text-destructive">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Username */}
              <div>
                <Label className="text-xs font-medium">Username *</Label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Choose a username"
                    {...register("userName")}
                    className={`pl-10 py-2.5 text-sm box-border ${errors.userName
                      ? "border border-destructive focus:border-destructive focus:ring-1 focus:ring-destructive outline-none"
                      : ""
                      }`}
                  />
                </div>
                {errors.userName && (
                  <p className="text-sm text-destructive">
                    {errors.userName.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <Label className="text-xs font-medium">Email Address *</Label>
                <div className="relative mt-1">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    {...register("email")}
                    className={`pl-10 py-2.5 text-sm box-border ${errors.email
                      ? "border border-destructive focus:border-destructive focus:ring-1 focus:ring-destructive outline-none"
                      : ""
                      }`}
                  />
                  <Mail
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                    size={14}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Role */}
              <div>
                <Label className="text-xs font-medium">I am a *</Label>

                <Controller
                  control={control}
                  name="role"
                  defaultValue="applicant"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        className={`h-9 text-sm ${errors.role
                          ? "border border-destructive focus:border-destructive focus:ring-1 focus:ring-destructive outline-none"
                          : ""
                          }`}
                      >
                        <SelectValue placeholder="Job Applicant" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="applicant">Job Applicant</SelectItem>
                        <SelectItem value="employer">Employer</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />

                {errors.role && (
                  <p className="text-sm text-destructive">{errors.role.message}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <Label className="text-xs font-medium">Password *</Label>

                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />

                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    {...register("password")}
                    className={`pl-10 pr-10 py-2.5 text-sm box-border ${errors.password
                      ? "border border-destructive focus:border-destructive focus:ring-1 focus:ring-destructive outline-none"
                      : ""
                      }`}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                {errors.password && (
                  <p className="text-sm text-destructive">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <Label className="text-xs font-medium">Confirm Password *</Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />

                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    {...register("confirmPassword")}
                    className={`pl-10 py-2.5 text-sm box-border ${errors.confirmPassword
                      ? "border border-destructive focus:border-destructive focus:ring-1 focus:ring-destructive outline-none"
                      : ""
                      }`}
                  />
                </div>

                {errors.confirmPassword && (
                  <p className="text-sm text-destructive">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <div className="pt-1">
                <Button type="submit" className="w-full h-9" disabled={submitting}>
                  {submitting ? "Creating..." : "Create Account"}
                </Button>
              </div>

              {/* Login link */}
              <div className="text-center mt-1 text-xs text-slate-500">
                Already have an account?{" "}
                <Link className="text-slate-900 underline" href="/login">
                  Sign in here
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Registration;
