"use server";

import { prisma } from "@/lib/prisma";
import { Gender } from "@prisma/client";
import { generateAvatar } from "../utils";
import { revalidatePath } from "next/cache";

export const getDoctor = async () => {
   try {
    const doctors = await prisma.doctor.findMany({
        include: {
            _count: { select: { appointments: true } }
        },
        orderBy: { createdAt: "desc" }
    })
    return doctors.map(doctor => ({
        ...doctor,
        totalAppointments: doctor._count.appointments
    })
    );
   } catch (error) {
    console.error("Error fetching doctor stats:", error);
    throw error;
   }

};

interface CreateDoctorInput {
    name: string;
    email: string;
    phone: string;
    specialty: string
    gender: Gender;
    isActive: boolean;
}

export const createDoctor = async (input: CreateDoctorInput) => {

    try {
        if (!input.name || !input.email) {
            throw new Error("Name and Email are required");
        }

        const doctor = await prisma.doctor.create({
            data: {
                ...input,
                imageUrl: generateAvatar(input.name, input.gender),
            }
        });
        revalidatePath("/admin");

        return doctor;
    }
    catch (error: any) {
        console.error("Error creating doctor:", error);
        
        if(error?.code === "P2002") {
            throw new Error("A doctor with this email already exists.");
        }

        throw error;
    }
}

interface UpdateDoctorInput extends Partial<CreateDoctorInput> {
    id: string;
}

export const updateDoctor = async (input: UpdateDoctorInput) => {
    try {
        if(!input.name || !input.email) throw new Error("Name and Email are required");

        const currentDoctor = await prisma.doctor.findUnique({
            where: { id: input.id },
            select: { email: true }
        });

        if(!currentDoctor) throw new Error("Doctor not found");

        if(currentDoctor.email !== input.email) {
            const emailExists = await prisma.doctor.findUnique({
                where: { email: input.email! }
            });
            if(emailExists) {
                throw new Error("A doctor with this email already exists.");
            }
        }

        const doctor = await prisma.doctor.update({
            where: { id: input.id },
            data: {
                name: input.name,
                email: input.email,
                phone: input.phone,
                specialty: input.specialty,
                gender: input.gender,
                isActive: input.isActive,
            }
        }); 

        return doctor;
    } catch (error) {
        console.error("Error updating doctor:", error);
        throw error;
    }
}