import { Card, CardContent } from "@/components/ui/card";

export default function StatCard({
    title,
    value,
    subtitle,
    icon: Icon,
}) {
    return (
        <Card className="shadow-md border-0">
            <CardContent className="flex items-center justify-between p-6">

                <div>

                    <p className="text-sm text-slate-500">
                        {title}
                    </p>

                    <h2 className="mt-2 text-3xl font-bold">
                        {value}
                    </h2>

                    {subtitle && (
                        <p className="mt-1 text-sm text-slate-400">
                            {subtitle}
                        </p>
                    )}

                </div>

                {Icon && (
                    <Icon
                        className="h-10 w-10 text-violet-600"
                    />
                )}

            </CardContent>
        </Card>
    );
}