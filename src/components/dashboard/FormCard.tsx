
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, Edit, Eye, MoreHorizontal, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import { Form } from "@/types/form";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface FormCardProps {
  form: Form;
  onDelete?: (id: string) => void;
  onDuplicate?: (id: string) => void;
}

const FormCard = ({ form, onDelete, onDuplicate }: FormCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  return (
    <Card className="overflow-hidden hover-scale">
      <CardHeader className="p-4 pb-0 flex flex-row items-start justify-between space-y-0">
        <div>
          <Badge variant="outline" className="mb-2">
            {form.submissions} responses
          </Badge>
          <CardTitle className="text-lg font-semibold line-clamp-1">
            {form.title}
          </CardTitle>
          <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
            Last updated {formatDate(form.updatedAt)}
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[160px]">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to={`/forms/${form.id}/edit`} className="cursor-pointer">
                <Edit className="mr-2 h-4 w-4" /> Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to={`/forms/${form.id}/responses`} className="cursor-pointer">
                <Eye className="mr-2 h-4 w-4" /> View Responses
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDuplicate?.(form.id)}>
              <Copy className="mr-2 h-4 w-4" /> Duplicate
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={() => onDelete?.(form.id)}
              className="text-red-500 focus:text-red-500"
            >
              <Trash className="mr-2 h-4 w-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="p-4 pt-3">
        <p className="text-sm text-muted-foreground line-clamp-2 h-10">
          {form.description || "No description provided"}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button variant="secondary" size="sm" asChild>
          <Link to={`/forms/${form.id}/edit`}>Edit Form</Link>
        </Button>
        <Button size="sm" asChild>
          <Link to={`/forms/${form.id}/preview`}>Preview</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FormCard;
