import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const data = [
  {
    title: "Revenue",
    description: "total revenue this month",
    value: "23,000",
  },
  {
    title: "Orders",
    description: "total orders this month",
    value: "78",
  },
  {
    title: "Menu Items",
    description: "total Menu Items",
    value: "13",
  },
  {
    title: "Table",
    description: "total table available",
    value: "7",
  },
];

const OverviewCard = () => {
  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-4 mb-2">
      {data.map((val, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>{val.title}</CardTitle>
            <CardDescription>{val.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{val.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default OverviewCard;
