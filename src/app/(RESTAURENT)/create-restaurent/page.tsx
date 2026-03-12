import { api } from "@/lib/eden";

const CreateRestaurentPage = async () => {
  const res = await api.restaurent.get_restaurent.get({
    query: {
      id: "0e2iQxSq4lKfl8m0fwLChbsKW0Hc1Zmx",
    },
  });

  console.log(res);

  return <div>CreateRestaurentPage</div>;
};

export default CreateRestaurentPage;
