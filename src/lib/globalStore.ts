import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { User, Organization } from "./types";

export type StrictStoreType<T> = {
  value: T
  write: (data: T) => void,
  reset: () => void
} 

export const useUser = create<StrictStoreType<User>>()(
  devtools(
    persist(
      (set, get) => ({
        value: {
          id: "",
          email: "",
          username: "",
          role: "user",
        },

        write: (data) => {
          set((prev) => {
            return { value: { ...data } };
          });
        },

        reset: () => {
          set({ 
            value: {
              id: "",
              email: "",
              username: "",
              role: "user"
            } 
          });
        }
      }),
      {
        name: 'user-client',
        storage: createJSONStorage(() => sessionStorage)
      }
    )
  )
);

export const useOrganization = create<StrictStoreType<Organization>>()(
  devtools(
    persist(
      (set, get) => ({
        value: {
          id: "",
          members: [],
          logs: []
        },
        write: (data) => {
          set((prev) => {
            return { value: { ...data } };
          });
        },
        reset: () => {
          set({
            value: {
              id: "",
              members: [],
              logs: []
            }
          })
        }
      }),
      {
        name: 'organization',
        storage: createJSONStorage(() => sessionStorage)
      }
    )
  )
)