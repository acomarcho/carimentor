import { atom } from "jotai";
import { User, Tag } from "../constants/responses";

export const userAtom = atom<User | undefined>(undefined);
export const userTagsAtom = atom<Tag[] | undefined>(undefined);
