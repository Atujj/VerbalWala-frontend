import { Card, CardContent } from "@/components/ui/card";
import { User } from "lucide-react";

import { useProfile } from "@/hooks/useProfile";

export default function Profile() {

    const { profile, loading } = useProfile();

    if (loading) {
        return <p>Loading...</p>;
    }

    return (

        <Card className="max-w-xl mx-auto">

            <CardContent className="p-8">

                <div className="flex flex-col items-center">

                    <div className="h-20 w-20 rounded-full bg-violet-100 flex items-center justify-center">

                        <User className="h-10 w-10 text-violet-700" />

                    </div>

                    <h2 className="mt-4 text-2xl font-semibold">
                        Admin Profile
                    </h2>

                </div>

                <div className="mt-8 space-y-6">

                    <div>

                        <p className="text-sm text-slate-500">
                            Name
                        </p>

                        <p className="text-lg font-medium">
                            {profile.name}
                        </p>

                    </div>

                    <div>

                        <p className="text-sm text-slate-500">
                            Email
                        </p>

                        <p className="text-lg font-medium">
                            {profile.email}
                        </p>

                    </div>

                    <div>

                        <p className="text-sm text-slate-500">
                            Role
                        </p>

                        <p className="text-lg font-medium">
                            Administrator
                        </p>

                    </div>

                </div>

            </CardContent>

        </Card>

    );

}