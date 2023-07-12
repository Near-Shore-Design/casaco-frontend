export interface ModalProps {
  children: React.ReactNode;
  isShown: boolean;
  className?: string;
  hide: () => void;
  height?: string;
  header: string;
  id?: number | null;
}
