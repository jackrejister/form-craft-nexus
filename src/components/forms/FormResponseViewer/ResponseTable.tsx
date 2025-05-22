
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowDown,
  ArrowUp,
  Download,
  Filter,
  MoreHorizontal,
  RefreshCw,
  Trash,
} from "lucide-react";
import { FormResponse } from "@/types/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

interface ResponseTableProps {
  responses: FormResponse[];
  fields: { id: string; label: string }[];
  onRefresh: () => void;
  isLoading?: boolean;
}

const ResponseTable = ({
  responses,
  fields,
  onRefresh,
  isLoading = false,
}: ResponseTableProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedResponses, setSelectedResponses] = useState<string[]>([]);
  const [sortField, setSortField] = useState<string | null>("submittedAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const handleSelectResponse = (id: string) => {
    setSelectedResponses((prev) =>
      prev.includes(id)
        ? prev.filter((responseId) => responseId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedResponses.length === responses.length) {
      setSelectedResponses([]);
    } else {
      setSelectedResponses(responses.map((r) => r.id));
    }
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getSortIcon = (field: string) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? (
      <ArrowUp className="h-3 w-3 ml-1" />
    ) : (
      <ArrowDown className="h-3 w-3 ml-1" />
    );
  };

  // Apply sorting and filtering
  const filteredAndSortedResponses = [...responses]
    .filter((response) => {
      if (!searchQuery) return true;
      
      // Search in all fields
      const searchLower = searchQuery.toLowerCase();
      
      // Check field values
      for (const field of fields) {
        const value = response.data[field.id];
        if (
          value &&
          String(value).toLowerCase().includes(searchLower)
        ) {
          return true;
        }
      }
      
      // Check submission ID and date
      return (
        response.id.toLowerCase().includes(searchLower) ||
        new Date(response.submittedAt)
          .toLocaleString()
          .toLowerCase()
          .includes(searchLower)
      );
    })
    .sort((a, b) => {
      if (!sortField) return 0;
      
      let valA, valB;
      
      if (sortField === "submittedAt") {
        valA = new Date(a.submittedAt).getTime();
        valB = new Date(b.submittedAt).getTime();
      } else {
        valA = a.data[sortField];
        valB = b.data[sortField];
      }
      
      if (valA === valB) return 0;
      
      if (valA === undefined || valA === null) return 1;
      if (valB === undefined || valB === null) return -1;
      
      const compareResult = 
        typeof valA === "string" 
          ? valA.localeCompare(valB) 
          : valA - valB;
      
      return sortDirection === "asc" ? compareResult : -compareResult;
    });

  const formatValue = (value: any) => {
    if (value === undefined || value === null) return "-";
    if (Array.isArray(value)) return value.join(", ");
    if (typeof value === "object") return JSON.stringify(value);
    return String(value);
  };

  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (e) {
      return dateString;
    }
  };

  const handleExportCSV = () => {
    // Get all field IDs and labels
    const fieldDefinitions = fields.map(field => ({ id: field.id, label: field.label }));
    
    // Add metadata fields
    fieldDefinitions.push({ id: "submittedAt", label: "Submitted At" });
    fieldDefinitions.push({ id: "id", label: "Response ID" });
    
    // Create CSV header row
    const headers = fieldDefinitions.map(field => `"${field.label}"`).join(",");
    
    // Create CSV data rows
    const dataRows = responses.map(response => {
      return fieldDefinitions.map(field => {
        let value;
        
        if (field.id === "submittedAt") {
          value = response.submittedAt;
        } else if (field.id === "id") {
          value = response.id;
        } else {
          value = response.data[field.id];
        }
        
        // Properly escape and quote CSV values
        if (value === null || value === undefined) {
          return '""';
        } else if (typeof value === "string") {
          return `"${value.replace(/"/g, '""')}"`;
        } else if (Array.isArray(value)) {
          return `"${value.join(", ").replace(/"/g, '""')}"`;
        } else if (typeof value === "object") {
          return `"${JSON.stringify(value).replace(/"/g, '""')}"`;
        } else {
          return `"${String(value).replace(/"/g, '""')}"`;
        }
      }).join(",");
    }).join("\n");
    
    // Combine header and data rows
    const csv = `${headers}\n${dataRows}`;
    
    // Create and download the CSV file
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `form-responses-${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="mt-4">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <CardTitle>
            {responses.length} {responses.length === 1 ? "Response" : "Responses"}
          </CardTitle>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onRefresh}
              disabled={isLoading}
            >
              <RefreshCw
                className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>
            <Button variant="outline" size="sm" onClick={handleExportCSV}>
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            {selectedResponses.length > 0 && (
              <Button variant="destructive" size="sm">
                <Trash className="h-4 w-4 mr-2" />
                Delete ({selectedResponses.length})
              </Button>
            )}
          </div>
        </div>
        
        <div className="mt-2">
          <Input
            placeholder="Search responses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md"
          />
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40px]">
                  <Checkbox
                    checked={
                      selectedResponses.length > 0 &&
                      selectedResponses.length === responses.length
                    }
                    onCheckedChange={handleSelectAll}
                    aria-label="Select all"
                  />
                </TableHead>
                
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("submittedAt")}
                >
                  <div className="flex items-center">
                    <span>Date</span>
                    {getSortIcon("submittedAt")}
                  </div>
                </TableHead>
                
                {fields.map((field) => (
                  <TableHead
                    key={field.id}
                    className="cursor-pointer"
                    onClick={() => handleSort(field.id)}
                  >
                    <div className="flex items-center">
                      <span>{field.label}</span>
                      {getSortIcon(field.id)}
                    </div>
                  </TableHead>
                ))}
                
                <TableHead className="w-[90px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedResponses.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={fields.length + 3}
                    className="text-center py-8"
                  >
                    {isLoading ? (
                      <div className="flex justify-center items-center">
                        <RefreshCw className="h-5 w-5 animate-spin mr-2" />
                        <span>Loading responses...</span>
                      </div>
                    ) : searchQuery ? (
                      `No responses match "${searchQuery}"`
                    ) : (
                      "No responses yet"
                    )}
                  </TableCell>
                </TableRow>
              ) : (
                filteredAndSortedResponses.map((response) => (
                  <TableRow key={response.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedResponses.includes(response.id)}
                        onCheckedChange={() => handleSelectResponse(response.id)}
                        aria-label="Select row"
                      />
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {formatDate(response.submittedAt)}
                    </TableCell>
                    {fields.map((field) => (
                      <TableCell key={field.id} className="max-w-[400px] truncate">
                        {formatValue(response.data[field.id])}
                      </TableCell>
                    ))}
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResponseTable;
