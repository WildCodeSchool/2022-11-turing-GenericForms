import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { Button, MobileStepper } from "@mui/material";
import React, { useContext } from "react";
import theme from "../../styles/theme";
import { FormContext } from "./Questions/Questions";

interface StepperProps {
  questionNumber: number | undefined;
}

const Stepper = ({questionNumber}: StepperProps) => {
  const { activeStepIndex, setActiveStepIndex } = useContext(FormContext);

  const handleNext = () => {
    setActiveStepIndex((prevActiveStep) => prevActiveStep + 1);
  };
  const handlePrevious = () => {
    setActiveStepIndex((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <MobileStepper
      variant="progress"
      steps={questionNumber || 0}
      position="static"
      activeStep={activeStepIndex}
      sx={{ maxWidth: 400, flexGrow: 1 }}
      nextButton={
        <Button size="small" onClick={handleNext} disabled={activeStepIndex === ((questionNumber || 1) - 1)}>
          Suivant
          {theme.direction === 'rtl' ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </Button>
      }
      backButton={
        <Button size="small" onClick={handlePrevious} disabled={activeStepIndex === 0}>
          {theme.direction === 'rtl' ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
          Précédent
        </Button>
      }
    />
  );
}

export default Stepper;