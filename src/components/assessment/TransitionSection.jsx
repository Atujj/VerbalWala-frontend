import { Card, CardContent } from "@/components/ui/card";

export default function TransitionSection({
  title,
  subtitle,
  instructions,
  timeLeft,
}) {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <Card className="max-w-2xl w-full shadow-xl">
        <CardContent className="p-10 text-center space-y-8">

          <div>
            <h1 className="text-4xl font-bold">
              {title}
            </h1>

            <p className="text-slate-500 mt-2">
              {subtitle}
            </p>
          </div>

          <div className="text-left bg-slate-50 rounded-xl p-6">
            <h2 className="font-semibold mb-4">
              Instructions
            </h2>

            <ul className="space-y-2 list-disc list-inside text-slate-600">
              {instructions.map((instruction) => (
                <li key={instruction}>
                  {instruction}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-slate-500">
              Section starts in
            </p>

            <h2 className="text-6xl font-bold text-violet-600 mt-2">
              {timeLeft}
            </h2>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}