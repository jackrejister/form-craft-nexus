
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Bar, Line, Pie } from "recharts";
import { Calendar, ChevronDown, Download, Filter, Users } from "lucide-react";
import {
  BarChart as BarChartComponent,
  LineChart,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from "recharts";

const submissionData = [
  { date: "Jan 1", submissions: 4 },
  { date: "Jan 2", submissions: 7 },
  { date: "Jan 3", submissions: 5 },
  { date: "Jan 4", submissions: 10 },
  { date: "Jan 5", submissions: 8 },
  { date: "Jan 6", submissions: 12 },
  { date: "Jan 7", submissions: 9 },
];

const completionRateData = [
  { name: "Completed", value: 75 },
  { name: "Abandoned", value: 25 },
];

const deviceData = [
  { name: "Desktop", value: 58 },
  { name: "Mobile", value: 34 },
  { name: "Tablet", value: 8 },
];

const COLORS = ["#9b87f5", "#adadff", "#8667ac", "#634d93"];

const Analytics = () => {
  const [timeRange, setTimeRange] = useState("week");

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">
            Monitor performance and insights across all your forms
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex gap-2">
            <Calendar className="h-4 w-4" />
            Last 7 days
            <ChevronDown className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="flex gap-2">
            <Download className="h-4 w-4" /> Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-3xl font-bold">1,234</p>
                <p className="text-sm text-muted-foreground">
                  <span className="text-green-500">↑ 12%</span> from last period
                </p>
              </div>
              <div className="h-16 w-24">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={submissionData}>
                    <Line
                      type="monotone"
                      dataKey="submissions"
                      stroke="#9b87f5"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Completion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-3xl font-bold">75%</p>
                <p className="text-sm text-muted-foreground">
                  <span className="text-green-500">↑ 5%</span> from last period
                </p>
              </div>
              <div className="h-16 w-16">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={completionRateData}
                      cx="50%"
                      cy="50%"
                      innerRadius={15}
                      outerRadius={30}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {completionRateData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={index === 0 ? "#9b87f5" : "#e4e4e7"}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Average Time to Complete</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-3xl font-bold">3:24</p>
                <p className="text-sm text-muted-foreground">
                  <span className="text-red-500">↓ 10%</span> from last period
                </p>
              </div>
              <div className="h-16 w-24">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChartComponent data={submissionData}>
                    <Bar
                      dataKey="submissions"
                      fill="#9b87f5"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChartComponent>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Submissions Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="daily" className="w-full">
            <TabsList>
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>
            <div className="h-[300px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={[
                    { date: "Jan 1", submissions: 14 },
                    { date: "Jan 2", submissions: 22 },
                    { date: "Jan 3", submissions: 18 },
                    { date: "Jan 4", submissions: 35 },
                    { date: "Jan 5", submissions: 42 },
                    { date: "Jan 6", submissions: 30 },
                    { date: "Jan 7", submissions: 25 },
                    { date: "Jan 8", submissions: 33 },
                    { date: "Jan 9", submissions: 38 },
                    { date: "Jan 10", submissions: 45 },
                    { date: "Jan 11", submissions: 40 },
                    { date: "Jan 12", submissions: 38 },
                    { date: "Jan 13", submissions: 42 },
                    { date: "Jan 14", submissions: 50 },
                  ]}
                  margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="submissions"
                    name="Submissions"
                    stroke="#9b87f5"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Device Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={deviceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => 
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {deviceData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Performing Forms</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChartComponent
                  data={[
                    { name: "Customer Feedback", value: 120 },
                    { name: "Event Registration", value: 86 },
                    { name: "Job Application", value: 65 },
                    { name: "Contact Form", value: 42 },
                    { name: "Product Survey", value: 35 },
                  ]}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 90, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} horizontal={false} />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={80} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" name="Submissions" fill="#9b87f5" radius={[0, 4, 4, 0]} />
                </BarChartComponent>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
