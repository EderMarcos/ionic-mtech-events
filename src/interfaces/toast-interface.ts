export interface ToastInterface {
  message: string;
  duration?: number;
  position?: string;
  cssClass?: string;
  showCloseButton?: boolean;
  closeButtonText?: string;
  dismissOnPageChange?: boolean;
}
