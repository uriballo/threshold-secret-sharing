import { Alert, Button, Container, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { useState } from "react";
import * as secrets from 'secrets.js-34r7h';

export default function ReconstructSecret() {
    /**
     * Holds the number of input fields needed.
     */
    const [nInputs, setNInputs] = useState<Number>();

    /**
     * Holds an array (w/ trivial contents) of size 'nInputs'.  
     */
    const [inputs, setInputs] = useState<Number[]>([]);

    /**
     * Holds an array w/ the content of each of the created input fields.
     */
    const [pieces, setPieces] = useState<string[]>([]);

    /**
     * Holds a boolean that indicates if a secret has been constructed. 
     * Used to show 'notification'.
     */
    const [secret, setSecret] = useState<Boolean>();

    /**
     * Holds the constructed secret.
     */
    const [construct, setConstruct] = useState<String>();

    /**
     * Creates a trivial array of size 'nInputs' and stores it in the state variable
     * 'inputs', which will be used to render 'nInputs' text fields.
     */
    const createInputs = () => {
        if (nInputs !== undefined) {
            // meh
            let array = new Array<Number>(nInputs)
            for (let index = 0; index < array.length; index++) {
                array[index] = index + 1;

            }
            setInputs(array);
        }
    }

    /**
     * Constructs the secret using the inputs from the creted text fields.  
     */
    const constructSecret = () => {
        const pcs = pieces.filter((item): item is string => !!item); // Pick elements that are not undefined.
        const combination = secrets.combine(pcs);

        setSecret(true);
        setConstruct(secrets.hex2str(combination))
    }

    /**
     * Closes the notification created when a secret is constructed. 
     */
    const closeNoti = () => {
        setSecret(false);
    }

    return (
        <Box
            component="main"
            sx={{
                alignItems: 'center',
                display: 'flex',
                flexGrow: 1,
                minHeight: '100%'
            }}
        >
            <Container maxWidth="sm">
                <Box sx={{ my: 3 }}>
                    <Typography
                        color="textPrimary"
                        variant="h4"
                    >
                        Shamir's Threshold Secret Sharing Scheme
                    </Typography>
                    <Typography
                        color="textSecondary"
                        gutterBottom
                        variant="body2"
                    >
                        Input the number of pieces.
                    </Typography>
                    <Typography
                        color="textSecondary"
                        gutterBottom
                        variant="body2"
                    >
                        (the secret will be reconstructed correctly iff the threshold is reached)
                    </Typography>
                </Box>
                <TextField
                    id='dsfg'
                    fullWidth
                    label='Pieces'
                    margin='normal'
                    type='number'
                    InputProps={{
                        inputProps: {
                            max: 10, min: 2
                        }
                    }}
                    onChange={(e) => setNInputs(Number(e.target.value))}
                />

                <Box sx={{ py: 2 }}>
                    <Button
                        color="inherit"
                        fullWidth
                        size="large"
                        onClick={createInputs}
                        variant="outlined"
                        endIcon={<AddBoxOutlinedIcon />}
                    >

                    </Button>
                </Box>
                {inputs && inputs.map(item =>
                    <TextField
                        //key={Math.random()}
                        fullWidth
                        //type='text'
                        label={'Piece #' + item}
                        margin='normal'
                        onBlur={(e) => {
                            setPieces((prev) => {
                                const updated = [...prev];
                                updated[item.valueOf()] = e.target.value;
                                return updated;
                            })
                        }}>
                    </TextField>)}
                {inputs &&
                    <Box sx={{ py: 2 }}>
                        <Button
                            color="inherit"
                            fullWidth
                            size="large"
                            onClick={constructSecret}
                            variant="outlined"
                            endIcon={<EngineeringOutlinedIcon />}
                        >
                            Build
                        </Button>
                    </Box>
                }
                <Typography
                    color="textSecondary"
                    variant="body2"
                >
                    Click the toggle at the top to switch modes.
                </Typography>
                <br />
                {secret &&
                    <Alert severity="info" onClose={closeNoti}>Reconstructed Secret: {construct}</Alert>}
            </Container>
        </Box>
    );
}