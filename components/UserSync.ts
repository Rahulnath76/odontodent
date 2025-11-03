"use client";

import { syncUser } from "@/lib/actions/users";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

function UserSync() {
  const { isSignedIn, isLoaded } = useUser();

  useEffect(() => {
    const handleSync = async () => {
        if(isLoaded && isSignedIn) {
            try{
                await syncUser();
            }
            catch (error) {
                console.error("User sync failed:", error);
            }
        }
    }

    handleSync();
  }, [isLoaded, isSignedIn]);

  return null;
}

export default UserSync;