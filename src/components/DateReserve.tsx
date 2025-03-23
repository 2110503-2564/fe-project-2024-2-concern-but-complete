"use client";
import React, { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";

interface DateReserveProps {
  selectedDate: Dayjs | null;
  onDateChange: (date: Dayjs) => void;
  shouldDisableDate: (date: Dayjs) => boolean;
  disableBeforeDate?: Dayjs | null;
}

export default function DateReserve({
  selectedDate,
  onDateChange,
  shouldDisableDate,
  disableBeforeDate,
}: DateReserveProps) {
  const handleDateChange = (date: Dayjs | null) => {
    if (date && !shouldDisableDate(date)) {
      onDateChange(date);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        value={selectedDate}
        onChange={handleDateChange}
        shouldDisableDate={shouldDisableDate}
        disablePast
      />
    </LocalizationProvider>
  );
}
