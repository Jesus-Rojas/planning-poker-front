import { ToastType } from "./toast-type.enum";
import { ToastVariant } from "./toast-variant.enum";

export interface ToastMessage {
  id: string;
  title: string;
  body: string;
  variant: ToastVariant;
  type: ToastType;
}
