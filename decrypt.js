import { readFileSync } from 'fs';
import crypto from 'crypto';

export const privateKey = readFileSync('private.pem');
export const publicKey = readFileSync('public.pem');

export async function decrypt(data) {
  try {
    const bufferData = Buffer.from(data, 'base64');
    const decryptedData = crypto.privateDecrypt(
      {
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256',
      },
      bufferData
    );
    return decryptedData.toString('utf8');
  } catch (error) {
    console.error(error);
    throw new Error(
      JSON.stringify({
        message: 'Failed to decrypt data. Ensure encrypted data is valid.',
        error: error.message,
      })
    );
  }
}

const password = await decrypt('WOVYiRHOYnE9t+idjP1Gpchhosp/W+FY3PSRzgLLrxRY6Zs53HCT0Sci5F5MtGJS2A0RstRxfCwW27dVsQc5LaIGM6OG6wA5H/ytZwHrKzg51ujGTZBtmANBpa1W6gDMv589k7xl1mAR/SA3h8VkL+ontMQDOCncg7G6dD5ORDLdK5HhxbZELIbL2bsh/L08yVGTD9IVzlc1BK1js1hd1GNTmRkl/es1pclP8crlFMinImc/81qdbU6rJ+Qm9X4Uiu5V3uiIJMG/p6YirA9DgIgyKQStPKstiUjy+Jl0VwuhTtk6yRzpwp7s7U78EHE+MO42t3YbE8LwUz+Y2sSNlQ==')
console.log(password)

