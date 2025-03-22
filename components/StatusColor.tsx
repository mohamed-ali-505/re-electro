import { Badge } from "@/components/ui/badge";

type StatusProps = {
  status: "pending" |
   "onDelivery" |
    "delivered" | 
    "rejected" | 
    "accepted" | 
    "completed";
};

const StatusBadge = ({ status }: StatusProps) => {
  const getStatusColor = () => {
    switch (status) {
      case "pending":
        return "bg-green-500 text-white";
      case "onDelivery":
        return "bg-yellow-500 text-black";
      case "delivered":
        return "bg-red-500 text-white";
      case "rejected":
        return "bg-red-500 text-white";
      case "accepted":
        return "bg-red-500 text-white";
      case "completed":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return <Badge className={getStatusColor()}>{status}</Badge>;
};

export default StatusBadge;