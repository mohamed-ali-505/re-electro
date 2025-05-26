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
        return "bg-yellow-500 text-white hover:bg-yellow-600";
      case "onDelivery":
        return "bg-blue-500 text-white hover:bg-blue-600";
      case "delivered":
        return "bg-green-500 text-white hover:bg-green-600";
      case "rejected":
        return "bg-red-500 text-white hover:bg-red-600";
      case "accepted":
        return "bg-purple-500 text-white hover:bg-purple-600";
      case "completed":
        return "bg-green-500 text-white hover:bg-green-600";
      default:
        return "bg-gray-500 text-white hover:bg-gray-600";
    }
  };

  return <Badge className={getStatusColor()}>{status}</Badge>;
};

export default StatusBadge;