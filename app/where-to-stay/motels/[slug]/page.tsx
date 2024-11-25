import React from "react";
import prisma from "@/lib/db";

const MotelById = async ({ params }) => {
  const motel = await prisma.accommodation.findUnique({
    where: { type: "MOTEL", slug: params.slug },
  });

  return (
    <div>
      <li className="list-none">
        <p>{motel?.title}</p>
        <p>{motel?.address}</p>
      </li>
    </div>
  );
};

export default MotelById;
