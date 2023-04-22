import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { Button, MobileStepper } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import theme from "../../styles/theme";
import { FormContext } from "./Questions/Questions";

interface StepperProps {
  questionNumber: number | undefined;
  questionId: number;
}

const Stepper = ({questionNumber, questionId}: StepperProps) => {
  const { activeStepIndex, setActiveStepIndex } = useContext(FormContext);
  const maxSteps = (questionNumber || 0) + 1;
  const {formState: {errors}, trigger, watch} = useFormContext();
  const [isValid, setIsValid] = React.useState(true);

  const fetchTrigger = async () => {
    setIsValid(await trigger(`${questionId}`));
  };

  useEffect(() => {
    console.log('questionId', questionId)
    fetchTrigger();
  }, [watch(`${questionId}`)]);

  const handleNext = () => {
      //work with this questionId to trigger validation (if '1' is less than 15 characters, it will return false)
      if(isValid) setActiveStepIndex((prevActiveStep) => prevActiveStep + 1);
  };
  const handlePrevious = () => {
    setActiveStepIndex((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <MobileStepper
      variant="progress"
      steps={maxSteps}
      position="static"
      activeStep={activeStepIndex}
      sx={{ maxWidth: 400, flexGrow: 1 }}
      nextButton={
        <Button size="small" onClick={handleNext} disabled={(activeStepIndex === maxSteps - 1) || !isValid}>
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