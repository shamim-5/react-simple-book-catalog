import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { userLoggedIn } from "./authSlice";
import { auth } from "@/lib/firebase";
import { apiSlice } from "@/redux/api/apiSlice";

interface IData {
  email: string;
  password: string;
}

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: () => ({}),
      async onQueryStarted(arg: IData, { dispatch }) {
        const { email, password } = arg;
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        const user = userCredential?.user;
        const idToken = await user.getIdToken();
        try {
          localStorage.setItem(
            "auth",
            JSON.stringify({
              accessToken: idToken,
              user: user?.email,
            })
          );

          dispatch(userLoggedIn({ accessToken: idToken, user: user?.email }));
        } catch (err) {
          // do nothing
        }
      },
    }),
    login: builder.mutation({
      query: () => ({}),
      async onQueryStarted(arg: IData, { dispatch }) {
        const { email, password } = arg;
        const userCredential = await signInWithEmailAndPassword(auth, email, password);

        const user = userCredential?.user;
        const idToken = await user.getIdToken();
        try {
          localStorage.setItem(
            "auth",
            JSON.stringify({
              accessToken: idToken,
              user: user?.email,
            })
          );

          dispatch(userLoggedIn({ accessToken: idToken, user: user?.email }));
        } catch (err) {
          // do nothing
        }
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
