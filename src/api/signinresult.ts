import { User } from "./user";

export interface SignInResult {
  error: Error | null;
  newUser?: User; // newUser is present only on success
}