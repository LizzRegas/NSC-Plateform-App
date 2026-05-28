import { StatCard, type StatCardProps } from "@/components/shared/StatCard";

interface KpiGridProps {
  stats: StatCardProps[];
  /** Single unified card (dashboard style) vs separate tiles */
  unified?: boolean;
}

export function KpiGrid({ stats, unified = false }: KpiGridProps) {
  if (unified) {
    return (
      <div className="card-lumina card-lumina-hover p-6 lg:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 xl:gap-0 xl:divide-x xl:divide-[#eceef0]">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`group/kpi ${i > 0 ? "xl:pl-8" : ""} ${i < stats.length - 1 ? "xl:pr-8" : ""} ${
                i >= 2 ? "pt-6 sm:pt-0" : ""
              } ${i === 1 ? "sm:pt-6 xl:pt-0" : ""}`}
            >
              <StatCard {...s} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
      {stats.map((s) => (
        <StatCard key={s.label} {...s} />
      ))}
    </div>
  );
}
