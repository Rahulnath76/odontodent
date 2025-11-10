interface DoctorSelectionProps {
    seletedDentist: string | null;
    onSelectDentist: (dentistId: string) => void;
    onContinue: () => void;
}

const DoctorSelectStep = ({seletedDentist, onSelectDentist, onContinue}: DoctorSelectionProps) => {
  return (
    <div>DoctorSelectStep</div>
  )
}

export default DoctorSelectStep