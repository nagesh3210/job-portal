"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Building2, Calendar, FileText, Globe, MapPin } from "lucide-react";
import { useForm } from "react-hook-form";


interface IFormInput {
    email: string;
    name: string;
    description: string;
    location: string;
    yearOfEstablishment: string;
    websiteUrl?: string;
}


const EmployerSettingForm = () => {

    const { register, handleSubmit } = useForm<IFormInput>();

    const handleFormSubmit = (data: IFormInput) => {
        console.log(data);
    }

    return (
        <Card >
            <CardContent>
                <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
                    {/* Company Name*/}
                    <div className="space-y-2">
                        <Label htmlFor="companyName">Company Name</Label>
                        <div className="relative">
                            <Building2 className="absolute left-3 top-3 transform -traslate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input id="companyName" type="text" className="pl-10" {...register("name")} placeholder="Enter company name" />

                        </div>
                    </div>

                    {/*Description*/}

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <div className="relative">
                            <FileText className="absolute left-3 top-3  w-4 h-4 text-muted-foreground" />
                            <Textarea
                                id="description"
                                placeholder="Teall us about your company"
                                className="pl-10  min-h-[120px] resize-none"
                                {...register("description")}
                            ></Textarea>
                        </div>
                    </div>

                    {/* Year of Establishment and Location - Two columns */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="yearOfEstablishment">
                                Year of Establishment *
                            </Label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    id="yearOfEstablishment"
                                    type="text"
                                    placeholder="e.g., 2020"
                                    maxLength={4}
                                    className="pl-10"
                                    {...register("yearOfEstablishment")}
                                />
                            </div>
                        </div>

                        {/* Year of Establishment and Location - Two columns */}
                        <div className="space-y-2">
                            <Label htmlFor="location">Location *</Label>

                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    id="location"
                                    type="text"
                                    placeholder="e.g., Pune, Bangalore"
                                    className="pl-10"
                                    {...register("location")}
                                />
                            </div>
                        </div>

                    </div>
                    {/* Website URL */}
                    <div className="space-y-2">
                        <Label htmlFor="websiteUrl">Website URL (Optional)</Label>
                        <div className="relative">
                            <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                id="websiteUrl"
                                type="text"
                                placeholder="https://www.yourcompany.com"
                                className="pl-10"
                                {...register("websiteUrl")}
                            />
                        </div>
                    </div>



                    <Button type="submit">Save Changes</Button>

                </form>
            </CardContent>
        </Card>
    )
    // Component implementation
};
export default EmployerSettingForm;