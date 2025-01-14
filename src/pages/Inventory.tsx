import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Edit, Trash2 } from "lucide-react";

const Inventory = () => {
  const [items] = useState([
    { 
      id: 1, 
      name: "Cotton Fabric", 
      totalQuantity: 500,
      collectedQuantity: 300,
      remainingQuantity: 200,
      unit: "meters", 
      status: "In Stock" 
    },
    { 
      id: 2, 
      name: "Buttons", 
      totalQuantity: 1000,
      collectedQuantity: 600,
      remainingQuantity: 400,
      unit: "pieces", 
      status: "Low Stock" 
    },
    { 
      id: 3, 
      name: "Zippers", 
      totalQuantity: 750,
      collectedQuantity: 450,
      remainingQuantity: 300,
      unit: "pieces", 
      status: "In Stock" 
    },
  ]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Inventory</h1>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" /> Add Item
        </Button>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item Name</TableHead>
              <TableHead>Total Quantity</TableHead>
              <TableHead>Collected Quantity</TableHead>
              <TableHead>Remaining Quantity</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.totalQuantity}</TableCell>
                <TableCell>{item.collectedQuantity}</TableCell>
                <TableCell>{item.remainingQuantity}</TableCell>
                <TableCell>{item.unit}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      item.status === "In Stock"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {item.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="mr-2">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-red-500">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default Inventory;