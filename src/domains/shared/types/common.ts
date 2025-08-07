export type EmailTemplateProps = {
  firstName: string;
  tokenizedUrl: string;
};

interface FormElements extends HTMLFormControlsCollection {
  specialty: HTMLInputElement;
  name: HTMLInputElement;
  insurance: HTMLInputElement;
}

export interface FormElement extends HTMLFormElement {
  elements: FormElements;
}

export type NumberedDayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type DayOfWeek =
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday";

export type DateOnly = `${number}-${number}-${number}`;
