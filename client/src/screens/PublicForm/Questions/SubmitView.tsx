import { Button, Grid, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

interface Props {
  formId: number;
};

const SubmitView = ({formId}: Props) => {
  const {handleSubmit, formState: {errors, isSubmitting, isValid}, reset} = useFormContext();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
      await new Promise(async (resolve) => {
        await setTimeout(() => {
          console.log("sending form", data);
          console.log("formState errors", errors);
          resolve(undefined);
        }, 3000);
      });
  };

  const handleReset = async (data: any) => {
    reset();
    navigate(`/form/${formId}`);
  };

  useEffect(() => {
      console.log("formState.errors =>", errors);
  }, [errors]);

  return (
    <Grid container sx={{minHeight: '20vh'}} direction={'column'} justifyContent='space-around' alignContent='center'>
      <Grid item xs={12}>
        <Typography variant='h4' align='center'>Merci d'avoir complété ce formulaire !</Typography>
      </Grid>
      <Grid item xs={8} sx={{margin: 'auto'}}>
        <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={handleSubmit(onSubmit)}
            disabled={!isValid}
        >
            Envoyer le formulaire
        </Button>
      </Grid>
      <Grid item xs={8} sx={{margin: 'auto'}}>
        <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={handleReset}
        >
            Envoyer un nouveau formulaire
        </Button>
      </Grid>
      <Grid item xs={12}>
        {/* show a generic error message if any of the fields are invalid */}
        <Typography>
            {Object.keys(errors).length > 0 && (
                "Error"
            )}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        {/* loader to style + we should disabled the sending button while sending the form */}
        {isSubmitting && (
            <Typography>
                Envoi du formulaire...
            </Typography>
        )}
      </Grid>
    </Grid>
  )
}

export default SubmitView