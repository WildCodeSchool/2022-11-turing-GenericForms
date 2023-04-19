import { Button, Typography } from '@mui/material';
import { useFormContext } from 'react-hook-form';


const SubmitView = () => {
  const {handleSubmit, formState} = useFormContext();

  const onSubmit = (data: any) => {
      console.log("sending form", data);
      console.log("formState errors", formState.errors);
  };

  return (
    <>
    <div>Fin du formulaire</div>
    <Button
        variant="contained"
        color="primary"
        type="submit"
        onClick={handleSubmit(onSubmit)}
        disabled={!formState.isValid}
    >
        Envoyer le formulaire
    </Button>
</>
  )
}

export default SubmitView