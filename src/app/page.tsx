import { api } from "@/lib/eden";

export default async function Home() {
  const data = await api.restaurent.get();

  console.log(data);

  return (
    <div>
      <h1>next js elsyai</h1>
    </div>
  );
}
