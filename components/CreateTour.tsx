import React from "react";
import * as Form from "@radix-ui/react-form";
import "./styles.css";
import { createTourism } from "@/app/actions/createTour-actions";

const CreateWhatToDo = () => {
  return (
    <div className=" w-full flex flex-col items-center justify-center">
      <div className="my-8 font-bold text-xl">Create New Tourism</div>
      <Form.Root
        action={createTourism}
        className="FormRoot  w-1/3 flex flex-col"
      >
        <Form.Field className="FormField" name="title">
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <Form.Label className="FormLabel"> Title</Form.Label>
            <Form.Message className="FormMessage" match="valueMissing">
              Please enter title
            </Form.Message>
          </div>

          <Form.Control asChild>
            <input placeholder="Enter Title" className="Input" />
          </Form.Control>
        </Form.Field>

        <Form.Field className="FormField" name="address">
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            {" "}
            <Form.Label className="FormLabel"> Address</Form.Label>
            <Form.Message className="FormMessage" match="valueMissing">
              Please enter address
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input placeholder="Enter Address" className="Input" />
          </Form.Control>
        </Form.Field>

        <Form.Field className="FormField" name="localGovt">
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            {" "}
            <Form.Label className="FormLabel"> Local Govt</Form.Label>
            <Form.Message className="FormMessage" match="valueMissing">
              Please enter Local Govt
            </Form.Message>
          </div>

          <Form.Control asChild>
            <input placeholder="Enter Local Govt" className="Input" />
          </Form.Control>
        </Form.Field>
        <Form.Field className="FormField" name="description">
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            {" "}
            <Form.Label className="FormLabel">Description</Form.Label>
            <Form.Message className="FormMessage" match="valueMissing">
              Please enter short description
            </Form.Message>
          </div>

          <Form.Control asChild>
            <textarea placeholder="Enter Description" className="Textarea" />
          </Form.Control>
        </Form.Field>
        <div className="flex w-full justify-center gap-4 my-2">
          <select name="category" className="border p-2 w-full">
            <option value="">Select Category</option>
            <option value="ACCOMMODATION">Accommodation</option>
            <option value="TOURISM">Tourism</option>
            <option value="NIGHTLIFE">Nightlife</option>
            <option value="SHOPPING">Shopping</option>
            <option value="FOOD_DRINK">Food & Drink</option>
          </select>
        </div>
        <input
          className="my-2"
          type="file"
          name="images"
          accept="image/*"
          required
          multiple
        />
        <button type="submit" className="Button mt-4">
          CREATE
        </button>
      </Form.Root>
    </div>
  );
};

export default CreateWhatToDo;
