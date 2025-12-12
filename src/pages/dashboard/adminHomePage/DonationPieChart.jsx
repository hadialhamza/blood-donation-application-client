import React from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Label,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  RadialBar,
  RadialBarChart,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  TrendingUp,
  TrendingDown,
  Users,
  Heart,
  DollarSign,
  Activity,
  Target,
  Clock,
  BarChart3,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  Zap,
  Sparkles,
  Award,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// --- 1. PIE CHART - Donation Status ---
export const DonationPieChart = ({ stats }) => {
  const data = [
    {
      status: "Completed",
      visitors: 0,
      fill: "#10b981",
      gradient: "from-emerald-500 to-green-500",
      icon: <TrendingUp className="w-4 h-4" />,
    },
    {
      status: "Pending",
      visitors: 0,
      fill: "#f59e0b",
      gradient: "from-amber-500 to-orange-500",
      icon: <Clock className="w-4 h-4" />,
    },
    {
      status: "Canceled",
      visitors: 0,
      fill: "#ef4444",
      gradient: "from-red-500 to-rose-500",
      icon: <TrendingDown className="w-4 h-4" />,
    },
    {
      status: "Inprogress",
      visitors: 0,
      fill: "#3b82f6",
      gradient: "from-blue-500 to-indigo-500",
      icon: <Activity className="w-4 h-4" />,
    },
  ];

  if (stats.statusStats) {
    stats.statusStats.forEach((item) => {
      const index = data.findIndex(
        (p) => p.status.toLowerCase() === item._id.toLowerCase()
      );
      if (index !== -1) data[index].visitors = item.count;
      else if (item._id === "inprogress") data[3].visitors = item.count;
    });
  }

  const totalRequests = data.reduce((sum, item) => sum + item.visitors, 0);

  return (
    <Card className="border-red-100 dark:border-red-900 shadow-lg overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-amber-500 to-red-500" />
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <PieChartIcon className="w-5 h-5 text-emerald-600" />
              Donation Status
            </CardTitle>
            <CardDescription>Distribution of blood requests</CardDescription>
          </div>
          <Badge className="bg-gradient-to-r from-emerald-600 to-green-600 text-white">
            {totalRequests} Total
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart */}
          <div className="lg:col-span-2">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Tooltip
                  contentStyle={{
                    background: "rgba(255, 255, 255, 0.95)",
                    border: "1px solid #fecaca",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                />
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="visitors"
                  nameKey="status"
                  strokeWidth={3}
                  stroke="#fff"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-zinc-900 dark:fill-white"
                >
                  <tspan x="50%" y="45%" className="text-3xl font-bold">
                    {totalRequests}
                  </tspan>
                  <tspan
                    x="50%"
                    y="55%"
                    className="text-sm fill-zinc-500 dark:fill-zinc-400"
                  >
                    Requests
                  </tspan>
                </text>
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="space-y-4">
            <div className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Breakdown
            </div>
            {data.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900/50"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-3 h-3 rounded-full bg-gradient-to-r ${item.gradient}`}
                  ></div>
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <span className="font-medium">{item.status}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-zinc-900 dark:text-white">
                    {item.visitors}
                  </div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">
                    {totalRequests > 0
                      ? ((item.visitors / totalRequests) * 100).toFixed(1)
                      : 0}
                    %
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t border-zinc-100 dark:border-zinc-800 pt-4">
        <div className="flex items-center justify-between w-full">
          <div className="text-sm text-zinc-500 dark:text-zinc-400">
            <Target className="w-4 h-4 inline mr-1" />
            Target: 95% completion rate
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-red-600 dark:text-red-400"
          >
            View Details
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

// --- 2. REVENUE AREA CHART ---
export const RevenueAreaChart = () => {
  const data = [
    { month: "Jan", revenue: 1860, request: 80 },
    { month: "Feb", revenue: 3050, request: 200 },
    { month: "Mar", revenue: 2370, request: 120 },
    { month: "Apr", revenue: 1730, request: 190 },
    { month: "May", revenue: 4090, request: 130 },
    { month: "Jun", revenue: 5140, request: 140 },
    { month: "Jul", revenue: 3890, request: 180 },
    { month: "Aug", revenue: 4670, request: 220 },
  ];

  return (
    <Card className="border-red-100 dark:border-red-900 shadow-lg overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 to-red-500" />
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <LineChartIcon className="w-5 h-5 text-rose-600" />
              Revenue Analytics
            </CardTitle>
            <CardDescription>Monthly funding vs request volume</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-gradient-to-r from-rose-600 to-red-600 text-white">
              <Zap className="w-3 h-3 mr-1" />
              +24% Growth
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="colorRequest" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e5e7eb"
              opacity={0.3}
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6b7280" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6b7280" }}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip
              contentStyle={{
                background: "rgba(255, 255, 255, 0.95)",
                border: "1px solid #fecaca",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
              formatter={(value, name) => [
                name === "revenue" ? `$${value}` : value,
                name === "revenue" ? "Revenue" : "Requests",
              ]}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#f43f5e"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
            <Area
              type="monotone"
              dataKey="request"
              stroke="#3b82f6"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorRequest)"
            />
            <Legend
              verticalAlign="top"
              height={36}
              iconType="circle"
              iconSize={10}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
      <CardFooter className="border-t border-zinc-100 dark:border-zinc-800 pt-4">
        <div className="grid grid-cols-2 gap-4 w-full">
          <div className="text-center p-3 rounded-lg bg-rose-50 dark:bg-rose-900/20">
            <div className="text-2xl font-bold text-rose-600 dark:text-rose-400">
              $24.8K
            </div>
            <div className="text-sm text-zinc-600 dark:text-zinc-400">
              Total Revenue
            </div>
          </div>
          <div className="text-center p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              1.2K
            </div>
            <div className="text-sm text-zinc-600 dark:text-zinc-400">
              Total Requests
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

// --- 3. USER BAR CHART ---
export const UserBarChart = ({ stats }) => {
  const data = [
    {
      status: "Active",
      count: 0,
      fill: "#10b981",
      gradient: "from-emerald-500 to-green-500",
    },
    {
      status: "Blocked",
      count: 0,
      fill: "#ef4444",
      gradient: "from-red-500 to-rose-500",
    },
    {
      status: "Pending",
      count: stats?.pendingUsers || 0,
      fill: "#f59e0b",
      gradient: "from-amber-500 to-orange-500",
    },
  ];

  if (stats.userStats) {
    stats.userStats.forEach((item) => {
      if (item._id === "active") data[0].count = item.count;
      if (item._id === "blocked") data[1].count = item.count;
    });
  }

  const totalUsers = data.reduce((sum, item) => sum + item.count, 0);

  return (
    <Card className="border-red-100 dark:border-red-900 shadow-lg overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-amber-500 to-red-500" />
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              User Status Distribution
            </CardTitle>
            <CardDescription>Account health overview</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <Users className="w-3 h-3 mr-1" />
              {totalUsers} Users
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e5e7eb"
                  opacity={0.3}
                  vertical={false}
                />
                <XAxis
                  dataKey="status"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6b7280" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6b7280" }}
                />
                <Tooltip
                  contentStyle={{
                    background: "rgba(255, 255, 255, 0.95)",
                    border: "1px solid #fecaca",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                  formatter={(value) => [value, "Users"]}
                />
                <Bar dataKey="count" radius={[8, 8, 0, 0]} barSize={60}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Stats Summary */}
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                    {data[0].count}
                  </div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400">
                    Active Users
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                  <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                    {data[2].count}
                  </div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400">
                    Pending
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                  <TrendingDown className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                    {data[1].count}
                  </div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400">
                    Blocked
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// --- 4. GROWTH RADIAL CHART ---
export const GrowthRadialChart = () => {
  const data = [
    {
      name: "Donors",
      value: 85,
      fill: "#3b82f6",
      gradient: "from-blue-500 to-indigo-500",
    },
    {
      name: "Volunteers",
      value: 60,
      fill: "#8b5cf6",
      gradient: "from-purple-500 to-violet-500",
    },
    {
      name: "Admins",
      value: 45,
      fill: "#10b981",
      gradient: "from-emerald-500 to-green-500",
    },
    {
      name: "Hospitals",
      value: 70,
      fill: "#f59e0b",
      gradient: "from-amber-500 to-orange-500",
    },
  ];

  return (
    <Card className="border-red-100 dark:border-red-900 shadow-lg overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-amber-500" />
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-600" />
              Platform Engagement
            </CardTitle>
            <CardDescription>Monthly engagement metrics</CardDescription>
          </div>
          <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <Sparkles className="w-3 h-3 mr-1" />
            Performance
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={250}>
              <RadialBarChart
                innerRadius="20%"
                outerRadius="90%"
                data={data}
                startAngle={180}
                endAngle={0}
                margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
              >
                <RadialBar
                  minAngle={15}
                  background
                  clockWise={true}
                  dataKey="value"
                  cornerRadius={10}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </RadialBar>
                <Tooltip
                  contentStyle={{
                    background: "rgba(255, 255, 255, 0.95)",
                    border: "1px solid #fecaca",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                  formatter={(value) => [`${value}%`, "Engagement"]}
                />
                <Legend
                  iconSize={10}
                  layout="vertical"
                  verticalAlign="middle"
                  wrapperStyle={{ right: -40 }}
                />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-4">
            {data.map((item, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/50"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-3 h-3 rounded-full bg-gradient-to-r ${item.gradient}`}
                    ></div>
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-24 h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${item.gradient}`}
                        style={{ width: `${item.value}%` }}
                      ></div>
                    </div>
                    <span className="font-bold text-zinc-900 dark:text-white">
                      {item.value}%
                    </span>
                  </div>
                </div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
                  {item.name === "Donors" && "Monthly active donors"}
                  {item.name === "Volunteers" && "Active volunteers this month"}
                  {item.name === "Admins" && "Platform administrators"}
                  {item.name === "Hospitals" && "Partner hospitals engaged"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t border-zinc-100 dark:border-zinc-800 pt-4">
        <div className="w-full text-center">
          <div className="text-sm text-zinc-600 dark:text-zinc-400">
            <Award className="w-4 h-4 inline mr-2" />
            Overall Platform Score:{" "}
            <span className="font-bold text-green-600 dark:text-green-400">
              82/100
            </span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
