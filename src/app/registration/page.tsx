// Mark this as a client component - required for React hooks and event handlers
"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Eye, EyeOff } from "lucide-react";

// Import UI components from shadcn/ui
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
  const handleSubmit = (e: FormEvent) => {
    try {
      // TODO: Add form validation logic
      // TODO: Add API call to register user
    } catch (err) {
      // TODO: Handle and display error messages
    }
  };

  return (
    // Outer wrapper: full viewport height, centered layout, light background
    <div className="h-screen overflow-hidden bg-slate-50 flex items-center justify-center">
      {/* Motion wrapper: adds smooth fade-in and slide animation on component mount */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28 }}
        className="w-full max-w-md mx-auto"
      >
        {/* Card container: main registration form card with shadow */}
        <Card className="overflow-visible shadow-lg">
          {/* Card header: contains avatar, title, and description */}
          <CardHeader className="flex flex-col items-center pt-6">
            {/* Avatar icon: blue circle with user icon */}
            <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white text-lg shadow-sm">
              <User size={20} />
            </div>

            {/* Card title: main heading */}
            <CardTitle className="mt-3 text-center text-lg leading-tight">
              Join Our Job Portal
            </CardTitle>
            
            {/* Card description: subtitle text */}
            <CardDescription className="text-center text-xs text-slate-500">
              Create your account to get started
            </CardDescription>
          </CardHeader>

          {/* Card content: contains all form fields */}
          <CardContent className="p-4">
            <form className="space-y-3" onSubmit={handleSubmit}>
              {/* Full name field with left icon for visual clarity */}
              <div>
                <Label className="text-xs font-medium">Full Name *</Label>
                <div className="relative mt-1">
                  <Input
                    className="pl-10 py-2.5 text-sm"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) =>
                      handleInputChange("name", e.target.value)
                    }
                  />
                  <User
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                    size={14}
                  />
                </div>
              </div>

              {/* Username field for login identification */}
              <div>
                <Label className="text-xs font-medium">Username *</Label>
                <div className="relative mt-1">
                  <Input
                    className="py-2.5 text-sm"
                    placeholder="Choose a username"
                    value={formData.userName}
                    onChange={(e) =>
                      handleInputChange("userName", e.target.value)
                    }
                  />
                </div>
              </div>

              {/* Email field with validation icon */}
              <div>
                <Label className="text-xs font-medium">Email Address *</Label>
                <div className="relative mt-1">
                  <Input
                    className="pl-10 py-2.5 text-sm"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) =>
                      handleInputChange("email", e.target.value)
                    }
                  />
                  <Mail
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                    size={14}
                  />
                </div>
              </div>

              {/* Role selector: determines if user is job applicant or employer */}
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
              </div>

              {/* Password field with toggle visibility button */}
              <div>
                <Label className="text-xs font-medium">Password *</Label>
                <div className="relative mt-1">
                  <Input
                    className="pr-10 py-2.5 text-sm"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                  />
                  {/* Eye icon button to toggle password visibility */}
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

              {/* Confirm password field to ensure user enters correct password */}
              <div>
                <Label className="text-xs font-medium">
                  Confirm Password *
                </Label>
                <div className="relative mt-1">
                  <Input
                    className="py-2.5 text-sm"
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      handleInputChange("confirmPassword", e.target.value)
                    }
                  />
                </div>
              </div>

              {/* Submit button: disabled during form submission to prevent double-submit */}
              <div className="pt-1">
                <Button
                  type="submit"
                  className="w-full h-9"
                  disabled={submitting}
                >
                  {submitting ? "Creating..." : "Create Account"}
                </Button>
              </div>

              {/* Login link: directs existing users to sign-in page */}
              <div className="text-center mt-1 text-xs text-slate-500">
                Already have an account?{" "}
                <a className="text-indigo-600 underline" href="#">
                  Sign in here
                </a>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
      
    </div>
  );
};
export default Registration;
