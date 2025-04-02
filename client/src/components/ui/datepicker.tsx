"use client";

import * as React from "react";
import { format, parseISO } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
  value?: string;
  onChange: (date: string | undefined) => void;
}

export function DatePicker({ value, onChange }: DatePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const dateValue = value ? parseISO(value) : undefined;

  const handleClear = () => {
    onChange(undefined);
    setIsOpen(false);
  };

  const handleSelect = (date: Date | undefined) => {
    onChange(date?.toISOString());
    setIsOpen(false);
  };

  return (
    <div className="flex w-full">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !value && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="h-4 w-4" />
            {dateValue ? (
              format(dateValue, "dd MMMM, yyyy")
            ) : (
              <span className="opacity-70">Select a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto rounded-md border bg-popover p-0 shadow-lg animate-in fade-in zoom-in-95"
          align="start"
        >
          <div className="flex flex-col">
            <Calendar
              mode="single"
              selected={dateValue}
              onSelect={handleSelect}
              initialFocus
              className="rounded-t-md border-b p-3"
            />
            <Button
              variant="ghost"
              className="rounded-b-md px-3 py-2 text-sm text-destructive hover:bg-muted"
              onClick={handleClear}
            >
              Clear Date
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
