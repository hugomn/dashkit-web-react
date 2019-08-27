import { Calendar, CalendarProps, DropButton, TextInput } from "grommet";
import moment from "moment";
import React, { useState } from "react";
import { handleSelect, toggleOpen } from ".";

interface IProps {
  disabled?: HTMLInputElement["disabled"];
  name?: HTMLInputElement["name"];
  onSelect?: CalendarProps["onSelect"];
  value: HTMLInputElement["value"];
}

const DateInput: React.FC<IProps> = ({ disabled, name, onSelect, value }) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<string | undefined>(value);
  return (
    <DropButton
      open={open}
      onClose={toggleOpen(false, setOpen)}
      onOpen={toggleOpen(true, setOpen)}
      disabled={disabled}
      dropContent={<Calendar date={date} onSelect={handleSelect(setDate, setOpen, onSelect)} />}>
      <TextInput
        name={name}
        disabled={disabled}
        value={moment(date).format("DD/MM/YYYY")}
        data-testid="input-date"
      />
    </DropButton>
  );
};

export default DateInput;
