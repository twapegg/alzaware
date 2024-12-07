import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CldImage } from "next-cloudinary";

interface MRIModalProps {
  mri_url: string;
}

export default function MRIModal({ mri_url }: MRIModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <CldImage src={mri_url} alt="MRI Scan" width={150} height={150} />
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>MRI Scan</DialogTitle>
          <CldImage src={mri_url} alt="MRI Scan" width={1000} height={1000} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}