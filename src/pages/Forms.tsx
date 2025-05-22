
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search, Trash, Copy } from "lucide-react";
import FormCard from "@/components/dashboard/FormCard";
import { fetchForms } from "@/lib/api";
import { Form } from "@/types/form";
import { toast } from "@/components/ui/use-toast";

type SortOption = "newest" | "oldest" | "alpha" | "responses";

const Forms = () => {
  const [forms, setForms] = useState<Form[]>([]);
  const [filteredForms, setFilteredForms] = useState<Form[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [selectedForms, setSelectedForms] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadForms = async () => {
    try {
      setIsLoading(true);
      const fetchedForms = await fetchForms();
      setForms(fetchedForms);
      setFilteredForms(fetchedForms);
    } catch (error) {
      console.error("Error loading forms:", error);
      toast({
        title: "Error",
        description: "Failed to load forms. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadForms();
  }, []);

  useEffect(() => {
    // Filter forms based on search query
    const filtered = forms.filter((form) =>
      form.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort forms
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "oldest":
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case "alpha":
          return a.title.localeCompare(b.title);
        case "responses":
          return (b.submissions || 0) - (a.submissions || 0);
        default:
          return 0;
      }
    });

    setFilteredForms(sorted);
  }, [forms, searchQuery, sortBy]);

  const handleDuplicateForm = (id: string) => {
    toast({
      title: "Form Duplicated",
      description: "The form has been duplicated successfully.",
    });
  };

  const handleDeleteForm = (id: string) => {
    toast({
      title: "Form Deleted",
      description: "The form has been deleted successfully.",
    });
    setForms(forms.filter((form) => form.id !== id));
  };

  const handleDeleteSelected = () => {
    if (selectedForms.length === 0) return;
    
    toast({
      title: "Forms Deleted",
      description: `${selectedForms.length} forms have been deleted successfully.`,
    });
    
    setForms(forms.filter((form) => !selectedForms.includes(form.id)));
    setSelectedForms([]);
  };

  const handleSelectForm = (id: string) => {
    setSelectedForms((prev) =>
      prev.includes(id)
        ? prev.filter((formId) => formId !== id)
        : [...prev, id]
    );
  };

  const isAllSelected = filteredForms.length > 0 && filteredForms.every(form => 
    selectedForms.includes(form.id)
  );

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedForms([]);
    } else {
      setSelectedForms(filteredForms.map(form => form.id));
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Forms</h1>
          <p className="text-muted-foreground">
            Manage all your forms in one place
          </p>
        </div>
        <Button asChild>
          <Link to="/create">
            <Plus className="mr-2 h-4 w-4" /> Create Form
          </Link>
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search forms..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          {selectedForms.length > 0 && (
            <>
              <Button
                variant="outline"
                size="sm"
                className="whitespace-nowrap"
                onClick={() => {
                  toast({
                    title: "Forms Duplicated",
                    description: `${selectedForms.length} forms have been duplicated.`,
                  });
                }}
              >
                <Copy className="mr-2 h-4 w-4" />
                Duplicate ({selectedForms.length})
              </Button>
              <Button
                variant="destructive"
                size="sm"
                className="whitespace-nowrap"
                onClick={handleDeleteSelected}
              >
                <Trash className="mr-2 h-4 w-4" />
                Delete ({selectedForms.length})
              </Button>
            </>
          )}
          <Select
            value={sortBy}
            onValueChange={(value) => setSortBy(value as SortOption)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest first</SelectItem>
              <SelectItem value="oldest">Oldest first</SelectItem>
              <SelectItem value="alpha">Alphabetically</SelectItem>
              <SelectItem value="responses">Most responses</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-[220px] rounded-md border border-border bg-card animate-pulse"
            />
          ))}
        </div>
      ) : (
        <>
          {filteredForms.length === 0 ? (
            <div className="text-center py-12 border border-dashed rounded-lg">
              <h3 className="text-lg font-medium">No forms found</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery
                  ? `No forms matching "${searchQuery}"`
                  : "You haven't created any forms yet"}
              </p>
              <Button asChild>
                <Link to="/create">
                  <Plus className="mr-2 h-4 w-4" /> Create Form
                </Link>
              </Button>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredForms.map((form) => (
                <FormCard
                  key={form.id}
                  form={form}
                  onDuplicate={handleDuplicateForm}
                  onDelete={handleDeleteForm}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Forms;
