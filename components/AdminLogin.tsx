import * as Form from "@radix-ui/react-form";

import "./styles.css";
import React from "react";
import { login } from "@/app/action/actions";
import Link from "next/link";

const AdminLogin = () => {
  return (
    <div className="adminAuth flex justify-center relative top-48 w-full gap-10">
      <Form.Root className="FormRoot w-1/4">
        <p className="text-center font-bold text-xl mb-6">Login</p>

        <Form.Field className="FormField" name="email">
          <Form.Label className="FormLabel">Email</Form.Label>
          <Form.Message className="FormMessage" match="valueMissing">
            Please enter your email
          </Form.Message>
          <Form.Message className="FormMessage" match="typeMismatch">
            Please provide a valid email
          </Form.Message>

          <Form.Control asChild>
            <input className="Input" type="email" required />
          </Form.Control>
        </Form.Field>

        <Form.Field className="FormField" name="password">
          <Form.Label className="FormLabel">Password</Form.Label>
          <Form.Message className="FormMessage" match="valueMissing">
            Please enter your password
          </Form.Message>
          <Form.Message className="FormMessage" match="typeMismatch">
            Please provide a valid password
          </Form.Message>

          <Form.Control asChild>
            <input className="Input" type="password" required />
          </Form.Control>
        </Form.Field>
        <Form.Submit asChild>
          <button
            formAction={login}
            className="Button w-full"
            style={{ marginTop: 10 }}
          >
            Login
          </button>
        </Form.Submit>
        <p className="mt-8">
          No Account? <Link href={"/admin-register"}>Sign up</Link>{" "}
        </p>
      </Form.Root>
    </div>
  );
};

export default AdminLogin;
