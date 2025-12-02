"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Eye, EyeOff } from "lucide-react";
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

// Type definition for the registration form data
interface RegistrationFormData {
  userName: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: "applicant" | "employer";
}

const Registration: React.FC = () => {
  // State: stores form input values
  const [formData, setFormData] = useState<RegistrationFormData>({
    userName: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "applicant",
  });

  // State: controls password visibility toggle
  const [showPassword, setShowPassword] = useState(false);

  // State: tracks form submission state (prevents double submission, shows loading state)
  const [submitting, setSubmitting] = useState(false);

  // Handler: updates form state when user types in any input field
  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handler: processes form submission (validation, API call, etc.)
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const registrationData = {
      userName: formData.userName.trim(),
      name: formData.name.trim(),
      email: formData.email.toLowerCase().trim(),
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      role: formData.role,
    };

    if(formData.password !== formData.confirmPassword) 
      return toast.error("Passwords do not match");
    
    // console.log("Registration Data:", registrationData);
    const result= await registrationAction(registrationData);
  
  if(result.status === "success") toast.success(result.message);
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
            <form className="space-y-3" onSubmit={handleSubmit}>
              {/* Full Name */}
              <div>
                <Label className="text-xs font-medium">Full Name *</Label>
                <div className="relative mt-1">
                  <Input
                    className="pl-10 py-2.5 text-sm box-border"
                    placeholder="Enter your full name"
                    name="name"
                    value={formData.name}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleInputChange("name", e.target.value)
                    }
                  />
                  <User
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                    size={14}
                  />
                </div>
              </div>

              {/* Username */}
              <div>
                <Label className="text-xs font-medium">Username *</Label>
                <div className="relative mt-1">
                  <Input
                    className="pl-10 py-2.5 text-sm box-border"
                    name="userName"
                    placeholder="Choose a username"
                    value={formData.userName}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleInputChange("userName", e.target.value)
                    }
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <Label className="text-xs font-medium">Email Address *</Label>
                <div className="relative mt-1">
                  <Input
                    className="pl-10 py-2.5 text-sm box-border"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleInputChange("email", e.target.value)
                    }
                  />
                  <Mail
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                    size={14}
                  />
                </div>
              </div>

              {/* Role */}
              <div>
                <Label className="text-xs font-medium">I am a *</Label>
                <div className="mt-1">
                  <Select
                    value={formData.role}
                    onValueChange={(value) => handleInputChange("role", value)}
                  >
                    <SelectTrigger className="h-9 text-sm">
                      <SelectValue placeholder="Job Applicant" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="applicant">Job Applicant</SelectItem>
                      <SelectItem value="employer">Employer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <input type="hidden" name="role" value={formData.role} />
              </div>

              {/* Password */}
              <div>
                <Label className="text-xs font-medium">Password *</Label>
                <div className="relative mt-1">
                  <Input
                    className="pl-10 pr-10 py-2.5 text-sm box-border"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={formData.password}
                    name="password"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleInputChange("password", e.target.value)
                    }
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <Label className="text-xs font-medium">Confirm Password *</Label>
                <div className="relative mt-1">
                  <Input
                    className="pl-10 py-2.5 text-sm box-border"
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleInputChange("confirmPassword", e.target.value)
                    }
                  />
                </div>
              </div>

              {/* Submit Button */}
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
