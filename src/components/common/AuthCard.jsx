import { Card, CardContent } from "@/components/ui/card";

export default function AuthCard({ children }) {
    return (
        <Card className="w-full max-w-md shadow-xl border-0 rounded-2xl">
            <CardContent className="p-8">
                {children}
            </CardContent>
        </Card>
    );
}