"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// --- Dummy Data ---
type OrderItem = {
  name: string;
  quantity: number;
  price: number;
};

type Order = {
  id: string;
  amount: number;
  createdAt: string;
  status: "Pending" | "Preparing" | "Ready" | "Completed" | "Cancelled";
  paidBy: "Cash" | "Card" | "UPI";
  items: OrderItem[];
  subtotal: number;
  gst: number;
};

const DUMMY_ORDERS: Order[] = [
  {
    id: "ORD-1001",
    amount: 1250,
    createdAt: "2024-03-12 18:30",
    status: "Completed",
    paidBy: "UPI",
    subtotal: 1100,
    gst: 150,
    items: [
      { name: "Margherita Pizza", quantity: 2, price: 300 },
      { name: "Garlic Bread", quantity: 1, price: 150 },
      { name: "Coca Cola", quantity: 2, price: 100 },
      { name: "Chocolate Lava Cake", quantity: 1, price: 150 },
    ],
  },
  {
    id: "ORD-1002",
    amount: 450,
    createdAt: "2024-03-12 18:45",
    status: "Preparing",
    paidBy: "Card",
    subtotal: 400,
    gst: 50,
    items: [
      { name: "Pasta Alfredo", quantity: 1, price: 350 },
      { name: "Sprite", quantity: 1, price: 50 },
    ],
  },
  {
    id: "ORD-1003",
    amount: 2100,
    createdAt: "2024-03-12 19:10",
    status: "Pending",
    paidBy: "Cash",
    subtotal: 1900,
    gst: 200,
    items: [
      { name: "Chicken Tikka Masala", quantity: 2, price: 450 },
      { name: "Butter Naan", quantity: 4, price: 60 },
      { name: "Jeera Rice", quantity: 1, price: 200 },
      { name: "Gulab Jamun", quantity: 2, price: 150 },
      { name: "Fresh Lime Soda", quantity: 3, price: 120 },
    ],
  },
  {
    id: "ORD-1004",
    amount: 850,
    createdAt: "2024-03-12 19:20",
    status: "Ready",
    paidBy: "UPI",
    subtotal: 750,
    gst: 100,
    items: [
      { name: "Veg Burger Combo", quantity: 2, price: 250 },
      { name: "Oreo Shake", quantity: 1, price: 250 },
    ],
  },
  {
    id: "ORD-1005",
    amount: 320,
    createdAt: "2024-03-12 19:35",
    status: "Cancelled",
    paidBy: "Cash",
    subtotal: 280,
    gst: 40,
    items: [
      { name: "French Fries", quantity: 1, price: 150 },
      { name: "Cold Coffee", quantity: 1, price: 130 },
    ],
  },
];

const getStatusColor = (status: Order["status"]) => {
  switch (status) {
    case "Completed":
      return "text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400";
    case "Preparing":
      return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400";
    case "Ready":
      return "text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400";
    case "Pending":
      return "text-orange-600 bg-orange-100 dark:bg-orange-900/30 dark:text-orange-400";
    case "Cancelled":
      return "text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400";
    default:
      return "text-gray-600 bg-gray-100 dark:bg-gray-800 dark:text-gray-400";
  }
};

export function OrdersDisplay() {
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const selectedOrder = DUMMY_ORDERS.find(
    (order) => order.id === selectedOrderId,
  );

  return (
    <div className="flex h-[calc(100vh-6rem)] w-full gap-4">
      {/* Left Panel: Orders List (40%) */}
      <div className="w-[40%] h-full flex flex-col gap-3 overflow-y-auto pr-2 pb-4">
        <h2 className="text-xl font-bold tracking-tight mb-2">Recent Orders</h2>
        {DUMMY_ORDERS.map((order) => {
          const isSelected = order.id === selectedOrderId;
          return (
            <Card
              key={order.id}
              className={`cursor-pointer transition-colors hover:bg-muted/50 ${
                isSelected ? "border-primary bg-muted/30" : ""
              }`}
              onClick={() => setSelectedOrderId(order.id)}
            >
              <CardHeader className="p-4 pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-base">{order.id}</CardTitle>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                      order.status,
                    )}`}
                  >
                    {order.status}
                  </span>
                </div>
                <CardDescription>{order.createdAt}</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-lg font-semibold">₹{order.amount}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Right Panel: Order Details (60%) */}
      <div className="w-[60%] h-full">
        {selectedOrder ? (
          <Card className="h-full flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
              <div>
                <CardTitle className="text-2xl">{selectedOrder.id}</CardTitle>
                <CardDescription className="mt-1">
                  Placed on {selectedOrder.createdAt}
                </CardDescription>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span
                  className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(
                    selectedOrder.status,
                  )}`}
                >
                  {selectedOrder.status}
                </span>
                <span className="text-sm text-muted-foreground font-medium">
                  Paid by: {selectedOrder.paidBy}
                </span>
              </div>
            </CardHeader>

            <CardContent className="flex-1 overflow-y-auto pt-6">
              <h3 className="font-semibold text-lg mb-4">Order Items</h3>
              <div className="space-y-4">
                {selectedOrder.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-medium">{item.quantity}x</span>
                      <span>{item.name}</span>
                    </div>
                    <span className="font-medium">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              <Separator className="my-6" />

              <div className="space-y-2">
                <div className="flex justify-between text-muted-foreground text-sm">
                  <span>Subtotal</span>
                  <span>₹{selectedOrder.subtotal}</span>
                </div>
                <div className="flex justify-between text-muted-foreground text-sm">
                  <span>Taxes (GST)</span>
                  <span>₹{selectedOrder.gst}</span>
                </div>
              </div>
            </CardContent>

            <CardFooter className="border-t bg-muted/10 pt-6">
              <div className="flex justify-between w-full items-center">
                <span className="text-lg font-semibold">Total Amount</span>
                <span className="text-2xl font-bold text-primary">
                  ₹{selectedOrder.amount}
                </span>
              </div>
            </CardFooter>
          </Card>
        ) : (
          <div className="h-full border border-dashed rounded-lg flex items-center justify-center bg-muted/10">
            <div className="text-center text-muted-foreground">
              <p className="text-lg font-medium">No order selected</p>
              <p className="text-sm">
                Select an order from the list to view details
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
