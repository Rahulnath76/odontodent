Here is a professional and comprehensive `README.md` file for your **OdontoVoice** project, based on the analyzed architecture and source code.

---

# 🦷 OdontoVoice

OdontoVoice is a modern, AI-powered dental practice management platform built with **Next.js 15/16**. It combines traditional healthcare scheduling with a cutting-edge **AI Voice Assistant** to provide patients with real-time dental advice and a seamless booking experience.

## ✨ Key Features

* **🎙️ AI Dental Assistant**: Real-time voice conversations powered by **Vapi.ai** to answer patient questions and provide guidance.
* **📅 Intelligent Booking**: A multi-step appointment scheduling system with real-time availability checking and automated time-slot validation.
* **👤 Automated User Sync**: Seamless integration with **Clerk Auth** that automatically synchronizes user profiles with the local database upon login.
* **📧 Automated Confirmations**: Instant email notifications sent via **Resend** whenever an appointment is booked.
* **👨‍⚕️ Admin Management**: Dedicated dashboard for practice owners to manage doctors, update availability, and track appointment statistics.
* **📊 Patient Dashboard**: Personalized view for users to track upcoming visits and overall dental health activity.

## 🚀 Tech Stack

* **Framework**: [Next.js 15/16](https://nextjs.org/) (App Router)
* **Language**: [TypeScript](https://www.typescriptlang.org/)
* **Authentication**: [Clerk](https://clerk.com/)
* **Database & ORM**: [PostgreSQL](https://www.postgresql.org/) & [Prisma](https://www.prisma.io/)
* **AI Voice**: [Vapi.ai](https://vapi.ai/)
* **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) & [Radix UI](https://www.radix-ui.com/)
* **Emails**: [Resend](https://resend.com/)

## 🛠️ Getting Started

### Prerequisites

* Node.js 20+
* A PostgreSQL database (e.g., Supabase or Neon)
* API Keys for Clerk, Vapi, and Resend

### Installation

1. **Clone the repository**:
```bash
git clone https://github.com/your-username/odontovoice.git
cd odontovoice

```


2. **Install dependencies**:
```bash
npm install

```


3. **Environment Variables**:
Create a `.env` file in the root directory and add the following:
```env
DATABASE_URL="your_postgresql_url"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
RESEND_API_KEY=
NEXT_PUBLIC_VAPI_API_KEY=
NEXT_PUBLIC_VAPI_ASSISTANT_ID=

```


4. **Database Setup**:
```bash
npx prisma generate
npx prisma db push

```


5. **Run the development server**:
```bash
npm run dev

```



## 📂 Project Structure

* `/app`: Next.js App Router pages and API routes.
* `/components`: Reusable UI components including the `VapiWidget` and Landing Page sections.
* `/lib`: Server-side actions and utility configurations (Prisma, Resend, Vapi).
* `/hooks`: Custom React hooks for managing appointments and UI state.
* `/prisma`: Database schema and migrations.

## 📝 Database Schema

The core data model includes:

* **User**: Profiles linked via `clerkId`.
* **Doctor**: Professional details, specialties, and active status.
* **Appointment**: Linked records containing dates, times, and statuses (`CONFIRMED`, `COMPLETED`, `CANCELED`).

## 🤝 Contributing

1. Fork the project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

*Created for the OdontoVoice Project.*