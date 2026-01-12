import { redirect } from "next/navigation";

export default function Home() {
  redirect("/user-app/landing");
  return null;
}
