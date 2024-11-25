import * as Form from "@radix-ui/react-form";

import "./styles.css";
import React from "react";
import { signup } from "@/app/action/actions";
import Link from "next/link";

const AdminRegister = () => {
  return (
    <div className="adminAuth flex justify-center top-48 relative w-full gap-10">
      <Form.Root className="FormRoot w-1/4">
        <p className="text-center font-bold text-xl mb-6">Register</p>

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
            formAction={signup}
            className="Button w-full"
            style={{ marginTop: 10 }}
          >
            Register
          </button>
        </Form.Submit>
        <p className="mt-8">
          Already registered? <Link href={"/login"}>Login</Link>{" "}
        </p>
      </Form.Root>
    </div>
  );
};

export default AdminRegister;
