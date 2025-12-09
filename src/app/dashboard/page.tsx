import { Button } from "@/components/ui/button";
import { LogOutAction } from "@/features/auth/server/auth.action";

const ApplicantDashboard = ()=>
{
    return <>
    <h1>Applicant dashboard</h1>
    <Button onClick={LogOutAction} variant={"secondary"}>LogOut</Button>
    </>;

}

export default ApplicantDashboard;