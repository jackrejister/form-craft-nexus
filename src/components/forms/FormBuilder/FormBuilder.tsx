
import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Form, FormField } from "@/types/form";
import FormFieldComponent from "./FormFieldComponent";
import FormFieldPicker from "./FormFieldPicker";
import FormSettings from "./FormSettings";
import FormTheme from "./FormTheme";
import { DEFAULT_THEME, DEFAULT_FIELD } from "@/lib/constants";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Settings, Paintbrush, LinkIcon } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

interface FormBuilderProps {
  initialForm?: Partial<Form>;
  onSave: (form: Partial<Form>) => void;
  onChange?: (form: Partial<Form>) => void;
  isSaving?: boolean;
}

const FormBuilder = ({
  initialForm,
  onSave,
  onChange,
  isSaving = false,
}: FormBuilderProps) => {
  const [form, setForm] = useState<Partial<Form>>({
    title: initialForm?.title || "Untitled Form",
    description: initialForm?.description || "",
    fields: initialForm?.fields || [],
    theme: initialForm?.theme || DEFAULT_THEME,
    settings: initialForm?.settings || {
      savePartialResponses: true,
      allowMultipleSubmissions: true,
      enableCaptcha: false,
      showProgressBar: true,
      submitButtonText: "Submit",
    },
    integrations: initialForm?.integrations || [],
  });

  // Notify parent component when form changes
  useEffect(() => {
    if (onChange) {
      onChange(form);
    }
  }, [form, onChange]);

  const handleAddField = (type: string) => {
    const newField: FormField = {
      ...DEFAULT_FIELD,
      id: uuidv4(),
      type: type as any,
    };
    setForm({
      ...form,
      fields: [...(form.fields || []), newField],
    });
  };

  const handleUpdateField = (id: string, updatedField: Partial<FormField>) => {
    setForm({
      ...form,
      fields: (form.fields || []).map((field) =>
        field.id === id ? { ...field, ...updatedField } : field
      ),
    });
  };

  const handleRemoveField = (id: string) => {
    setForm({
      ...form,
      fields: (form.fields || []).filter((field) => field.id !== id),
    });
  };

  const handleDuplicateField = (id: string) => {
    const fieldToDuplicate = (form.fields || []).find((field) => field.id === id);
    if (fieldToDuplicate) {
      const duplicatedField = {
        ...fieldToDuplicate,
        id: uuidv4(),
        label: `${fieldToDuplicate.label} (Copy)`,
      };
      setForm({
        ...form,
        fields: [...(form.fields || []), duplicatedField],
      });
    }
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    // Handle field being dragged from picker to form area
    if (result.source.droppableId === "field-picker" && 
        result.destination.droppableId === "form-fields") {
      const fieldType = result.draggableId;
      handleAddField(fieldType);
      return;
    }

    // Handle reordering of fields within the form area
    if (result.source.droppableId === "form-fields" && 
        result.destination.droppableId === "form-fields") {
      const items = Array.from(form.fields || []);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);

      setForm({
        ...form,
        fields: items,
      });
    }
  };

  const handleUpdateTheme = (theme: any) => {
    setForm({
      ...form,
      theme: { ...form.theme, ...theme },
    });
  };

  const handleUpdateSettings = (settings: any) => {
    setForm({
      ...form,
      settings: { ...form.settings, ...settings },
    });
  };

  const handleUpdateIntegrations = (integrations: any) => {
    setForm({
      ...form,
      integrations,
    });
  };

  const handleSave = () => {
    onSave(form);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="space-y-2 flex-1 w-full">
          <Input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Form Title"
            className="text-xl font-semibold border-none p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <Textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Form Description (optional)"
            className="resize-none border-none p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? "Saving..." : "Save Form"}
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <Card>
            <CardContent className="p-4">
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="form-fields">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="space-y-4 min-h-[300px]"
                    >
                      {(form.fields || []).length === 0 && (
                        <div className="flex flex-col items-center justify-center p-8 bg-secondary/20 rounded-md border-2 border-dashed border-secondary">
                          <p className="text-muted-foreground mb-2">
                            No fields yet. Add your first field from the panel on the right.
                          </p>
                        </div>
                      )}
                      {(form.fields || []).map((field, index) => (
                        <Draggable
                          key={field.id}
                          draggableId={field.id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <FormFieldComponent
                                field={field}
                                onUpdate={(updatedField) =>
                                  handleUpdateField(field.id, updatedField)
                                }
                                onRemove={() => handleRemoveField(field.id)}
                                onDuplicate={() => handleDuplicateField(field.id)}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </CardContent>
          </Card>
        </div>

        <div className="w-full lg:w-[300px]">
          <Tabs defaultValue="fields">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="fields">Fields</TabsTrigger>
              <TabsTrigger value="theme">
                <Paintbrush className="h-4 w-4 mr-1" />
                Theme
              </TabsTrigger>
              <TabsTrigger value="settings">
                <Settings className="h-4 w-4 mr-1" />
                Settings
              </TabsTrigger>
            </TabsList>
            <TabsContent value="fields" className="mt-4">
              <FormFieldPicker onAddField={handleAddField} />
            </TabsContent>
            <TabsContent value="theme" className="mt-4">
              <FormTheme
                theme={form.theme || DEFAULT_THEME}
                onUpdateTheme={handleUpdateTheme}
              />
            </TabsContent>
            <TabsContent value="settings" className="mt-4">
              <FormSettings
                settings={form.settings}
                onUpdateSettings={handleUpdateSettings}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default FormBuilder;
