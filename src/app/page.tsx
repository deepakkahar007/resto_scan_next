import { api } from "@/lib/eden";

export default async function Home() {
  const data = await api.restaurent.create.post({
    name: "new resta",
    description: "         short description",
    available_tables: 2,
    cuisine_type: ["veg", "non-veg"],
    logo_url: "http://google.com",
    userId: "123",
  });

  console.log(data);

  return (
    <div>
      <h1>next js elsyai</h1>
    </div>
  );
}
