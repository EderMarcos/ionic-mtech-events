import { InputInterface } from "./input-interface";
import { ButtonInterface } from "./button-interface";

export interface AlertInterface {
  title: string;
  subTitle?: string;
  message?: string;
  buttons?: ButtonInterface[];
  inputs?: InputInterface[];
}
