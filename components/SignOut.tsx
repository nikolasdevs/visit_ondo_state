import { signOut } from "@/app/action/actions";
import React from "react";

const SignOut = () => {
  return (
    <form>
      <button className=" cursor-pointer" formAction={signOut}>
        Sign Out
      </button>
    </form>
  );
};

export default SignOut;
