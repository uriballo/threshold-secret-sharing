import { Button, Container, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { useState } from "react";

export default function ReconstructSecret() {
    const [nInputs, setNInputs] = useState<Number>();
    const [inputs, setInputs] = useState<Number[]>([]);
    const [pieces, setPieces] = useState<string[]>([]);
    const [secret, setSecret] = useState<string>();

    const createInputs = () => {
        console.log(nInputs)
        if (nInputs !== undefined) {
            let array = new Array<Number>(nInputs)
            for (let index = 0; index < array.length; index++) {
                array[index] = index + 1;

            }
            setInputs(array);
        }

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
                        (the secret will be reconstructed corrected iff the threshold is reached)
                    </Typography>
                </Box>
                <TextField
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
                        fullWidth
                        label={'Piece #' + item}
                        margin='normal'
                        onChange={(e) => setPieces([...pieces, e.target.value])}>
                    </TextField>)}
                {inputs &&
                    <Box sx={{ py: 2 }}>
                        <Button
                            color="inherit"
                            fullWidth
                            size="large"
                            //  onClick={splitSecret}
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
            </Container>
        </Box>
    );
}