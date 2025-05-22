
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FIELD_TYPE_OPTIONS } from "@/lib/constants";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Draggable, Droppable } from "react-beautiful-dnd";

interface FormFieldPickerProps {
  onAddField: (type: string) => void;
}

const FormFieldPicker = ({ onAddField }: FormFieldPickerProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFields = FIELD_TYPE_OPTIONS.filter((field) =>
    field.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
      
      <Droppable droppableId="field-picker" isDropDisabled={true}>
        {(provided) => (
          <div
            className="space-y-2 max-h-[500px] overflow-y-auto pr-1"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {filteredFields.map((field, index) => (
              <Draggable 
                key={field.value} 
                draggableId={field.value} 
                index={index}
                isDragDisabled={false}
              >
                {(provided, snapshot) => (
                  <Card
                    className={`flex items-center p-3 cursor-pointer hover:bg-muted transition-colors ${
                      snapshot.isDragging ? "opacity-50" : ""
                    }`}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
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
                )}
              </Draggable>
            ))}

            {filteredFields.length === 0 && (
              <div className="text-center p-4 text-muted-foreground">
                No fields found matching "{searchQuery}"
              </div>
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default FormFieldPicker;
