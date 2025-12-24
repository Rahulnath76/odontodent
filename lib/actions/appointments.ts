"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { AppointmentStatus } from "@prisma/client";

function tranformAppoiment(appoinments: any) {
  return {
    ...appoinments,
    patientName: `${appoinments.user.firstName || ""} ${
      appoinments.user.lastName || ""
    }`.trim(),
    patientEmail: appoinments.user.email,
    doctorName: appoinments.doctor.name,
    doctorImageUrl: appoinments.doctor.imageUrl || "",
    date: appoinments.date.toISOString().split("T")[0],
  };
}

export const getAppointments = async () => {
  try {
    const appointments = await prisma.appointment.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        doctor: {
          select: {
            name: true,
            imageUrl: true,
          },
        },
      },
    });

    return appointments.map(tranformAppoiment);
  } catch (error) {
    console.log();
  }
};

export const getUserAppointment = async () => {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("You must be authenticated");

    const user = await prisma.user.findUnique({ where: { clerkId: userId } });

    if (!user) throw new Error("User not found");

    const appointments = await prisma.appointment.findMany({
      where: { userId: user.id },
      include: {
        user: { select: { firstName: true, lastName: true, email: true } },
        doctor: { select: { name: true, imageUrl: true } },
      },
      orderBy: [{ date: "asc" }, { time: "asc" }],
    });

    return appointments.map(tranformAppoiment);
  } catch (error) {
    console.log("Error fetching appointmens", error);
    throw new Error("Failed to fetch user appoinments");
  }
};

export const getUserAppointmentStats = async () => {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("You must be authenticated");

    const user = await prisma.user.findUnique({ where: { clerkId: userId } });

    if (!user) throw new Error("User not found");

    const [totalCount, completedCount] = await Promise.all([
      prisma.appointment.count({
        where: { userId: user.id },
      }),
      prisma.appointment.count({
        where: {
          userId: user.id,
          status: "COMPLETED",
        },
      }),
    ]);

    return {
      totalAppointments: totalCount,
      completedAppointments: completedCount,
    };
  } catch (error) {
    console.log("Error fetching appointment stats", error);
    return {
      totalAppointments: 0,
      completedAppointments: 0,
    };
  }
};

export async function getBookedTimeSlots(doctorId: string, date: string) {
  try {
    const appoinments = await prisma.appointment.findMany({
      where: {
        doctorId,
        date: new Date(date),
        status: {
          in: ["CONFIRMED", "COMPLETED"],
        },
      },
      select: { time: true },
    });

    return appoinments.map((appoinment) => appoinment.time);
  } catch (error) {
    console.log("error", error);
    return [];
  }
}

interface BookAppointmentInput {
  doctorId: string;
  date: string;
  time: string;
  reason?: string;
}

export async function bookAppointment(input: BookAppointmentInput) {
  try {
    const { userId } = await auth();
    if (!userId)
      throw new Error("You must be logged in to book an appointment");

    if (!input.doctorId || !input.date || !input.time) {
      throw new Error("Doctor, date and time are required");
    }
    const user = await prisma.user.findUnique({ where: { clerkId: userId } });

    if (!user)
      throw new Error(
        "User not found Please ensure your account is set up properly"
      );

    const appoinment = await prisma.appointment.create({
      data: {
        userId: user.id,
        doctorId: input.doctorId,
        date: new Date(input.date),
        time: input.time,
        reason: input.reason || "General counsultaion",
        status: "CONFIRMED",
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        doctor: {
          select: {
            name: true,
            imageUrl: true,
          },
        },
      },
    });

    return tranformAppoiment(appoinment);
  } catch (error) {
    console.error("Error booking appointment:", error);
    throw new Error("Failed to book appointment. Please try again later.");
  }
}

export async function updateAppointmentStatus(input: { id: string; status: AppointmentStatus }) {
  try {
    const appointment = await prisma.appointment.update({
      where: { id: input.id },
      data: { status: input.status },
    });

    return appointment;
  } catch (error) {
    console.error("Error updating appointment:", error);
    throw new Error("Failed to update appointment");
  }
}