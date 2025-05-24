
import { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FIELD_TYPE_OPTIONS } from "@/lib/constants";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface FormFieldPickerProps {
  onAddField: (type: string) => void;
}

const DraggableFieldCard = ({ field, onAddField }: { field: any; onAddField: (type: string) => void }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: field.value,
    data: {
      type: "field-type",
    },
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        opacity: isDragging ? 0.5 : 1,
      }
    : undefined;

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`flex items-center p-3 cursor-pointer hover:bg-muted transition-colors ${
        isDragging ? "opacity-50" : ""
      }`}
      onClick={() => onAddField(field.value)}
    >
      <div className="text-xl mr-3">{field.icon}</div>
      <div className="flex-1">
        <h4 className="text-sm font-medium">{field.label}</h4>
      </div>
      <Button variant="ghost" size="sm" className="ml-2">
        Add
      </Button>
    </Card>
  );
};

const FormFieldPicker = ({ onAddField }: FormFieldPickerProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFields = FIELD_TYPE_OPTIONS.filter((field) =>
    field.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getFieldsByCategory = (category: string) => {
    return filteredFields.filter(field => field.category === category);
  };

  const categories = [
    { id: 'basic', label: 'Basic', fields: getFieldsByCategory('basic') },
    { id: 'choice', label: 'Choice', fields: getFieldsByCategory('choice') },
    { id: 'datetime', label: 'Date & Time', fields: getFieldsByCategory('datetime') },
    { id: 'advanced', label: 'Advanced', fields: getFieldsByCategory('advanced') },
    { id: 'layout', label: 'Layout', fields: getFieldsByCategory('layout') },
  ];

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search fields..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-8"
        />
      </div>
      
      {searchQuery ? (
        <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
          {filteredFields.map((field) => (
            <DraggableFieldCard
              key={field.value}
              field={field}
              onAddField={onAddField}
            />
          ))}
          {filteredFields.length === 0 && (
            <div className="text-center p-4 text-muted-foreground">
              No fields found matching "{searchQuery}"
            </div>
          )}
        </div>
      ) : (
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid grid-cols-3 w-full mb-4">
            <TabsTrigger value="basic">Basic</TabsTrigger>
            <TabsTrigger value="choice">Choice</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic" className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
            {[...getFieldsByCategory('basic'), ...getFieldsByCategory('datetime')].map((field) => (
              <DraggableFieldCard
                key={field.value}
                field={field}
                onAddField={onAddField}
              />
            ))}
          </TabsContent>
          
          <TabsContent value="choice" className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
            {getFieldsByCategory('choice').map((field) => (
              <DraggableFieldCard
                key={field.value}
                field={field}
                onAddField={onAddField}
              />
            ))}
          </TabsContent>
          
          <TabsContent value="advanced" className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
            {[...getFieldsByCategory('advanced'), ...getFieldsByCategory('layout')].map((field) => (
              <DraggableFieldCard
                key={field.value}
                field={field}
                onAddField={onAddField}
              />
            ))}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default FormFieldPicker;
