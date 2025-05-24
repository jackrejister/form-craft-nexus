
import { useState } from "react";
import { FormField } from "@/types/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  GripVertical,
  X,
  Copy,
  ChevronDown,
  ChevronUp,
  Check,
  Settings,
} from "lucide-react";
import { FIELD_TYPE_OPTIONS } from "@/lib/constants";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface FormFieldComponentProps {
  field: FormField;
  onUpdate: (updatedField: Partial<FormField>) => void;
  onRemove: () => void;
  onDuplicate: () => void;
}

const FormFieldComponent = ({
  field,
  onUpdate,
  onRemove,
  onDuplicate,
}: FormFieldComponentProps) => {
  const [expanded, setExpanded] = useState(false);
  const [validationOpen, setValidationOpen] = useState(false);

  const toggleExpanded = () => setExpanded(!expanded);

  const getFieldTypeLabel = (type: string) => {
    const fieldType = FIELD_TYPE_OPTIONS.find((option) => option.value === type);
    return fieldType ? fieldType.label : type;
  };

  const getFieldTypeIcon = (type: string) => {
    const fieldType = FIELD_TYPE_OPTIONS.find((option) => option.value === type);
    return fieldType ? fieldType.icon : "❓";
  };

  const updateValidation = (key: string, value: any) => {
    onUpdate({
      validation: {
        ...field.validation,
        [key]: value,
      },
    });
  };

  const removeValidation = (key: string) => {
    const newValidation = { ...field.validation };
    delete newValidation[key];
    onUpdate({ validation: newValidation });
  };

  return (
    <Card className="border border-border relative group">
      <CardHeader className="p-4 pb-0 flex flex-row items-center space-y-0 gap-3">
        <div className="cursor-move text-muted-foreground hover:text-foreground transition-colors">
          <GripVertical size={16} />
        </div>
        <div className="mr-2 text-muted-foreground">
          {getFieldTypeIcon(field.type)}
        </div>
        {expanded ? (
          <Input
            value={field.label}
            onChange={(e) => onUpdate({ label: e.target.value })}
            placeholder="Question"
            className="flex-1 p-0 h-auto border-none focus-visible:ring-0"
          />
        ) : (
          <CardTitle className="text-base font-medium flex-1 truncate">
            {field.label || "Question"}
          </CardTitle>
        )}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDuplicate()}
            className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Copy size={14} />
            <span className="sr-only">Duplicate field</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onRemove()}
            className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
          >
            <X size={14} />
            <span className="sr-only">Remove field</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleExpanded}
            className="h-6 w-6"
          >
            {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            <span className="sr-only">
              {expanded ? "Collapse" : "Expand"} field
            </span>
          </Button>
        </div>
      </CardHeader>

      {expanded && (
        <CardContent className="p-4 space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor={`field-${field.id}-type`}>Field Type</Label>
            <Select
              value={field.type}
              onValueChange={(value) => onUpdate({ type: value as any })}
            >
              <SelectTrigger id={`field-${field.id}-type`}>
                <SelectValue placeholder="Select field type" />
              </SelectTrigger>
              <SelectContent>
                {FIELD_TYPE_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center gap-2">
                      <span>{option.icon}</span>
                      <span>{option.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`field-${field.id}-placeholder`}>Placeholder</Label>
            <Input
              id={`field-${field.id}-placeholder`}
              value={field.placeholder || ""}
              onChange={(e) => onUpdate({ placeholder: e.target.value })}
              placeholder="Placeholder text"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`field-${field.id}-description`}>Description</Label>
            <Input
              id={`field-${field.id}-description`}
              value={field.description || ""}
              onChange={(e) => onUpdate({ description: e.target.value })}
              placeholder="Helper text for this field"
            />
          </div>

          {(field.type === "select" ||
            field.type === "multiselect" ||
            field.type === "radio" ||
            field.type === "checkbox") && (
            <div className="space-y-2">
              <Label htmlFor={`field-${field.id}-options`}>Options</Label>
              <div className="space-y-2">
                {(field.options || []).map((option, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...(field.options || [])];
                        newOptions[index] = e.target.value;
                        onUpdate({ options: newOptions });
                      }}
                      placeholder={`Option ${index + 1}`}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        const newOptions = [...(field.options || [])];
                        newOptions.splice(index, 1);
                        onUpdate({ options: newOptions });
                      }}
                      className="h-8 w-8"
                    >
                      <X size={14} />
                      <span className="sr-only">Remove option</span>
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    onUpdate({
                      options: [
                        ...(field.options || []),
                        `Option ${(field.options || []).length + 1}`,
                      ],
                    })
                  }
                >
                  Add Option
                </Button>
              </div>
            </div>
          )}

          {field.type === "file" && (
            <div className="space-y-2">
              <Label>File Upload Settings</Label>
              <div className="space-y-2">
                <Input
                  placeholder="Accepted file types (e.g., .pdf,.doc,.jpg)"
                  value={field.validation?.pattern || ""}
                  onChange={(e) => updateValidation("pattern", e.target.value)}
                />
                <Input
                  placeholder="Max file size (MB)"
                  type="number"
                  value={field.validation?.max || ""}
                  onChange={(e) => updateValidation("max", Number(e.target.value))}
                />
              </div>
            </div>
          )}

          <div className="flex items-center space-x-2">
            <Checkbox
              id={`field-${field.id}-required`}
              checked={field.required}
              onCheckedChange={(checked) => onUpdate({ required: !!checked })}
            />
            <Label htmlFor={`field-${field.id}-required`}>Required field</Label>
          </div>

          <Collapsible open={validationOpen} onOpenChange={setValidationOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="outline" size="sm" className="w-full">
                <Settings className="mr-2 h-4 w-4" />
                Validation Rules
                <ChevronDown className="ml-auto h-4 w-4" />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-3 mt-3">
              {(field.type === "text" || field.type === "textarea") && (
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label>Min Length</Label>
                    <Input
                      type="number"
                      placeholder="0"
                      value={field.validation?.minLength || ""}
                      onChange={(e) => updateValidation("minLength", Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label>Max Length</Label>
                    <Input
                      type="number"
                      placeholder="100"
                      value={field.validation?.maxLength || ""}
                      onChange={(e) => updateValidation("maxLength", Number(e.target.value))}
                    />
                  </div>
                </div>
              )}
              
              {field.type === "number" && (
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label>Min Value</Label>
                    <Input
                      type="number"
                      value={field.validation?.min || ""}
                      onChange={(e) => updateValidation("min", Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label>Max Value</Label>
                    <Input
                      type="number"
                      value={field.validation?.max || ""}
                      onChange={(e) => updateValidation("max", Number(e.target.value))}
                    />
                  </div>
                </div>
              )}

              <div>
                <Label>Custom Pattern (Regex)</Label>
                <Input
                  placeholder="e.g., ^[A-Z].*"
                  value={field.validation?.pattern || ""}
                  onChange={(e) => updateValidation("pattern", e.target.value)}
                />
              </div>
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
      )}

      <CardFooter
        className={`p-4 pt-0 ${expanded ? "" : "hidden"} justify-between`}
      >
        <div className="text-xs text-muted-foreground">
          Field type: {getFieldTypeLabel(field.type)}
        </div>
        <div className="text-xs text-muted-foreground">
          {field.required ? (
            <span className="flex items-center">
              Required <Check size={12} className="ml-1" />
            </span>
          ) : (
            "Optional"
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default FormFieldComponent;
