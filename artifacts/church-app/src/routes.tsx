import { Switch, Route } from "wouter";
import NotFound from "@/features/common/NotFound";
import Dashboard from "@/features/dashboard/Dashboard";
import Activity from "@/features/dashboard/Activity";
import Members from "@/features/people/pages/Members";
import MemberDetail from "@/features/people/pages/MemberDetail";
import Groups from "@/features/people/pages/Groups";
import GroupDetail from "@/features/people/pages/GroupDetail";
import Directory from "@/features/people/pages/Directory";
import FollowUp from "@/features/people/pages/FollowUp";
import MinistryTeams from "@/features/people/pages/MinistryTeams";
import TeamDetail from "@/features/people/pages/TeamDetail";
import Contributions from "@/features/giving/pages/Contributions";
import Pledges from "@/features/giving/pages/Pledges";
import Statements from "@/features/giving/pages/Statements";
import Accounting from "@/features/finance/pages/Accounting";
import Budget from "@/features/finance/pages/Budget";
import Reports from "@/features/finance/pages/Reports";
import Planning from "@/features/worship/pages/Planning";
import Songs from "@/features/worship/pages/Songs";
import WorshipTeams from "@/features/worship/pages/WorshipTeams";
import Calendar from "@/features/events/pages/Calendar";
import Volunteers from "@/features/events/pages/Volunteers";
import Checkin from "@/features/events/pages/Checkin";
import CheckinKiosk from "@/features/events/pages/CheckinKiosk";
import Email from "@/features/comms/pages/Email";
import EmailCompose from "@/features/comms/pages/EmailCompose";
import SMS from "@/features/comms/pages/SMS";
import Notifications from "@/features/comms/pages/Notifications";
import Forms from "@/features/forms/pages/Forms";
import FormBuilder from "@/features/forms/pages/FormBuilder";
import Submissions from "@/features/forms/pages/Submissions";
import Builder from "@/features/portal/pages/Builder";
import Blog from "@/features/portal/pages/Blog";
import Settings from "@/features/settings/Settings";
import Profile from "@/features/profile/Profile";
import AvailableAppointments from "@/features/appointments/pages/AvailableAppointments";
import ScheduledAppointments from "@/features/appointments/pages/ScheduledAppointments";

export function AppRoutes() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/activity" component={Activity} />
      <Route path="/members/:id" component={MemberDetail} />
      <Route path="/members" component={Members} />
      <Route path="/groups/:slug" component={GroupDetail} />
      <Route path="/groups" component={Groups} />
      <Route path="/teams/:slug" component={TeamDetail} />
      <Route path="/teams" component={MinistryTeams} />
      <Route path="/directory" component={Directory} />
      <Route path="/followup" component={FollowUp} />
      <Route path="/appointments/available" component={AvailableAppointments} />
      <Route path="/appointments/schedule" component={ScheduledAppointments} />
      <Route path="/giving/contributions" component={Contributions} />
      <Route path="/giving/pledges" component={Pledges} />
      <Route path="/giving/statements" component={Statements} />
      <Route path="/finance/accounting" component={Accounting} />
      <Route path="/finance/budget" component={Budget} />
      <Route path="/finance/reports" component={Reports} />
      <Route path="/worship/planning" component={Planning} />
      <Route path="/worship/songs" component={Songs} />
      <Route path="/worship/teams" component={WorshipTeams} />
      <Route path="/events/calendar" component={Calendar} />
      <Route path="/events/volunteers" component={Volunteers} />
      <Route path="/events/checkin/kiosk" component={CheckinKiosk} />
      <Route path="/events/checkin" component={Checkin} />
      <Route path="/comms/email/compose" component={EmailCompose} />
      <Route path="/comms/email" component={Email} />
      <Route path="/comms/sms" component={SMS} />
      <Route path="/comms/notifications" component={Notifications} />
      <Route path="/forms/new" component={FormBuilder} />
      <Route path="/forms/:id/edit" component={FormBuilder} />
      <Route path="/forms/submissions" component={Submissions} />
      <Route path="/forms" component={Forms} />
      <Route path="/portal/builder" component={Builder} />
      <Route path="/portal/blog" component={Blog} />
      <Route path="/settings" component={Settings} />
      <Route path="/profile" component={Profile} />
      <Route component={NotFound} />
    </Switch>
  );
}
