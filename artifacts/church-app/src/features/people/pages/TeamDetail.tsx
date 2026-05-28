import { useRoute } from "wouter";
import { getTeamBySlug } from "@/features/people/data/people-teams";
import { TeamDetailShell } from "@/features/people/components/teams/TeamDetailShell";
import { TeamFeaturePanel } from "@/features/people/components/teams/TeamFeaturePanel";
import NotFound from "@/features/common/NotFound";

export default function TeamDetail() {
  const [, params] = useRoute("/teams/:slug");
  const team = getTeamBySlug(params?.slug ?? "");

  if (!team) {
    return <NotFound />;
  }

  return (
    <TeamDetailShell team={team}>
      <TeamFeaturePanel featureId={team.featureId} />
    </TeamDetailShell>
  );
}
