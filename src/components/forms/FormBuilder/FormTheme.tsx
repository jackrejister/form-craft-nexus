
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormTheme as FormThemeType } from "@/types/form";
import { Card } from "@/components/ui/card";

interface FormThemeProps {
  theme: FormThemeType;
  onUpdateTheme: (theme: Partial<FormThemeType>) => void;
}

const fontFamilies = [
  { value: "Inter, sans-serif", label: "Inter" },
  { value: "Arial, sans-serif", label: "Arial" },
  { value: "Helvetica, Arial, sans-serif", label: "Helvetica" },
  { value: "Georgia, serif", label: "Georgia" },
  { value: "'Times New Roman', Times, serif", label: "Times New Roman" },
  {
    value: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    label: "Segoe UI",
  },
  { value: "Roboto, sans-serif", label: "Roboto" },
  { value: "'Open Sans', sans-serif", label: "Open Sans" },
  { value: "Lato, sans-serif", label: "Lato" },
  { value: "Montserrat, sans-serif", label: "Montserrat" },
];

const borderRadiusOptions = [
  { value: "0", label: "None" },
  { value: "4px", label: "Small" },
  { value: "8px", label: "Medium" },
  { value: "12px", label: "Large" },
  { value: "16px", label: "Extra Large" },
  { value: "9999px", label: "Rounded" },
];

const FormTheme = ({ theme, onUpdateTheme }: FormThemeProps) => {
  return (
    <div className="space-y-4">
      <Card className="p-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="backgroundColor">Background Color</Label>
            <div className="flex gap-2">
              <Input
                id="backgroundColor"
                type="color"
                value={theme.backgroundColor}
                onChange={(e) =>
                  onUpdateTheme({ backgroundColor: e.target.value })
                }
                className="w-12 p-1 h-8 cursor-pointer"
              />
              <Input
                value={theme.backgroundColor}
                onChange={(e) =>
                  onUpdateTheme({ backgroundColor: e.target.value })
                }
                className="flex-1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="textColor">Text Color</Label>
            <div className="flex gap-2">
              <Input
                id="textColor"
                type="color"
                value={theme.textColor}
                onChange={(e) => onUpdateTheme({ textColor: e.target.value })}
                className="w-12 p-1 h-8 cursor-pointer"
              />
              <Input
                value={theme.textColor}
                onChange={(e) => onUpdateTheme({ textColor: e.target.value })}
                className="flex-1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="accentColor">Accent Color</Label>
            <div className="flex gap-2">
              <Input
                id="accentColor"
                type="color"
                value={theme.accentColor}
                onChange={(e) => onUpdateTheme({ accentColor: e.target.value })}
                className="w-12 p-1 h-8 cursor-pointer"
              />
              <Input
                value={theme.accentColor}
                onChange={(e) => onUpdateTheme({ accentColor: e.target.value })}
                className="flex-1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fontFamily">Font Family</Label>
            <Select
              value={theme.fontFamily}
              onValueChange={(value) => onUpdateTheme({ fontFamily: value })}
            >
              <SelectTrigger id="fontFamily">
                <SelectValue placeholder="Select font" />
              </SelectTrigger>
              <SelectContent>
                {fontFamilies.map((font) => (
                  <SelectItem
                    key={font.value}
                    value={font.value}
                    style={{ fontFamily: font.value }}
                  >
                    {font.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="borderRadius">Border Radius</Label>
            <Select
              value={theme.borderRadius}
              onValueChange={(value) => onUpdateTheme({ borderRadius: value })}
            >
              <SelectTrigger id="borderRadius">
                <SelectValue placeholder="Select border radius" />
              </SelectTrigger>
              <SelectContent>
                {borderRadiusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="logoUrl">Logo URL</Label>
            <Input
              id="logoUrl"
              value={theme.logo || ""}
              onChange={(e) => onUpdateTheme({ logo: e.target.value })}
              placeholder="https://example.com/logo.png"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="coverImageUrl">Cover Image URL</Label>
            <Input
              id="coverImageUrl"
              value={theme.coverImage || ""}
              onChange={(e) => onUpdateTheme({ coverImage: e.target.value })}
              placeholder="https://example.com/cover.jpg"
            />
          </div>
        </div>
      </Card>

      <div className="mt-4">
        <h3 className="font-medium mb-2">Preview</h3>
        <div
          className="p-4 rounded-md border"
          style={{
            backgroundColor: theme.backgroundColor,
            color: theme.textColor,
            fontFamily: theme.fontFamily,
            borderRadius: theme.borderRadius,
          }}
        >
          <div className="space-y-4">
            <h3
              className="text-lg font-medium"
              style={{ color: theme.textColor }}
            >
              Sample Form Question
            </h3>
            <p className="text-sm" style={{ color: theme.textColor }}>
              This is how your form text will appear to users.
            </p>
            <div
              className="p-2 border rounded"
              style={{
                borderColor: theme.accentColor + "40",
                borderRadius: theme.borderRadius,
              }}
            >
              <p className="text-sm">Input field placeholder</p>
            </div>
            <button
              className="px-4 py-2 rounded text-white"
              style={{
                backgroundColor: theme.accentColor,
                borderRadius: theme.borderRadius,
              }}
            >
              Submit Button
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormTheme;
