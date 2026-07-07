import AssessmentTimer from "./AssessmentTimer";

import { Button } from "@/components/ui/button";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function EmailSection({
    email,
    emailTimeLeft,
    emailAnswer,
    setEmailAnswer,
    onSubmit,
}) {

    return (

        <div className="bg-white rounded-xl shadow-lg p-10 space-y-8">

            <AssessmentTimer
                timeLeft={emailTimeLeft}
            />

            <h1 className="text-3xl font-bold">
                Email Writing
            </h1>

            <p className="leading-8 whitespace-pre-line">
                {email.questionText}
            </p>

            <textarea
                rows={14}
                className="w-full rounded-lg border border-slate-300 p-4 resize-none"
                placeholder="Write your email..."
                value={emailAnswer}
                onChange={(e) =>
                    setEmailAnswer(e.target.value)
                }
            />

            <div className="flex justify-end">

            <AlertDialog>

                <AlertDialogTrigger asChild>

                    <Button size="lg">
                        Submit Assessment
                    </Button>

                </AlertDialogTrigger>

                <AlertDialogContent>

                    <AlertDialogHeader>

                        <AlertDialogTitle>
                            Submit Assessment?
                        </AlertDialogTitle>

                        <AlertDialogDescription>
                            Once submitted, you will not be able to modify your answers.
                            If you are sure, click Submit.
                        </AlertDialogDescription>

                    </AlertDialogHeader>

                    <AlertDialogFooter>

                        <AlertDialogCancel>
                            Cancel
                        </AlertDialogCancel>

                        <AlertDialogAction
                            onClick={onSubmit}
                        >
                            Submit
                        </AlertDialogAction>

                    </AlertDialogFooter>

                </AlertDialogContent>

            </AlertDialog>

        </div>

        </div>

    );

}