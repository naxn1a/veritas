"use client";
import Avatar from "@/components/build/Avatar";
import TableColumnHeader from "@/components/table/TableColumnHeader";
import { ColumnDef } from "@tanstack/react-table";
import { LucideEdit } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UserForm } from "./form";

interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  gender: string;
  birthdate: string;
  avatar: string;
  role: {
    id: string;
    name: string;
  };
}

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "avatar",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Avatar" />
    ),
    cell: ({ row }) => {
      const data = row.original;
      const user = {
        email: data.email,
        avatar: data.avatar,
      };
      return <Avatar className="mx-auto" user={user} />;
    },
  },
  {
    accessorKey: "firstname",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Firstname" />
    ),
  },
  {
    accessorKey: "lastname",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Lastname" />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => <TableColumnHeader column={column} title="Email" />,
  },
  {
    accessorKey: "phone",
    header: ({ column }) => <TableColumnHeader column={column} title="Phone" />,
  },
  {
    accessorKey: "gender",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Gender" />
    ),
  },
  {
    accessorKey: "birthdate",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Birthdate" />
    ),
  },
  {
    accessorKey: "role",
    header: ({ column }) => <TableColumnHeader column={column} title="Role" />,
    cell: ({ row }) => {
      const data = row.original;
      return <p>{data.role.name}</p>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <Dialog>
          <DialogTrigger asChild>
            <LucideEdit className="h-4 w-4" />
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <UserForm core={data} />
            </div>
          </DialogContent>
        </Dialog>
      );
    },
  },
];
