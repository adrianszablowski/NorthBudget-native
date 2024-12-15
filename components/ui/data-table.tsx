import { Badge, BadgeText } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableData,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import map from "lodash/map";
import React from "react";

interface DataTableProps {
  columns: string[];
  rows: any[];
}

export default function DataTable({ columns, rows }: DataTableProps) {
  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow className="border-b-0">
          {map(columns, (column) => (
            <TableHead className="text-md p-1 text-center">{column}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {map(rows, (row) => (
          <TableRow className="border-b-0">
            <TableData className="text-md px-1 text-center">
              Zaplacenie za internet bla bla bla
            </TableData>
            <TableData className="text-md px-1 text-center">Sport</TableData>
            <TableData className="text-md px-1">
              <Badge
                size="md"
                action="success"
                className="w-full justify-center"
              >
                <BadgeText>Completed</BadgeText>
              </Badge>
            </TableData>
            <TableData className="text-md px-1 text-center">...</TableData>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
