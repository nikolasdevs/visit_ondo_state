import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import SignOutButton from "@/components/SignOut";
import CreateAcc from "@/components/CreateAcc";

export default async function PrivatePage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <>
      <div className="lg:w-full relative top-20 lg:right-0  z-[10000000]">
        <div className="flex items-center justify-between w-full  max-w-7xl  relative py-4 mx-auto px-8">
          <p>Hello {data.user.email}</p>
          <SignOutButton />
        </div>
        <CreateAcc supabase={supabase} user={data.user} redirect={redirect} />
      </div>{" "}
    </>
  );
}
