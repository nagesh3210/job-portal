
import { EmployerProfileData } from "@/features/employers/employers.schemas";
import getCurrentEmployerDetails from "@/features/employers/server/employer-queries";
import EmployerSettingsForm from "@/features/employers/component/employer-setting-form";
import { redirect } from "next/navigation";

const EmployerSettings = async () => {
    const employer = await getCurrentEmployerDetails();
    if (!employer) return redirect("/login");

    // console.log("currentEmployer: ", employer);

    return (
        <div>
            <EmployerSettingsForm
                initialData={
                    {
                        name: employer.employerDetails.name,
                        description: employer.employerDetails.description,
                        organizationType: employer.employerDetails.organizationType,
                        teamSize: employer.employerDetails.teamSize,
                        location: employer.employerDetails.location,
                        websiteUrl: employer.employerDetails.websiteUrl,
                        yearOfEstablishment:
                            employer.employerDetails.yearOfEstablishment?.toString(),
                        bannerImageUrl: employer.employerDetails.bannerImageUrl,
                    } as EmployerProfileData}
                    
            />
        </div>
    );
};

export default EmployerSettings;