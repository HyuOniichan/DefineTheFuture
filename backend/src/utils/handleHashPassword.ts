import bcrypt from 'bcrypt';

// Note: Increase salt rounds -> Increase time to find password (prevent hacker)
const SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS || "10");

export const hashPassword = async (password: string): Promise<string> => {
    try {
        const salt = await bcrypt.genSalt(SALT_ROUNDS);
        const hashedPassword = await bcrypt.hash(password, salt);

        return hashedPassword;

    } catch (error: any) {
        throw new Error(`Failed to hash password: ${error?.message}`);
    }
}

export const matchPassword = async (inputPassword: string, correctHashedPassword: string): Promise<boolean> => {
    try {
        const isMatched = await bcrypt.compare(inputPassword, correctHashedPassword);
        return isMatched;
    } catch (error: any) {
        throw new Error(`Failed to hash password: ${error?.message}`);
    }
} 
