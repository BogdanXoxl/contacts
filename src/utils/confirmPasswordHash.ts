import bcrypt from "bcrypt";

export const confirmPasswordHash = async (plainPassword?: string, hashedPassword?: string) => {
  if (plainPassword && hashedPassword) {
    return new Promise((resolve) => {
      bcrypt.compare(plainPassword, hashedPassword, (_, res) => {
        resolve(res);
      });
    });
  }
};
