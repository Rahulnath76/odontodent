"use client";

import { createDoctor, getDoctor, updateDoctor } from "@/lib/actions/doctors";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useGetDoctors() {
    const result = useQuery({
        queryKey: ['getDoctors'],
        queryFn: getDoctor,
    });

    return result;
}

export function useCreateDoctor() {
    const queryClient = useQueryClient();
    const result = useMutation({
    mutationFn: createDoctor,
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['getDoctors'] });
    },
    onError: (error: any) => {
        console.error("Error creating doctor:", error);
        throw error;
    }});

    return result;
}

export function useUpdateDoctor() {
    const queryClient = useQueryClient();
    const result = useMutation({
    mutationFn: updateDoctor,
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['getDoctors'] });
    },
    onError: (error: any) => {
        console.error("Error creating doctor:", error);
        throw error;
    }});

    return result;
}