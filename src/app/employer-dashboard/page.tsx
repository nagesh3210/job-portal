import { getCurrentUser } from "@/features/auth/server/auth.queries";
import { EmployerProfileCompletionStatus } from "@/features/employers/component/employer-profilestatus";
import { StatsCards } from "@/features/employers/component/employer-stats";
import { redirect } from "next/navigation";

const EmployerApplicantDashboard = async ()=>
{


    const user = await getCurrentUser();

    if (!user) return redirect("/login");

    return  (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground">
          Hello, <span className="capitalize">{user?.name.toLowerCase()}</span>
        </h1>
        <p className="text-muted-foreground">
          Here is your daily activities and appLications
        </p>
      </div>

      {/* Stats Cards */}
      <StatsCards />

      <EmployerProfileCompletionStatus/>
    </div>
  );

}

export default EmployerApplicantDashboard;