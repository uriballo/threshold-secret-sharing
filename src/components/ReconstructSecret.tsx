import { Button, Container, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined';

export default function ReconstructSecret() {

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
                        Input the secret pieces.
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
                    label='Secret'
                    margin='normal'
                    variant='outlined'
                //  onChange={(e) => setSecret(e.target.value)}
                />
                <TextField
                    fullWidth
                    label='Pieces'
                    margin='normal'
                    type='number'
                    variant='outlined'
                    InputProps={{
                        inputProps: {
                            max: 10, min: 0
                        }
                    }}
                //  onChange={(e) => setPieces(Number(e.target.value))}
                />
                <TextField
                    fullWidth
                    label='Threshold'
                    margin='normal'
                    type='number'
                    InputProps={{
                        inputProps: {
                            max: 10, min: 2
                        }
                    }}
                    variant='outlined'
                //  onChange={(e) => setThreshold(Number(e.target.value))}
                />

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