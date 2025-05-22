
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Plus,
  Users,
  Eye,
  BarChart2,
  ArrowUpRight,
} from "lucide-react";
import StatsCard from "@/components/dashboard/StatsCard";
import FormCard from "@/components/dashboard/FormCard";
import RecentActivity from "@/components/dashboard/RecentActivity";
import SubmissionsChart from "@/components/dashboard/SubmissionsChart";
import { fetchForms } from "@/lib/api";
import { Form } from "@/types/form";
import { toast } from "@/components/ui/use-toast";

const Dashboard = () => {
  const [forms, setForms] = useState<Form[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadForms = async () => {
    try {
      setIsLoading(true);
      const fetchedForms = await fetchForms();
      setForms(fetchedForms);
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

  const totalSubmissions = forms.reduce(
    (sum, form) => sum + (form.submissions || 0),
    0
  );

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
    // In a real app, you would call an API and then update the state
    setForms(forms.filter((form) => form.id !== id));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of your forms and submissions
          </p>
        </div>
        <Button asChild>
          <Link to="/create">
            <Plus className="mr-2 h-4 w-4" /> Create Form
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Forms"
          value={forms.length}
          icon={<FileText />}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Total Submissions"
          value={totalSubmissions}
          icon={<Users />}
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="Average Conversion"
          value="67%"
          icon={<BarChart2 />}
          trend={{ value: 5, isPositive: true }}
        />
        <StatsCard
          title="Form Views"
          value="1,234"
          icon={<Eye />}
          trend={{ value: 3, isPositive: false }}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <SubmissionsChart />
        </div>
        <div>
          <RecentActivity />
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Your Forms</h2>
          <Button variant="outline" size="sm" asChild>
            <Link to="/forms">
              View All <ArrowUpRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {isLoading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-[220px] rounded-md border border-border bg-card animate-pulse"
              />
            ))}
          </div>
        ) : (
          <>
            {forms.length === 0 ? (
              <div className="text-center py-12 border border-dashed rounded-lg">
                <h3 className="text-lg font-medium">No forms yet</h3>
                <p className="text-muted-foreground mb-4">
                  Create your first form to get started
                </p>
                <Button asChild>
                  <Link to="/create">
                    <Plus className="mr-2 h-4 w-4" /> Create Form
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {forms.map((form) => (
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
    </div>
  );
};

export default Dashboard;
