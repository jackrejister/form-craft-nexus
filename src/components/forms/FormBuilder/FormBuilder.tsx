import { useState, useEffect } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
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
import { Settings, Paintbrush } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { useTheme } from "@/components/ThemeProvider";

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
  const { theme: appTheme } = useTheme();
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

  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

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

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    // Handle dragging from picker to form area
    if (event.over?.id === "form-fields" && event.active.data.current?.type === "field-type") {
      // Will be handled in dragEnd
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    // Handle field being dragged from picker to form area
    if (active.data.current?.type === "field-type" && over.id === "form-fields") {
      const fieldType = active.id as string;
      handleAddField(fieldType);
      return;
    }

    // Handle reordering of fields within the form area
    if (active.id !== over.id && over.id !== "form-fields") {
      const oldIndex = (form.fields || []).findIndex((field) => field.id === active.id);
      const newIndex = (form.fields || []).findIndex((field) => field.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        const newFields = arrayMove(form.fields || [], oldIndex, newIndex);
        setForm({
          ...form,
          fields: newFields,
        });
      }
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

  const handleSave = () => {
    onSave(form);
  };

  // Get appropriate background colors based on app theme
  const getFormBackground = () => {
    if (appTheme === 'dark') {
      return form.theme?.backgroundColor === '#ffffff' ? '#1a1a1a' : form.theme?.backgroundColor || '#1a1a1a';
    }
    return form.theme?.backgroundColor || '#ffffff';
  };

  const getFormTextColor = () => {
    if (appTheme === 'dark') {
      return form.theme?.textColor === '#1a1a1a' ? '#ffffff' : form.theme?.textColor || '#ffffff';
    }
    return form.theme?.textColor || '#1a1a1a';
  };

  const getDropZoneBackground = () => {
    const bgColor = getFormBackground();
    // Create a slightly different shade for the drop zone
    if (appTheme === 'dark') {
      return 'rgba(255, 255, 255, 0.05)';
    }
    return 'rgba(0, 0, 0, 0.02)';
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
              <div
                className="rounded-lg p-4 mb-4 transition-colors duration-200"
                style={{
                  backgroundColor: getFormBackground(),
                  color: getFormTextColor(),
                  fontFamily: form.theme?.fontFamily || DEFAULT_THEME.fontFamily,
                }}
              >
                {form.theme?.coverImage && (
                  <div className="mb-6 rounded-lg overflow-hidden">
                    <img
                      src={form.theme.coverImage}
                      alt="Form Cover"
                      className="w-full h-32 object-cover"
                    />
                  </div>
                )}
                
                {form.theme?.logo && (
                  <div className="mb-4 flex justify-center">
                    <img
                      src={form.theme.logo}
                      alt="Form Logo"
                      className="h-12 object-contain"
                    />
                  </div>
                )}

                <h2 className="text-2xl font-bold mb-2" style={{ color: getFormTextColor() }}>
                  {form.title || "Form Preview"}
                </h2>
                {form.description && (
                  <p className="text-sm opacity-80 mb-4" style={{ color: getFormTextColor() }}>
                    {form.description}
                  </p>
                )}
                
                <DndContext
                  sensors={sensors}
                  onDragStart={handleDragStart}
                  onDragOver={handleDragOver}
                  onDragEnd={handleDragEnd}
                >
                  <div
                    id="form-fields"
                    className="space-y-4 min-h-[300px] border-2 border-dashed rounded-md p-4 transition-colors duration-200"
                    style={{
                      borderColor: form.theme?.accentColor ? form.theme.accentColor + '40' : '#e2e8f0',
                      backgroundColor: getDropZoneBackground()
                    }}
                  >
                    {(form.fields || []).length === 0 && (
                      <div className="flex flex-col items-center justify-center p-8 rounded-md"
                           style={{ backgroundColor: 'rgba(128, 128, 128, 0.1)' }}>
                        <p className="mb-2" style={{ color: getFormTextColor(), opacity: 0.7 }}>
                          No fields yet. Drag fields from the panel on the right to add them.
                        </p>
                      </div>
                    )}
                    <SortableContext
                      items={(form.fields || []).map((field) => field.id)}
                      strategy={verticalListSortingStrategy}
                    >
                      {(form.fields || []).map((field) => (
                        <FormFieldComponent
                          key={field.id}
                          field={field}
                          onUpdate={(updatedField) =>
                            handleUpdateField(field.id, updatedField)
                          }
                          onRemove={() => handleRemoveField(field.id)}
                          onDuplicate={() => handleDuplicateField(field.id)}
                        />
                      ))}
                    </SortableContext>
                  </div>
                </DndContext>
              </div>
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
