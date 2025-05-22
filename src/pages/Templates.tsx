import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { FileText, Plus, Search, Star, StarOff, Filter } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/components/ui/use-toast";

const templateCategories = [
  { id: "all", name: "All Templates" },
  { id: "feedback", name: "Feedback" },
  { id: "surveys", name: "Surveys" },
  { id: "registration", name: "Registration" },
  { id: "contact", name: "Contact" },
  { id: "events", name: "Events" },
  { id: "applications", name: "Applications" },
];

const templates = [
  {
    id: "1",
    title: "Customer Feedback Form",
    description: "Collect feedback from your customers about your products or services",
    category: "feedback",
    fields: [
      {
        id: "name",
        type: "text",
        label: "Your Name",
        placeholder: "John Doe",
        required: true,
      },
      {
        id: "email",
        type: "email",
        label: "Email Address",
        placeholder: "john@example.com",
        required: true,
      },
      {
        id: "rating",
        type: "radio",
        label: "How would you rate our service?",
        options: ["Excellent", "Good", "Average", "Poor", "Very Poor"],
        required: true,
      },
      {
        id: "feedback",
        type: "textarea",
        label: "Please share your feedback",
        placeholder: "Your thoughts and suggestions...",
        required: false,
      }
    ],
    popular: true,
    new: false,
    image: null
  },
  {
    id: "2",
    title: "Event Registration",
    description: "Register attendees for your upcoming events",
    category: "events",
    fields: [
      {
        id: "fullName",
        type: "text",
        label: "Full Name",
        placeholder: "John Doe",
        required: true,
      },
      {
        id: "email",
        type: "email",
        label: "Email Address",
        placeholder: "john@example.com",
        required: true,
      },
      {
        id: "phone",
        type: "tel",
        label: "Phone Number",
        placeholder: "+1 (555) 123-4567",
        required: false,
      },
      {
        id: "ticket",
        type: "select",
        label: "Ticket Type",
        options: ["General Admission", "VIP", "Early Bird"],
        required: true,
      },
      {
        id: "dietary",
        type: "checkbox",
        label: "Dietary Restrictions",
        options: ["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", "None"],
        required: false,
      }
    ],
    popular: true,
    new: false,
    image: null
  },
  {
    id: "3",
    title: "Contact Form",
    description: "Simple contact form for your website",
    category: "contact",
    fields: [
      {
        id: "name",
        type: "text",
        label: "Your Name",
        placeholder: "John Doe",
        required: true,
      },
      {
        id: "email",
        type: "email",
        label: "Email Address",
        placeholder: "john@example.com",
        required: true,
      },
      {
        id: "subject",
        type: "text",
        label: "Subject",
        placeholder: "How can we help you?",
        required: true,
      },
      {
        id: "message",
        type: "textarea",
        label: "Message",
        placeholder: "Type your message here...",
        required: true,
      }
    ],
    popular: true,
    new: false,
    image: null
  },
  {
    id: "4",
    title: "Job Application",
    description: "Collect job applications from potential candidates",
    category: "applications",
    fields: 15,
    popular: false,
    new: true,
    image: null
  },
  {
    id: "5",
    title: "Product Survey",
    description: "Get insights about your product from users",
    category: "surveys",
    fields: 12,
    popular: false,
    new: true,
    image: null
  },
  {
    id: "6",
    title: "Membership Registration",
    description: "Sign up new members for your organization",
    category: "registration",
    fields: 9,
    popular: false,
    new: false,
    image: null
  },
];

const Templates = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
  };

  const handleUseTemplate = useCallback((templateId: string) => {
    const selectedTemplate = templates.find(template => template.id === templateId);
    
    if (selectedTemplate) {
      toast({
        title: "Template selected",
        description: `Creating new form from ${selectedTemplate.title} template`,
      });
      
      // Navigate to create form with template data
      navigate("/create", { 
        state: { 
          template: {
            title: selectedTemplate.title,
            description: selectedTemplate.description,
            fields: selectedTemplate.fields || [],
          } 
        } 
      });
    }
  }, [navigate]);

  const filteredTemplates = templates.filter(template => {
    // Filter by category
    if (activeCategory !== "all" && template.category !== activeCategory) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery && !template.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Templates</h1>
          <p className="text-muted-foreground">
            Choose from our pre-built templates or create your own
          </p>
        </div>
        <div>
          <Button onClick={() => navigate("/create")}>
            <Plus className="mr-2 h-4 w-4" /> Create New Form
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search templates..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="flex gap-2">
          <Filter className="h-4 w-4" /> Filter
        </Button>
      </div>

      <Tabs defaultValue="all" onValueChange={setActiveCategory}>
        <ScrollArea className="w-full">
          <TabsList className="w-full justify-start mb-6 overflow-auto">
            {templateCategories.map(category => (
              <TabsTrigger key={category.id} value={category.id}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </ScrollArea>
        
        <TabsContent value={activeCategory} className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTemplates.map((template) => (
              <Card key={template.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-32 bg-secondary/30 flex items-center justify-center">
                  <FileText className="h-12 w-12 text-muted-foreground/50" />
                </div>
                <CardHeader className="relative pb-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-4"
                    onClick={() => toggleFavorite(template.id)}
                  >
                    {favorites.includes(template.id) ? (
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    ) : (
                      <StarOff className="h-4 w-4" />
                    )}
                  </Button>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {template.popular && <Badge variant="secondary">Popular</Badge>}
                    {template.new && <Badge variant="secondary">New</Badge>}
                  </div>
                  <CardTitle className="text-lg">{template.title}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{template.fields?.length || 0} fields</p>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleUseTemplate(template.id)}
                  >
                    Use Template
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Templates;
