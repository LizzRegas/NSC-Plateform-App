import type { TeamFeatureId } from "@/features/people/data/people-teams";
import { WorshipSetsFeature } from "./features/WorshipSetsFeature";
import { VisitorFollowUpFeature } from "./features/VisitorFollowUpFeature";
import { HospitalitySuiteFeature } from "./features/HospitalitySuiteFeature";
import { MediaRundownFeature } from "./features/MediaRundownFeature";
import { SoundChecklistFeature } from "./features/SoundChecklistFeature";
import { AvSignalFlowFeature } from "./features/AvSignalFlowFeature";
import { OutreachCalendarFeature } from "./features/OutreachCalendarFeature";
import { EvangelismTrackerFeature } from "./features/EvangelismTrackerFeature";
import { TranslationGlossaryFeature } from "./features/TranslationGlossaryFeature";
import { FinanceReconciliationFeature } from "./features/FinanceReconciliationFeature";
import { SundaySchoolCurriculumFeature } from "./features/SundaySchoolCurriculumFeature";

const FEATURES: Record<TeamFeatureId, React.ComponentType> = {
  "worship-sets": WorshipSetsFeature,
  "visitor-follow-up": VisitorFollowUpFeature,
  "hospitality-suite": HospitalitySuiteFeature,
  "media-rundown": MediaRundownFeature,
  "sound-checklist": SoundChecklistFeature,
  "av-signal-flow": AvSignalFlowFeature,
  "outreach-calendar": OutreachCalendarFeature,
  "evangelism-tracker": EvangelismTrackerFeature,
  "translation-glossary": TranslationGlossaryFeature,
  "finance-reconciliation": FinanceReconciliationFeature,
  "sunday-school-curriculum": SundaySchoolCurriculumFeature,
};

export function TeamFeaturePanel({ featureId }: { featureId: TeamFeatureId }) {
  const Feature = FEATURES[featureId];
  return <Feature />;
}
