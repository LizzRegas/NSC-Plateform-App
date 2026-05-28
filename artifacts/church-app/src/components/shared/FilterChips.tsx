import { motion } from "framer-motion";
import { Check } from "lucide-react";

type FilterChipsBase = {
  options: string[];
  className?: string;
};

type FilterChipsSingleProps = FilterChipsBase & {
  multiple?: false;
  value: string;
  onChange: (value: string) => void;
};

type FilterChipsMultipleProps = FilterChipsBase & {
  multiple: true;
  value: string[];
  onChange: (value: string[]) => void;
};

export type FilterChipsProps = FilterChipsSingleProps | FilterChipsMultipleProps;

export function FilterChips(props: FilterChipsProps) {
  const { options, className = "" } = props;
  const multiple = props.multiple === true;

  const isSelected = (opt: string) =>
    multiple ? props.value.includes(opt) : props.value === opt;

  const toggle = (opt: string) => {
    if (multiple) {
      const next = props.value.includes(opt)
        ? props.value.filter((v) => v !== opt)
        : [...props.value, opt];
      props.onChange(next);
    } else {
      props.onChange(opt);
    }
  };

  return (
    <motion.div
      role={multiple ? "group" : undefined}
      aria-label={multiple ? "Filters" : undefined}
      className={`flex gap-2 overflow-x-auto pb-1 scrollbar-hide ${className}`}
    >
      {options.map((opt) => {
        const selected = isSelected(opt);
        return (
          <button
            key={opt}
            type="button"
            aria-pressed={multiple ? selected : undefined}
            onClick={() => toggle(opt)}
            className={`filter-chip inline-flex items-center gap-1.5 ${
              selected ? "filter-chip-active" : ""
            }`}
          >
            {multiple && selected && <Check className="w-3 h-3 shrink-0 opacity-90" strokeWidth={2.5} />}
            {opt}
          </button>
        );
      })}
    </motion.div>
  );
}
