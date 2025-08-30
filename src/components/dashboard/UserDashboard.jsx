import React, { useState, useEffect } from "react";
import {
  User,
  Calendar,
  Activity,
  FileText,
  MoreHorizontal,
  HeartPulse,
  Syringe,
  Weight,
  Ruler,
  Dumbbell,
  Brain,
} from "lucide-react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { cva } from "class-variance-authority";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Utility to join class names (simple version)
const cn = (...classes) => classes.filter(Boolean).join(" ");

// Component implementations
// Card Component
const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border bg-card text-card-foreground shadow",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

// Button Component
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? "div" : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";

// DropdownMenu Components
const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const DropdownMenuItem = React.forwardRef(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    )}
    {...props}
  />
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

// Avatar Components
const Avatar = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)}
    {...props}
  />
));
Avatar.displayName = "Avatar";

const AvatarImage = React.forwardRef(({ className, ...props }, ref) => (
  <img
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
));
AvatarImage.displayName = "AvatarImage";

const AvatarFallback = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = "AvatarFallback";

// ToggleGroup Components
const toggleVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border border-input bg-transparent",
      },
      size: {
        default: "h-10 px-3",
        sm: "h-9 px-2",
        lg: "h-11 px-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const ToggleGroup = React.forwardRef(({ className, variant, size, ...props }, ref) => (
  <ToggleGroupPrimitive.Root
    ref={ref}
    className={cn("flex items-center justify-center gap-1", className)}
    {...props}
  />
));
ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;

const ToggleGroupItem = React.forwardRef(({ className, ...props }, ref) => (
  <ToggleGroupPrimitive.Item
    ref={ref}
    className={cn(toggleVariants(), className)}
    {...props}
  />
));
ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;

// Table Components
const Table = React.forwardRef(({ className, ...props }, ref) => (
  <div className="w-full overflow-auto">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
));
Table.displayName = "Table";

const TableHeader = React.forwardRef(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn("[&_tr]:border-b", className)}
    {...props}
  />
));
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
));
TableBody.displayName = "TableBody";

const TableRow = React.forwardRef(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    )}
    {...props}
  />
));
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
      className
    )}
    {...props}
  />
));
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}
    {...props}
  />
));
TableCell.displayName = "TableCell";


const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border rounded shadow-md">
        <p className="font-bold">{`Month: ${label}`}</p>
        <p>{`Wellness Score: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};


const menuItems = [
  { id: "profile", label: "My Profile", icon: User },
  { id: "sessions", label: "Therapy Sessions", icon: Calendar },
  { id: "progress", label: "Wellness Progress", icon: Activity },
  { id: "reports", label: "Reports", icon: FileText },
  { id: "fitme", label: "FitMe", icon: Dumbbell },
];

const mockUserData = {
  name: "John Doe",
  age: 32,
  email: "john@example.com",
  mentalHealth: "Stable",
  avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  healthMetrics: {
    bloodPressure: "120/80 mmHg",
    sugarLevel: "95 mg/dL",
    weight: "75 kg",
    height: "175 cm",
  },
};

const progressData = [
  { month: "Jan", progress: 15 },
  { month: "Feb", progress: 20 },
  { month: "Mar", progress: 30 },
  { month: "Apr", progress: 25 },
  { month: "May", progress: 40 },
  { month: "Jun", progress: 35 },
];

const therapySessionsData = [
  { date: "2023-10-01", time: "10:00 AM", therapist: "Dr. Smith", notes: "Discussed stress management techniques." },
  { date: "2023-09-15", time: "02:30 PM", therapist: "Dr. Jones", notes: "Explored childhood memories and their impact." },
  { date: "2023-09-01", time: "09:00 AM", therapist: "Dr. Smith", notes: "Reviewed progress and set new goals." },
  { date: "2023-08-15", time: "11:00 AM", therapist: "Dr. Lee", notes: "Focused on mindfulness and meditation practices." },
  { date: "2023-08-01", time: "01:00 PM", therapist: "Dr. Smith", notes: "Initial consultation and mental health assessment." },
];

// Valid and publicly accessible image URLs from Unsplash
const physicalExercises = [
  {
    title: "Morning Stretch Routine",
    description: "5–10 mins of full-body stretching improves blood flow, reduces stiffness, and boosts energy.",
    image: "https://images.unsplash.com/photo-1544367527-d0e513a968a3?auto=format&fit=crop&q=80&w=2670",
  },
  {
    title: "Brisk Walking",
    description: "A 20–30 min walk outdoors helps improve cardiovascular health and reduces anxiety.",
    image: "https://images.unsplash.com/photo-1571019613-43454-1cb3f90b78ae?auto=format&fit=crop&q=80&w=2670",
  },
  {
    title: "Yoga (Sun Salutation)",
    description: "Combines stretching, controlled breathing, and mindfulness—great for both body and mind.",
    image: "https://images.unsplash.com/photo-1558021212-bc0884242663?auto=format&fit=crop&q=80&w=2670",
  },
  {
    title: "Strength Training (Bodyweight)",
    description: "Simple push-ups, squats, and planks help build strength and release endorphins.",
    image: "https://images.unsplash.com/photo-1571019613-43454-1cb3f90b78ae?auto=format&fit=crop&q=80&w=2670",
  },
];

const mentalExercises = [
  {
    title: "Deep Breathing (Box Breathing)",
    description: "Inhale for 4 sec → Hold for 4 sec → Exhale for 4 sec → Hold for 4 sec. Reduces stress instantly.",
    image: "https://images.unsplash.com/photo-1594967399434-d02161f38e07?auto=format&fit=crop&q=80&w=2670",
  },
  {
    title: "Mindful Journaling",
    description: "Spend 10 mins writing down thoughts/feelings. Improves clarity and reduces overthinking.",
    image: "https://images.unsplash.com/photo-1549424888-00e704812328?auto=format&fit=crop&q=80&w=2670",
  },
  {
    title: "Guided Meditation",
    description: "Short 10–15 min meditation sessions enhance focus and calm the nervous system.",
    image: "https://images.unsplash.com/photo-1538356230-043-41c3046f82c4?auto=format&fit=crop&q=80&w=2670",
  },
  {
    title: "Gratitude Practice",
    description: "Write down 3 things you’re grateful for daily. Helps shift focus from stress to positivity.",
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f6e914?auto=format&fit=crop&q=80&w=2670",
  },
];

const renderContent = (activePage, healthType, setHealthType) => {
  const fallbackImage = 'https://via.placeholder.com/600x400.png?text=Image+Not+Found';

  switch (activePage) {
    case "profile":
      return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* 1. User Profile Card */}
          <Card className="md:col-span-2 lg:col-span-3 bg-white/70 backdrop-blur-sm shadow-lg border-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="text-left">
                <CardTitle className="text-2xl font-bold text-gray-800">
                  Welcome, {mockUserData.name}!
                </CardTitle>
                <CardDescription className="text-sm text-gray-500 mt-1">
                  Your personal wellness overview
                </CardDescription>
              </div>
              <Avatar className="h-20 w-20 shadow-md">
                <AvatarImage
                  src={mockUserData.avatarUrl}
                  alt={mockUserData.name}
                />
                <AvatarFallback>{mockUserData.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </CardHeader>
            <CardContent className="mt-4 text-gray-700 space-y-2">
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-gray-600">Age:</span>{" "}
                <span className="flex-grow">{mockUserData.age}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-gray-600">Email:</span>{" "}
                <span className="flex-grow">{mockUserData.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-gray-600">
                  Current Mental State:
                </span>{" "}
                <span className="text-green-600 font-bold flex-grow">
                  {mockUserData.mentalHealth}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* 2. Health Metrics Card */}
          <Card className="bg-white/70 backdrop-blur-sm shadow-lg border-none">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-800">
                Health Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700">
              <div className="flex items-center space-x-3">
                <HeartPulse className="h-5 w-5 text-red-500" />
                <span className="font-semibold">Blood Pressure:</span>
                <span>{mockUserData.healthMetrics.bloodPressure}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Syringe className="h-5 w-5 text-blue-500" />
                <span className="font-semibold">Sugar Level:</span>
                <span>{mockUserData.healthMetrics.sugarLevel}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Weight className="h-5 w-5 text-green-500" />
                <span className="font-semibold">Weight:</span>
                <span>{mockUserData.healthMetrics.weight}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Ruler className="h-5 w-5 text-indigo-500" />
                <span className="font-semibold">Height:</span>
                <span>{mockUserData.healthMetrics.height}</span>
              </div>
            </CardContent>
          </Card>

          {/* 3. Wellness Progress Chart Card */}
          <Card className="md:col-span-2 bg-white/70 backdrop-blur-sm shadow-lg border-none">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-800">
                Monthly Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={progressData}>
                  <defs>
                    <linearGradient id="colorProgress" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="progress"
                    stroke="#8884d8"
                    fillOpacity={1}
                    fill="url(#colorProgress)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      );
    case "sessions":
      return (
        <Card className="bg-white/70 backdrop-blur-sm shadow-lg border-none">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-gray-800">
              Therapy Session History
            </CardTitle>
            <CardDescription>
              A record of your past and upcoming therapy sessions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Therapist</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {therapySessionsData.map((session, index) => (
                  <TableRow key={index}>
                    <TableCell>{session.date}</TableCell>
                    <TableCell>{session.time}</TableCell>
                    <TableCell>{session.therapist}</TableCell>
                    <TableCell>{session.notes}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      );
    case "progress":
      return (
        <Card className="bg-white/70 backdrop-blur-sm shadow-lg border-none">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-gray-800">
              Your Wellness Progress
            </CardTitle>
            <CardDescription>
              This chart reflects your progress based on your completed exercises and feedback.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={progressData}>
                <defs>
                  <linearGradient id="colorProgress" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="progress"
                  stroke="#8884d8"
                  fillOpacity={1}
                  fill="url(#colorProgress)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      );
    case "reports":
      return (
        <p className="text-center text-lg text-gray-600 mt-8">
          📄 All your reports will be available here.
        </p>
      );
    case "fitme":
      const exercises =
        healthType === "physical"
          ? physicalExercises
          : mentalExercises;
      return (
        <div className="flex flex-col items-center space-y-8 px-4 md:px-8">
          <div className="w-full flex justify-center">
            <ToggleGroup
              type="single"
              value={healthType}
              onValueChange={setHealthType}
              className="bg-white/70 backdrop-blur-sm rounded-full p-1"
            >
              <ToggleGroupItem
                value="physical"
                className={`flex-1 rounded-full px-6 py-2 transition-colors duration-200 ${
                  healthType === "physical"
                    ? "bg-purple-500 text-white shadow-md hover:bg-purple-600"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Dumbbell className="mr-2 h-4 w-4" />
                Physical Health
              </ToggleGroupItem>
              <ToggleGroupItem
                value="mental"
                className={`flex-1 rounded-full px-6 py-2 transition-colors duration-200 ${
                  healthType === "mental"
                    ? "bg-purple-500 text-white shadow-md hover:bg-purple-600"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Brain className="mr-2 h-4 w-4" />
                Mental Health
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {exercises.map((item, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden h-64 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => { e.target.onerror = null; e.target.src=fallbackImage }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-0 transition-all duration-300" />
                <div className="relative z-10 p-6 flex flex-col justify-end h-full">
                  <div className="opacity-100 group-hover:opacity-0 transition-opacity duration-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-center w-full px-4">
                    <CardTitle className="text-xl font-bold drop-shadow-lg">
                      {item.title}
                    </CardTitle>
                  </div>
                  <div className="transform translate-y-20 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 text-white">
                    <CardTitle className="text-2xl font-bold">
                      {item.title}
                    </CardTitle>
                    <CardDescription className="text-md text-gray-200 mt-2">
                      {item.description}
                    </CardDescription>
                    <Button
                      variant="outline"
                      className="mt-4 text-white border-white hover:bg-white hover:text-purple-600"
                    >
                      Learn More
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      );
    default:
      return null;
  }
};

export default function UserDashboard() {
  const [activePage, setActivePage] = useState("profile");
  const [healthType, setHealthType] = useState("physical");


  useEffect(() => {
    const savedPage = localStorage.getItem("activePage");
    if (savedPage) {
      setActivePage(savedPage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("activePage", activePage);
  }, [activePage]);

  const handlePageChange = (pageId) => {
    setActivePage(pageId);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-purple-50 to-indigo-100 font-sans">
      {/* Sidebar - Z */}
      <div className="relative group">
        <div
          className="bg-white/70 backdrop-blur-sm shadow-xl h-full border-r border-gray-200 transition-all duration-300 w-16 hover:w-60 flex flex-col fixed z-50"
          onMouseEnter={() => {}}
          onMouseLeave={() => {}}
        >
          <div className="flex items-center justify-center p-4 h-16 border-b border-gray-200">
            <h2 className="font-bold text-xl text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              My Wellness
            </h2>
          </div>

          <nav className="flex-1 px-2 py-4 space-y-1">
            {menuItems.map((item) => (
              <Button
                key={item.id}
                variant={activePage === item.id ? "secondary" : "ghost"}
                className={`w-full justify-start text-gray-700 hover:bg-purple-100 hover:text-purple-700 transition-colors duration-200 ${
                  activePage === item.id ? "bg-purple-200 text-purple-800" : ""
                }`}
                onClick={() => handlePageChange(item.id)}
              >
                <item.icon className="h-5 w-5 mr-0 group-hover:mr-2 transition-all duration-200" />
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.label}
                </span>
              </Button>
            ))}
          </nav>

          <div className="p-4 border-t border-gray-200">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-700 hover:bg-purple-100"
                >
                  <MoreHorizontal className="h-5 w-5 mr-0 group-hover:mr-2 transition-all duration-200" />
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    More
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="right"
                className="bg-white/90 backdrop-blur-sm"
              >
                <DropdownMenuItem className="hover:bg-purple-100">
                  Profile Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-purple-100">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

 
      <div className="flex-1 flex flex-col p-8 ml-16 transition-all duration-300 group-hover:ml-60">
        <header className="flex justify-between items-center pb-6">
          <h1 className="text-3xl font-extrabold text-gray-900">Dashboard</h1>
        </header>
        <main className="flex-1 overflow-y-auto">
          {renderContent(activePage, healthType, setHealthType)}
        </main>
      </div>
    </div>
  );
}