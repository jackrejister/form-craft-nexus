
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const activities = [
  {
    id: 1,
    type: "response",
    formName: "Customer Feedback",
    time: "10 mins ago",
  },
  {
    id: 2,
    type: "update",
    formName: "Event Registration",
    time: "2 hours ago",
  },
  {
    id: 3,
    type: "response",
    formName: "Contact Form",
    time: "5 hours ago",
  },
  {
    id: 4,
    type: "integration",
    formName: "Product Survey",
    time: "Yesterday",
  },
  {
    id: 5,
    type: "create",
    formName: "Job Application",
    time: "Yesterday",
  },
];

const getActivityIcon = (type: string) => {
  switch (type) {
    case "response":
      return "📝";
    case "update":
      return "🔄";
    case "create":
      return "✨";
    case "integration":
      return "🔌";
    default:
      return "📋";
  }
};

const getActivityText = (type: string, formName: string) => {
  switch (type) {
    case "response":
      return `New response submitted to "${formName}"`;
    case "update":
      return `You updated "${formName}" form`;
    case "create":
      return `You created "${formName}" form`;
    case "integration":
      return `New integration added to "${formName}"`;
    default:
      return `Activity in "${formName}"`;
  }
};

const RecentActivity = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start space-x-3 animate-fade-in"
          >
            <div className="text-lg">{getActivityIcon(activity.type)}</div>
            <div>
              <p className="text-sm">{getActivityText(activity.type, activity.formName)}</p>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
