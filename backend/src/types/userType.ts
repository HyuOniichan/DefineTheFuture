import type { ISetting, IUser } from "./databaseSchema";

export interface UserType extends 
Omit<IUser, "user_id">, 
Omit<ISetting, "setting_id"> {
    
}
