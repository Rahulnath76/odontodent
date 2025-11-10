"use client";

import ProgressSteps from '@/components/appoinments/ProgressSteps';
import Navbar from '@/components/Navbar';
import { useState } from 'react'

const AppointmentPage = () => {
    const [seletedDentist, setSeletedDentist] = useState<string | null>();
    const [selectedDate, setSeletedDate] = useState("");
    const [selectedTime, setSeletedTime] = useState("");
    const [selectedType, setSeletedType] = useState("");
    const [currentStep, setCurrentStep] = useState(1);
    const [showConfirmatioModel, setShowConfirmatioModel] = useState(false);
    const [bookAppointment, setBookAppointment] = useState<any>(null);


    const handleSelectDentist = (dentistId: string) => {
        setSeletedDentist(dentistId);

        setSeletedDate("");
        setSeletedTime("");
        setSeletedType("");
    };
    const handleBookAppointment = async () => {}
  return (
    <>
        <Navbar />

        <div className='max-w-7xl mx-auto px-6 py-8 pt-24'>
            <div className='mb-8'>
                <h1 className='text-3xl font-bold mb-2'>Book an Appointment</h1>
                <p className='text-muted-foreground'>Find and book with verified dentists in your area</p>
            </div>

            <ProgressSteps currentStep={currentStep}/>
            
            {currentStep === 1 && (
            <DoctorSelectStep 
                selectedDentistId={seletedDentist}
                onSelectDentist={handleSelectDentist}
                onContinue={() => setCurrentStep(2)}
            />)}
        </div>
    </>
  )
}

export default AppointmentPage;
