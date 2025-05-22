
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { fetchForms } from "@/lib/api";
import { Form } from "@/types/form";
import { format } from "date-fns";
import { Search, ArrowUpDown, FileText, BarChart } from "lucide-react";

const Responses = () => {
  const navigate = useNavigate();
  const [forms, setForms] = useState<Form[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadForms = async () => {
      try {
        setIsLoading(true);
        const data = await fetchForms();
        setForms(data);
      } catch (error) {
        console.error("Error loading forms:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadForms();
  }, []);

  // Filter forms based on search query
  const filteredForms = forms.filter(
    (form) =>
      form.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (form.description || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM d, yyyy");
    } catch (error) {
      return "Invalid date";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Form Responses</h1>
          <p className="text-muted-foreground">
            View and manage all form submissions
          </p>
        </div>
      </div>

      <div className="flex items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search forms..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {isLoading ? (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="animate-spin h-8 w-8 border-t-2 border-primary rounded-full mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading forms...</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : filteredForms.length === 0 ? (
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <FileText className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No forms found</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery
                  ? "No forms match your search criteria"
                  : "You haven't created any forms yet"}
              </p>
              {!searchQuery && (
                <Button onClick={() => navigate("/create")}>
                  Create Your First Form
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>All Forms</CardTitle>
            <CardDescription>
              Click on a form to view its responses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Form</TableHead>
                  <TableHead>
                    <div className="flex items-center">
                      Responses
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>Last Response</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredForms.map((form) => (
                  <TableRow
                    key={form.id}
                    className="cursor-pointer"
                    onClick={() => navigate(`/forms/${form.id}/responses`)}
                  >
                    <TableCell>
                      <div className="font-medium">{form.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {form.description || "No description"}
                      </div>
                    </TableCell>
                    <TableCell>{form.submissions || 0}</TableCell>
                    <TableCell>
                      {form.updatedAt ? formatDate(form.updatedAt) : "Never"}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/forms/${form.id}/responses`);
                          }}
                        >
                          <FileText className="h-4 w-4" />
                          <span className="sr-only">View responses</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/forms/${form.id}/edit`);
                          }}
                        >
                          <BarChart className="h-4 w-4" />
                          <span className="sr-only">Analytics</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Responses;
