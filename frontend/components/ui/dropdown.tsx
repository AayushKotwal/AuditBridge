"use client";

import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

interface Option {
  label: string;
  value: string;
}

interface DropdownProps {
  value: string;
  options: Option[];
  placeholder?: string;
  onChange: (value: string) => void;
}

export default function Dropdown({
  value,
  options,
  placeholder = "Select",
  onChange,
}: DropdownProps) {
  const [open, setOpen] = useState(false);

  const selected = options.find(
    (option) => option.value === value
  );

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
    >
      <PopoverTrigger asChild>
        <button
          className="
            h-11
            min-w-[180px]

            rounded-2xl

            border
            border-zinc-800

            bg-zinc-900/80

            px-4

            flex
            items-center
            justify-between

            text-sm

            transition
            hover:border-rose-500
          "
        >
          <span>
            {selected
              ? selected.label
              : placeholder}
          </span>

          <ChevronDown
            className={`
              h-4
              w-4

              transition-transform

              ${
                open
                  ? "rotate-180"
                  : ""
              }
            `}
          />
        </button>
      </PopoverTrigger>

      <PopoverContent
        className="
          w-[220px]

          rounded-2xl

          border-zinc-800

          bg-zinc-950

          p-0
        "
      >
        <Command>
          <CommandInput
            placeholder="Search..."
          />

          <CommandList>
            <CommandEmpty>
              No results.
            </CommandEmpty>

            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  onSelect={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={`
                      mr-2
                      h-4
                      w-4

                      ${
                        value === option.value
                          ? "opacity-100"
                          : "opacity-0"
                      }
                    `}
                  />

                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}