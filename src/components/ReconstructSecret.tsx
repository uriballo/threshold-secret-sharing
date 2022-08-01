import { Alert, Button, Container, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { useState } from "react";
import * as secrets from 'secrets.js-34r7h';

export default function ReconstructSecret() {
    const [nInputs, setNInputs] = useState<Number>();
    const [inputs, setInputs] = useState<Number[]>([]);
    const [pieces, setPieces] = useState<string[]>([]);
    const [secret, setSecret] = useState<Boolean>();
    const [construct, setConstruct] = useState<String>();

    const createInputs = () => {
        console.log(nInputs)
        if (nInputs !== undefined) {
            // meh
            let array = new Array<Number>(nInputs)
            for (let index = 0; index < array.length; index++) {
                array[index] = index + 1;

            }
            setInputs(array);
        }
    }

    const constructSecret = () => {
        const pcs = pieces.filter((item): item is string => !!item);

        const combination = secrets.combine(pcs);

        setSecret(true);
        setConstruct(secrets.hex2str(combination))
    }

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
                    id='kek'
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