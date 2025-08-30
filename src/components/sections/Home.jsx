import React, { useState } from "react";
import {
  User,
  Calendar,
  Activity,
  FileText,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  LineChart,
  BookOpen,
  Users,
  CheckCircle,
  XCircle,
  Star,
  Facebook,
  Twitter,
  Instagram,
  Leaf,
  Mail,
  Home as HomeIcon,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useNavigate } from "react-router-dom";

const COLORS = {
  bg: "#776982",
  card: "#C7B9D6",
  text: "#4B4155",
  highlight: "#9B6EB4",
  lightCard: "#F8F5FB",
  border: "#A597D4",
};

const DashboardContent = () => {
  const navigate = useNavigate(); // ✅ FIX added here

  return (
    <section className="py-20">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1
            className="text-5xl md:text-6xl font-extrabold leading-tight"
            style={{ color: COLORS.lightCard }}
          >
            Start your <span style={{ color: COLORS.card }}>journey</span> to
            better mental wellbeing
          </h1>

          <p
            className="mt-6 max-w-xl text-lg"
            style={{ color: COLORS.lightCard }}
          >
            MindSpace brings short guided practices, daily tracking and
            actionable insights together in one safe place — built to help you
            feel calmer, clearer and more consistent.
          </p>

          <div className="mt-8 flex gap-4 transition-colors duration-75">
            <Button
              className="cursor-pointer"
              style={{ backgroundColor: COLORS.highlight, color: "black" }}
              size="lg"
              onClick={() => navigate("/stepper")}
            >
              Get Started
            </Button>

            <Button
              variant="ghost"
              className="border-2"
              style={{ borderColor: COLORS.border, color: COLORS.lightCard }}
            >
              Learn More
            </Button>
          </div>
        </div>

        <div className="relative">
          <div
            style={{
              background: `linear-gradient(180deg, ${COLORS.card}, rgba(255,255,255,0.06))`,
              border: `1px solid ${COLORS.border}`,
            }}
            className="rounded-3xl p-6 shadow-xl"
          >
            <div className="flex flex-col gap-4">
              <div
                className="text-white font-semibold"
                style={{ color: COLORS.text }}
              >
                Quick Snapshot
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Card style={{ background: COLORS.lightCard }}>
                  <CardContent className="p-4">
                    <div className="text-sm">Daily Mood</div>
                    <div className="text-xl font-bold">Good</div>
                  </CardContent>
                </Card>

                <Card style={{ background: COLORS.lightCard }}>
                  <CardContent className="p-4">
                    <div className="text-sm">Streak</div>
                    <div className="text-xl font-bold">6 days</div>
                  </CardContent>
                </Card>
              </div>

              <Card style={{ background: COLORS.lightCard }}>
                <CardContent className="p-4">
                  <div className="text-sm text-slate-700">Tip of the day</div>
                  <div className="text-base">
                    Take 3 mindful breaths before starting your day.
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeaturesContent = () => {
  const features = [
    {
      icon: <LineChart className="h-10 w-10" />,
      title: "Daily Mood Tracking",
      text: "Capture your mood and understand patterns over time.",
    },
    {
      icon: <BookOpen className="h-10 w-10" />,
      title: "Guided Practices",
      text: "Short practices to help you breathe, relax and refocus.",
    },
    {
      icon: <Users className="h-10 w-10" />,
      title: "Expert Support",
      text: "Access resources and community to support your journey.",
    },
  ];

  const navigate = useNavigate();

  return (
    <section className="py-16">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold" style={{ color: COLORS.lightCard }}>
          Powerful tools, designed for habit
        </h2>
        <p
          className="max-w-2xl mx-auto mt-2"
          style={{ color: COLORS.lightCard }}
        >
          Small daily actions lead to big changes — we make them simple,
          measurable and kind.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <Card
            key={i}
            className="p-6 rounded-2xl hover:shadow-2xl transition transform hover:-translate-y-3"
            style={{ background: "white", border: `1px solid ${COLORS.border}` }}
          >
            <div style={{ color: COLORS.highlight }} className="mb-4">
              {f.icon}
            </div>
            <h3
              className="text-xl font-semibold mb-2"
              style={{ color: COLORS.text }}
            >
              {f.title}
            </h3>
            <p style={{ color: COLORS.text }}>{f.text}</p>
            <div className="mt-4">
              <Button variant="ghost" style={{ color: COLORS.highlight }}>
                Explore
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

const HowItWorksContent = () => {
  const steps = [
    "Answer a short questionnaire so we understand your needs",
    "Get personalized suggestions & short guided sessions",
    "Track progress and adapt with data-driven insights",
  ];

  return (
    <section className="py-16" style={{ background: COLORS.lightCard }}>
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold" style={{ color: COLORS.text }}>
          How it works
        </h2>
        <p
          className="max-w-2xl mx-auto mt-2"
          style={{ color: COLORS.text }}
        >
          Simple, guided, science-aligned steps to help you build better mental
          habits.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {steps.map((s, i) => (
          <div
            key={i}
            className="p-6 rounded-xl"
            style={{
              background: COLORS.card,
              border: `1px solid ${COLORS.border}`,
            }}
          >
            <div
              className="text-sm font-semibold mb-2"
              style={{ color: COLORS.highlight }}
            >
              Step {i + 1}
            </div>
            <div
              className="text-lg font-medium"
              style={{ color: COLORS.text }}
            >
              {s}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const TestimonialsContent = () => {
  const testimonials = [
    {
      quote:
        "MindSpace helped me be aware of my mood triggers — small practices made a big difference.",
      author: "Asha R.",
      role: "Designer",
    },
    {
      quote:
        "The daily check-ins are gentle and effective. Highly recommended.",
      author: "Rahul M.",
      role: "Engineer",
    },
    {
      quote: "Simple, practical, and real — the best stress helper I've tried.",
      author: "Neha P.",
      role: "Teacher",
    },
  ];

  return (
    <section className="py-16">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold" style={{ color: COLORS.lightCard }}>
          Trusted by users
        </h2>
        <p
          className="max-w-2xl mx-auto mt-2"
          style={{ color: COLORS.lightCard }}
        >
          Real stories from people who used small daily practices to get big
          results.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <Card
            key={i}
            className="p-6 rounded-2xl shadow"
            style={{
              background: COLORS.lightCard,
              border: `1px solid ${COLORS.border}`,
            }}
          >
            <CardContent>
              <div className="mb-4">
                <Star style={{ color: COLORS.highlight }} />
              </div>
              <p
                className="italic mb-4"
                style={{ color: COLORS.text }}
              >
                {t.quote}
              </p>
              <div className="font-semibold" style={{ color: COLORS.text }}>
                {t.author}
              </div>
              <div className="text-xs text-muted-foreground">{t.role}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

const ComparisonContent = () => {
  const mindspaceBenefits = [
    "Affordable",
    "Flexible",
    "Daily small practices",
    "On-demand resources",
  ];

  const traditionalCons = [
    "Expensive",
    "Weekly only",
    "Limited access between sessions",
  ];

  return (
    <section className="py-16" style={{ background: COLORS.lightCard }}>
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold" style={{ color: COLORS.text }}>
          MindSpace vs Traditional
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6 items-start">
        <div
          className="p-6 rounded-xl"
          style={{ background: COLORS.card, border: `1px solid ${COLORS.border}` }}
        >
          <h3 style={{ color: COLORS.text }} className="font-semibold mb-4">
            MindSpace
          </h3>
          <ul className="space-y-3">
            {mindspaceBenefits.map((p, i) => (
              <li key={i} className="flex gap-3 items-center">
                <CheckCircle style={{ color: COLORS.highlight }} />{" "}
                <span style={{ color: COLORS.text }}>{p}</span>
              </li>
            ))}
          </ul>
        </div>

        <div
          className="p-6 rounded-xl"
          style={{ background: "white", border: `1px solid ${COLORS.border}` }}
        >
          <h3 style={{ color: COLORS.text }} className="font-semibold mb-4">
            Traditional
          </h3>
          <ul className="space-y-3">
            {traditionalCons.map((p, i) => (
              <li key={i} className="flex gap-3 items-center">
                <XCircle style={{ color: "#e74c3c" }} />{" "}
                <span style={{ color: COLORS.text }}>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

const CTAContent = () => (
  <section className="py-16">
    <div
      className="rounded-2xl p-10 text-center"
      style={{ background: COLORS.highlight }}
    >
      <h2 className="text-3xl md:text-4xl font-bold text-white">
        Ready to try MindSpace?
      </h2>
      <p className="text-white/90 mt-4 max-w-2xl mx-auto">
        Start with a free 7-day trial and see how daily micro-practices can help
        your mood and focus.
      </p>
      <div className="mt-6 flex justify-center gap-4">
        <Button style={{ background: "white", color: COLORS.highlight }} size="lg">
          Start Free Trial
        </Button>
        <Button
          variant="outline"
          style={{ borderColor: "rgba(255,255,255,0.2)", color: "black" }}
        >
          Contact Sales
        </Button>
      </div>
    </div>
  </section>
);

const FooterContent = () => (
  <footer
    style={{ background: COLORS.text, color: "white" }}
    className="py-10"
  >
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-6 items-center">
      <div>
        <div className="text-lg font-bold">MindSpace</div>
        <div className="text-sm mt-1">
          Better daily support for mental wellbeing
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Facebook className="w-6 h-6 cursor-pointer" />
        <Twitter className="w-6 h-6 cursor-pointer" />
        <Instagram className="w-6 h-6 cursor-pointer" />
      </div>
    </div>
    <div className="text-center text-xs mt-6 text-slate-200/80">
      © {new Date().getFullYear()} MindSpace — All rights reserved
    </div>
  </footer>
);

export default function Home() {
  const [collapsed, setCollapsed] = useState(true);
  const [activePage, setActivePage] = useState("dashboard");

  // Define sidebar menu items
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: HomeIcon },
    { id: "features", label: "Features", icon: LineChart },
    { id: "how", label: "How it Works", icon: CheckCircle },
    { id: "testimonials", label: "Testimonials", icon: Star },
    { id: "comparison", label: "Comparison", icon: FileText },
    { id: "cta", label: "Start Trial", icon: Mail },
  ];

  const pageComponents = {
    dashboard: <DashboardContent />,
    features: <FeaturesContent />,
    how: <HowItWorksContent />,
    testimonials: <TestimonialsContent />,
    comparison: <ComparisonContent />,
    cta: <CTAContent />,
  };

  const renderContent = () => {
    const Component = pageComponents[activePage];
    return Component ? Component : <p>Select an option from the sidebar.</p>;
  };

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{ backgroundColor: COLORS.bg }}
    >
      <div className="flex flex-1">
        {/* Sidebar */}
        <div
          className={`group flex flex-col transition-all duration-300 relative z-10 ${
            collapsed ? "w-16" : "w-60"
          }`}
          style={{ backgroundColor: COLORS.card, borderColor: COLORS.border }}
          onMouseEnter={() => setCollapsed(false)}
          onMouseLeave={() => setCollapsed(true)}
        >
          <div className="flex items-center justify-center p-4">
            <h2
              className={`font-bold text-xl overflow-hidden flex whitespace-nowrap transition-all duration-300 ${
                collapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
              }`}
              style={{ color: COLORS.text }}
            >
              <Leaf size={30} />
              Sahaj
            </h2>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 mt-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => setCollapsed(!collapsed)}
              style={{ color: COLORS.text }}
            >
              {collapsed ? <ChevronRight /> : <ChevronLeft />}
            </Button>
          </div>

          {/* Menu */}
          <nav className="flex-1 px-2 py-4 space-y-1">
            {menuItems.map((item) => (
              <Button
                key={item.id}
                variant={activePage === item.id ? "secondary" : "ghost"}
                className="w-full justify-start transition-all"
                onClick={() => setActivePage(item.id)}
                style={{
                  backgroundColor:
                    activePage === item.id ? COLORS.lightCard : "transparent",
                  color: activePage === item.id ? COLORS.text : COLORS.text,
                }}
              >
                <item.icon
                  className={`h-5 w-5 ${!collapsed ? "mr-2" : ""}`}
                />
                <span
                  className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${
                    collapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
                  }`}
                >
                  {item.label}
                </span>
              </Button>
            ))}
          </nav>

          {/* Footer dropdown */}
          <div className="p-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  style={{ color: COLORS.text }}
                >
                  <MoreHorizontal
                    className={`h-5 w-5 ${!collapsed ? "mr-2" : ""}`}
                  />
                  <span
                    className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${
                      collapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
                    }`}
                  >
                    More
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48"
                style={{ background: COLORS.card }}
              >
                <DropdownMenuItem style={{ color: COLORS.text }}>
                  Profile Settings
                </DropdownMenuItem>
                <DropdownMenuItem style={{ color: COLORS.text }}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Main content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
      {/* <FooterContent /> */}
    </div>
  );
}
