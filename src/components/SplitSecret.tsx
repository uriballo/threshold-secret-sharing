import { Box, Button, Container, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import ContentCutSharpIcon from '@mui/icons-material/ContentCutSharp';
import { useState } from 'react';
import * as secrets from 'secrets.js-34r7h';

export default function SplitSecret() {
    const [secret, setSecret] = useState<string>();
    const [pieces, setPieces] = useState<number>();
    const [threshold, setThreshold] = useState<number>();
    const [shares, setShares] = useState<secrets.Shares>();

    const splitSecret = () => {
        alert(secret);
        alert(pieces);
        alert(threshold);

        if (secret !== undefined && pieces !== undefined && threshold !== undefined) {
            const secretHex = secrets.str2hex(secret);
            const varShares = secrets.share(secretHex, pieces, threshold, 1024);
            setShares(varShares);
            const comb = secrets.combine(shares!);
            alert(secrets.hex2str(comb));
        } else {
            alert('Some input is missing')
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
                        Input the number of pieces and threshold.
                    </Typography>
                    <Typography
                        color="textSecondary"
                        gutterBottom
                        variant="body2"
                    >
                        (the threshold indicates how many pieces are required to unlock the secret)
                    </Typography>
                </Box>

                <TextField
                    fullWidth
                    label='Secret'
                    margin='normal'
                    variant='outlined'
                    onChange={(e) => setSecret(e.target.value)}
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
                    onChange={(e) => setPieces(Number(e.target.value))}
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
                    onChange={(e) => setThreshold(Number(e.target.value))}
                />

                <Box sx={{ py: 2 }}>
                    <Button
                        color="inherit"
                        fullWidth
                        size="large"
                        onClick={splitSecret}
                        variant="outlined"
                        endIcon={<ContentCutSharpIcon />}
                    >
                        Split
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