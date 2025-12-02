"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Eye, EyeOff, Lock } from "lucide-react";

import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { loginAction } from "../../features/auth/server/auth.action";
import { toast } from "sonner";

interface LoginFormData {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Handler: updates form state when user types in any input field
  const handleInputChange = (name: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const loginData =
       {
        email: formData.email.toLowerCase().trim(),
        password: formData.password,
      };

      const result = await loginAction(loginData);

      if(result.status === "success"){
        toast.success(result.message);
      }
      else{
        toast.error(result.message);
      }

    }
    catch (error) {
      console.error("Login failed:", error);

    }
  }
  

    const [formData, setFormData] = useState<LoginFormData>({
      email: "",
      password: ""
    })

    //   console.log("Form Data:", formData);

    return (
      <>
        <div className="h-screen bg-white flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28 }}
            className="w-full max-w-xs"
          >
            <Card className="rounded-xl border-[1px] border-slate-100 shadow-sm">
              <CardHeader className="flex flex-col items-center pt-6">
                <div className="w-12 h-12 rounded-full bg-neutral-900 flex items-center justify-center text-white shadow">
                  <User size={18} />
                </div>

                <CardTitle className="mt-3 text-center text-base font-semibold">
                  Join Our Job Portal
                </CardTitle>
                <CardDescription className="text-center text-xs text-slate-500 mt-1">
                  Create your account to get started
                </CardDescription>
              </CardHeader>

              <CardContent className="p-5">
                <form className="space-y-3" onSubmit={handleSubmit}>
                  {/* Email */}
                  <div>
                    <Label className="text-xs font-medium">Email Address *</Label>
                    <div className="relative mt-2">
                      <Input
                        name="email"
                        type="email"
                        className="pl-10 py-2.5 text-sm"
                        placeholder="name@company.com"
                        value={formData.email}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          handleInputChange("email", e.target.value)
                        }
                        autoComplete="email"
                        aria-label="Email"
                      />
                      <Mail
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                        size={14}
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <Label className="text-xs font-medium">Password *</Label>
                    <div className="relative mt-2">
                      <Input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        className="pl-10 py-2.5 text-sm"
                        placeholder="Enter password"
                        value={formData.password}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          handleInputChange("password", e.target.value)
                        }
                        autoComplete="new-password"
                        aria-label="Password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((s) => !s)}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                      <Lock
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                        size={14}
                      />
                    </div>
                  </div>

                  {/* CTA (black) */}
                  <div>
                    <Button
                      type="submit"
                      className="w-full h-10 bg-black text-white hover:bg-black/90"
                      disabled={loading}
                    >
                      {loading ? "Login..." : "Login"}
                    </Button>
                  </div>

                  <div className="text-center mt-1 text-xs text-slate-500">
                    Don,t have an account?{" "}
                    <Link className="text-slate-900 underline" href="/registration">
                      Sign in here
                    </Link>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </>
    );
  };

  export default LoginPage;
