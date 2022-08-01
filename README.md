# Shamir's Threshold Secret Sharing Web App

Implementation of the [STSS](https://en.wikipedia.org/wiki/Shamir%27s_Secret_Sharing) workflow using react and the [secrets.js](https://www.npmjs.com/package/secrets.js-34r7h/v/2.0.0) library.

The app has two *modes*: split and build. The former is used to split a secret (text) into pieces and the former for reconstructing the secret.

## Split Mode
Splits the secret in shares using the following parameters:
* Secret: `string` to 'encrypt'.
* Pieces: number of shares to create.
* Threshold: number of pieces required to reconstruct the secret, [2, numPieces-1].

## Build Mode
Combines shares to construct the secret (will be correct iff the threshold is reached).
* Pieces: number of shares used as input.
* Button 1: create fields to input shares.
* Button 2: reconstruct secret from shares.
