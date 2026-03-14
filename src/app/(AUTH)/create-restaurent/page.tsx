// import { api } from "@/lib/eden";

import CreateRestaurentProfileForm from "@/components/forms/CreateRestaurentProfileForm";

const CreateRestaurentPage = async () => {
  // const res = await api.restaurent.get_restaurent.get({
  //   query: {
  //     id: "0e2iQxSq4lKfl8m0fwLChbsKW0Hc1Zmx",
  //   },
  // });

  // console.log(res);

  return (
    <div>
      <CreateRestaurentProfileForm />
    </div>
  );
};

export default CreateRestaurentPage;
