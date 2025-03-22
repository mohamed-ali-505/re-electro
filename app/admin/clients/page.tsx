// "use client"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { useState, useEffect } from "react"

// import axios from "axios"

// export default function ClientsPage() {

//     const [data, setData] = useState()

//     const fetchData = async () => {
//         try {
//             const response = await axios.get(`/api/clients`);
//             // setLoading(false);
//             setData(response.data);
//         } catch {
//             // setLoading(false);

//         }
//     };

//     useEffect(() => {
//         fetchData()
//     }, [])

//     return (
//         <div className="space-y-6">
//             <div>
//                 <h1 className="text-3xl font-bold tracking-tight">Corporate Clients</h1>
//                 <p className="text-muted-foreground">Manage all corporate clients registered in the system.</p>
//             </div>

//             <Card>
//                 <CardHeader>
//                     <CardTitle>Clients List</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                     <div className="h-[400px] rounded-md border border-dashed flex items-center justify-center">
//                         Clients table will be displayed here
//                     </div>
//                 </CardContent>
//             </Card>
//         </div>
//     )
// }

"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Edit, Trash } from "lucide-react"
import { useState, useEffect } from "react"
import axios from "axios"
import { ClientType } from "@/types"
import { toast } from "sonner"

export default function ClientsPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [data, setData] = useState<ClientType[]>([])

    const filteredClients = data.filter(
        (client) =>
            client.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleDelete = async (id: string) => {
        setIsSubmitting(true);
        try {
            // Send the DELETE request using Axios
            await axios.delete(`/api/deleteClient`, {
                data: { id }
            });

            toast.success("Client deleted successfully!");
            fetchData()
            setIsSubmitting(false);
        } catch (error) {
            setIsSubmitting(false);
            console.error("Error deleting client:", error);
            toast.success("Failed to delete client.");
        }
    };



    const fetchData = async () => {
        try {
            const response = await axios.get(`/api/clients`);
            // setLoading(false);
            setData(response.data);
        } catch {
            // setLoading(false);

        }
    };

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Corporate Clients</h1>
                    <p className="text-muted-foreground">Manage all corporate clients registered in the system.</p>
                </div>
                <Button asChild>
                    <Link href="/admin/clients/create" className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Add New Client
                    </Link>
                </Button>
            </div>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Clients List</CardTitle>
                    <div className="relative w-64">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search clients..."
                            className="pl-8"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Specialization</TableHead>
                                <TableHead>Discount Percentage</TableHead>
                                <TableHead>Points Required</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredClients.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                                        No clients found
                                    </TableCell>
                                </TableRow>
                            ) : (
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                filteredClients.map((client) => (
                                    <TableRow key={client._id}>
                                        <TableCell className="font-medium">{client.name}</TableCell>
                                        <TableCell>{client.specialization}</TableCell>
                                        <TableCell>{client.discountPercentage}</TableCell>
                                        <TableCell>{client.pointsRequired}</TableCell>
                                        <TableCell>{client.type}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button variant="ghost" size="icon" asChild>
                                                    <Link href={`/admin/clients/${client._id}/edit`}>
                                                        <Edit className="h-4 w-4" />
                                                        <span className="sr-only">Edit</span>
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleDelete(client._id)}
                                                    disabled={isSubmitting}
                                                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                                >
                                                    <Trash className="h-4 w-4" />
                                                    <span className="sr-only">Delete</span>
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}


