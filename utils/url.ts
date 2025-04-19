import * as Crypto from "expo-crypto";

const getGravatarUrl = async (email: string, size: number = 80) => {
    const normalizedEmail = email.trim().toLowerCase();
    const hash = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        normalizedEmail,
        {
            encoding: Crypto.CryptoEncoding.HEX,
        },
    );

    return `https://www.gravatar.com/avatar/${hash}?s={size}&d=identicon`;
};

export { getGravatarUrl };
