"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

function tranformaAppoiment(appoinments: any){
    return {
        ...appoinments,
        patientName: `${appoinments.user.firstName || ""} ${appoinments.user.lastName || ""}`.trim(),
        patientEmail: appoinments.user.email,
        doctorName: appoinments.doctor.name,
        doctorImageUrl: appoinments.doctor.imageUrl || "",
        date: appoinments.date.toISOString().split("T")[0]
    };
}

export const getAppointments = async () => {
    try{
        const appointments = await prisma.appointment.findMany({
            orderBy: { createdAt: "desc" },
            include: {
                user: {
                    select: {
                        firstName: true,
                        lastName: true,
                        email: true
                    }
                },
                doctor: {
                    select: {
                        name: true,
                        imageUrl: true,
                    }
                }
            }
        });

        return appointments;
    }
    catch (error) {
        console.log()
    }
}

export const getUserAppointment = async () =>{
    try {
        const { userId } = await auth();
        if(!userId) throw new Error("You must be authenticated");

        const user = await prisma.user.findUnique({where:{clerkId: userId}});

        if(!user) throw new Error("User not found");

        const appointments = await prisma.appointment.findMany({
            where: {userId: user.id},
            include: {
                user: { select: {firstName: true, lastName: true, email: true} },
                doctor: {select: {name: true, imageUrl: true }},
            },
            orderBy: [{date: "asc"}, {time: "asc"}]
        });

        return appointments.map(tranformaAppoiment);
    } catch (error) {
        console.log("Error fetching appointmens", error);
        throw new Error("Failed to fetch user appoinments");
    }
}

export const getUserAppointmentStats = async () => {
    try{
        const { userId } = await auth();
        if(!userId) throw new Error("You must be authenticated");

        const user = await prisma.user.findUnique({where:{clerkId: userId}});

        if(!user) throw new Error("User not found")

        const [totalCount, completedCount] = await Promise.all([
            prisma.appointment.count({
                where: {userId: user.id}
            }),
            prisma.appointment.count({
                where:{
                    userId: user.id,
                    status: "COMPLETED",
                },
            }),
        ]);

        return {
            totalAppointments: totalCount,
            completedAppointments: completedCount
        }
    } catch(error){
        console.log("Error fetching appointment stats", error);
        return {
            totalAppointments: 0,
            completedAppointments: 0
        }
    }
}