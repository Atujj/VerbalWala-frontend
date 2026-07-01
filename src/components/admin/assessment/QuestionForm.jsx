import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function QuestionForm({ type, onSubmit, initialData = null }) {
  const [questionText, setQuestionText] = useState("");
  const [expectedAnswer, setExpectedAnswer] = useState("");
  const [alternativeAnswers, setAlternativeAnswers] = useState("");
  const [marks, setMarks] = useState(1);
  const [questionOrder, setQuestionOrder] = useState(1);

  useEffect(() => {
    if (!initialData) {
      return;
    }

    setQuestionText(initialData.questionText);

    setExpectedAnswer(initialData.expectedAnswer ?? "");

    setAlternativeAnswers(
    initialData.alternativeAnswers?.join(", ") ?? ""
);

    setMarks(initialData.marks);

    setQuestionOrder(initialData.questionOrder);
  }, [initialData]);

  function handleSubmit(e) {
    e.preventDefault();

    onSubmit({
      type,

      questionText,

      expectedAnswer,

      alternativeAnswers: alternativeAnswers
        .split(",")
        .map((answer) => answer.trim())
        .filter((answer) => answer.length > 0),

      marks: Number(marks),

      questionOrder: Number(questionOrder),
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow p-6 space-y-5"
    >
      <h2 className="text-xl font-semibold">{type.replace("_", " ")}</h2>

      <div>
        <Label>Question</Label>

        <textarea
          rows={6}
          className="w-full border rounded-lg p-3"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
        />
      </div>

      {type === "FILL_BLANK" && (
        <div>
          <Label>Correct Answer</Label>

          <Input
            value={expectedAnswer}
            onChange={(e) => setExpectedAnswer(e.target.value)}
          />
        </div>
      )}

      {type === "FILL_BLANK" && (
        <div>
          <Label>Alternative Answers</Label>

          <Input
            placeholder="increase, enlarge, extend"
            value={alternativeAnswers}
            onChange={(e) => setAlternativeAnswers(e.target.value)}
          />

          <p className="text-xs text-slate-500 mt-1">
            Separate multiple answers using commas.
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Marks</Label>

          <Input
            type="number"
            value={marks}
            onChange={(e) => setMarks(e.target.value)}
          />
        </div>

        <div>
          <Label>Order</Label>

          <Input
            type="number"
            value={questionOrder}
            onChange={(e) => setQuestionOrder(e.target.value)}
          />
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={() => {
          if (window.confirm("Cancel editing?")) {
            window.location.reload();
          }
        }}
      >
        Cancel
      </Button>

      <Button type="submit">Save Question</Button>
    </form>
  );
}
