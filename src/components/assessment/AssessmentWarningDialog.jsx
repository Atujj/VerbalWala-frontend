import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

export default function AssessmentWarningDialog({
  open,
  warningCount,
  maxWarnings,
  onClose,
}) {
  return (
    <Dialog open={open}>
      <DialogContent
        className="sm:max-w-md"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>

    <DialogTitle className="text-amber-600">
        ⚠ Assessment Integrity Warning
    </DialogTitle>

</DialogHeader>

<div className="space-y-4 text-sm text-slate-600">

    <p>
        You switched away from the assessment.
    </p>

    <p>
        Warning <strong>{warningCount}</strong> of{" "}
        <strong>{maxWarnings}</strong>
    </p>

    <p>
        If you leave the assessment {maxWarnings} times,
        your assessment will be terminated automatically.
    </p>

</div>

<DialogFooter>

    <Button onClick={onClose}>
        Continue Assessment
    </Button>

</DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
