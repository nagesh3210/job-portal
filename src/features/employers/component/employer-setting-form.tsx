"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Briefcase,
  Building2,
  Calendar,
  FileText,
  Globe,
  Loader,
  MapPin,
} from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { updateEmployerProfileAction } from "../server/employer-actions";
import {
  EmployerProfileData,
  employerProfileSchema,
  organizationTypes,
  teamSizes,
} from "../employers.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef } from "react";

interface Props {
  initialData?: Partial<EmployerProfileData>;
}

const EmployerSettingForm = ({ initialData }: Props) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty, isLoading, isSubmitting, isSubmitSuccessful },
  } = useForm<EmployerProfileData>({
    resolver: zodResolver(employerProfileSchema),
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      organizationType: initialData?.organizationType as any,
      teamSize: initialData?.teamSize as any,
      yearOfEstablishment: initialData?.yearOfEstablishment || "",
      websiteUrl: initialData?.websiteUrl || "",
      location: initialData?.location || "",
      bannerImageUrl: initialData?.bannerImageUrl || "",
    },
  });

  
  const handleFormSubmit = async (data: EmployerProfileData) => {
    console.log("settings submit data", data);
    const response = await updateEmployerProfileAction(data);

    if (response.status === "SUCCESS") {
      toast.success(response.message);
      reset(data);
    } else {
      toast.error(response.message);
    }
  };

  return (
    <Card>
      <CardContent>
        <form
          onSubmit={handleSubmit(handleFormSubmit, (formErrors) => {
            console.log("FORM ERRORS:", formErrors);
            toast.error("Please fix the errors in the form");
          })}
          className="space-y-6"
        >
          {/* Company Name */}
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name</Label>
            <div className="relative">
              <Building2 className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                id="companyName"
                className="pl-10"
                {...register("name")}
                placeholder="Enter company name"
              />
            </div>
            {errors.name && (
              <p className="text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Textarea
                id="description"
                className="pl-10 min-h-[120px] resize-none"
                placeholder="Tell us about your company"
                {...register("description")}
              />
            </div>
            {errors.description && (
              <p className="text-sm text-red-600">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Organization Type & Team Size */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Organization Type *</Label>
              <Controller
                name="organizationType"
                control={control}
                render={({ field }) => (
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="pl-10 w-full">
                        <SelectValue placeholder="Select organization type" />
                      </SelectTrigger>
                      <SelectContent>
                        {organizationTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              />
              {errors.organizationType && (
                <p className="text-sm text-red-600">
                  {errors.organizationType.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Team Size *</Label>
              <Controller
                name="teamSize"
                control={control}
                render={({ field }) => (
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="pl-10 w-full">
                        <SelectValue placeholder="Select team size" />
                      </SelectTrigger>
                      <SelectContent>
                        {teamSizes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              />
              {errors.teamSize && (
                <p className="text-sm text-red-600">
                  {errors.teamSize.message}
                </p>
              )}
            </div>
          </div>

          {/* Year & Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Year of Establishment *</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  className="pl-10"
                  placeholder="e.g., 2020"
                  maxLength={4}
                  {...register("yearOfEstablishment")}
                />
              </div>
              {errors.yearOfEstablishment && (
                <p className="text-sm text-red-600">
                  {errors.yearOfEstablishment.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Location *</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  className="pl-10"
                  placeholder="e.g., Pune, Bangalore"
                  {...register("location")}
                />
              </div>
              {errors.location && (
                <p className="text-sm text-red-600">
                  {errors.location.message}
                </p>
              )}
            </div>
          </div>

          {/* Website */}
          <div className="space-y-2">
            <Label>Website URL (Optional)</Label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                className="pl-10"
                placeholder="https://www.yourcompany.com"
                {...register("websiteUrl")}
              />
            </div>
            {errors.websiteUrl && (
              <p className="text-sm text-red-600">
                {errors.websiteUrl.message}
              </p>
            )}
          </div>
          <div className="flex items-center gap-4 pt-4">
            <Button type="submit" disabled={!isDirty || isSubmitting}>
              {isSubmitting && <Loader className="w-4 h-4 animate-spin" />}
              {isSubmitting ? "Saving Changes ..." : "save Changes"}
              
            </Button> 

            {!isDirty && (<p className="text-sm text-muted-foreground">No changes to save</p>)}

          </div>

        </form>
      </CardContent>
    </Card>
  );
};

export default EmployerSettingForm;
