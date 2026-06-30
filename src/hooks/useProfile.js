import { useEffect, useState } from "react";

import { getProfile } from "@/services/student/profileService";

export function useProfile() {

    const [profile, setProfile] = useState({});

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function loadProfile() {

            try {

                const data = await getProfile();

                setProfile(data);

            } finally {

                setLoading(false);

            }

        }

        loadProfile();

    }, []);

    return {

        profile,

        loading,

    };

}