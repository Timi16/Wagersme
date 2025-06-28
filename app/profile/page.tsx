"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Shield,
  Bell,
  CreditCard,
  Eye,
  EyeOff,
  Camera,
  Settings,
  Award,
  TrendingUp,
  Target,
  Star
} from "lucide-react"
import { useState } from "react"

const achievements = [
  { 
    id: 1, 
    name: "First Win", 
    description: "Won your first prediction", 
    icon: "🎯", 
    earned: true,
    date: "Jan 15, 2024"
  },
  { 
    id: 2, 
    name: "Streak Master", 
    description: "5 consecutive wins", 
    icon: "🔥", 
    earned: true,
    date: "Feb 22, 2024"
  },
  { 
    id: 3, 
    name: "High Roller", 
    description: "Placed a bet over $500", 
    icon: "💎", 
    earned: true,
    date: "Mar 8, 2024"
  },
  { 
    id: 4, 
    name: "Market Expert", 
    description: "70% win rate over 20 bets", 
    icon: "🧠", 
    earned: false,
    progress: 85
  },
  { 
    id: 5, 
    name: "Diversified", 
    description: "Bet in 5 different categories", 
    icon: "🌟", 
    earned: true,
    date: "May 12, 2024"
  },
  { 
    id: 6, 
    name: "Big Winner", 
    description: "Win over $1000 in total", 
    icon: "👑", 
    earned: false,
    progress: 72
  }
]

const recentActivity = [
  {
    id: 1,
    type: "bet_placed",
    title: "Placed bet on Bitcoin prediction",
    amount: 150,
    time: "2 hours ago"
  },
  {
    id: 2,
    type: "bet_won",
    title: "Won S&P 500 prediction",
    amount: 175,
    time: "1 day ago"
  },
  {
    id: 3,
    type: "profile_updated",
    title: "Updated profile information",
    time: "3 days ago"
  },
  {
    id: 4,
    type: "bet_placed",
    title: "Placed bet on Apple foldable iPhone",
    amount: 200,
    time: "5 days ago"
  }
]

export default function ProfilePage() {
  const [showBalance, setShowBalance] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    marketing: true
  })

  const userStats = {
    totalBets: 45,
    winRate: 64,
    totalEarnings: 12450,
    rank: 127,
    joinDate: "January 2024"
  }

  return (
    <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8 max-w-7xl">
      {/* Header - Mobile First */}
      <div className="flex flex-col gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-blue-600">My Profile</h1>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">Manage your account settings and preferences</p>
          </div>
          <Button 
            onClick={() => setIsEditing(!isEditing)}
            className="bg-orange-500 hover:bg-orange-600 text-white w-full sm:w-auto"
            size="sm"
          >
            <Settings className="h-4 w-4 mr-2" />
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </Button>
        </div>
      </div>

      {/* Mobile First Layout */}
      <div className="space-y-6 lg:grid lg:grid-cols-3 lg:gap-8 lg:space-y-0">
        {/* Profile Overview - Mobile: Full width, Desktop: 1/3 */}
        <div className="space-y-4 sm:space-y-6 lg:col-span-1">
          {/* Profile Card */}
          <Card className="shadow-sm">
            <CardContent className="pt-4 sm:pt-6">
              <div className="flex flex-col items-center space-y-3 sm:space-y-4">
                <div className="relative">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-blue-600 rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold text-white">
                    AO
                  </div>
                  <Button 
                    size="sm" 
                    className="absolute -bottom-1 -right-1 h-7 w-7 sm:h-8 sm:w-8 rounded-full p-0 bg-orange-500 hover:bg-orange-600"
                  >
                    <Camera className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                </div>
                <div className="text-center">
                  <h3 className="text-lg sm:text-xl font-semibold">Alex Okafor</h3>
                  <p className="text-gray-600 text-sm">@alexokafor</p>
                  <Badge className="mt-2 bg-gray-100 text-gray-800 hover:bg-gray-200 text-xs">
                    <Star className="h-3 w-3 mr-1" />
                    Premium Member
                  </Badge>
                </div>
              </div>
              
              {/* Stats Grid - Mobile: 2 columns, Desktop: 1 column */}
              <div className="mt-4 sm:mt-6 grid grid-cols-2 gap-3 sm:gap-0 sm:grid-cols-1 sm:space-y-3">
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-gray-600">Member since</span>
                  <span className="font-medium">{userStats.joinDate}</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-gray-600">Total Bets</span>
                  <span className="font-medium">{userStats.totalBets}</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-gray-600">Win Rate</span>
                  <span className="font-medium text-green-600">{userStats.winRate}%</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-gray-600">Global Rank</span>
                  <span className="font-medium">#{userStats.rank}</span>
                </div>
                <div className="flex justify-between items-center col-span-2 sm:col-span-1 text-sm sm:text-base">
                  <span className="text-gray-600">Balance</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">
                      {showBalance ? `$${userStats.totalEarnings.toLocaleString()}` : '****'}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={() => setShowBalance(!showBalance)}
                    >
                      {showBalance ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base sm:text-lg">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="text-sm">This Month</span>
                </div>
                <span className="font-medium text-green-600">+$2,850</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">Active Bets</span>
                </div>
                <span className="font-medium">8</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-orange-500" />
                  <span className="text-sm">Achievements</span>
                </div>
                <span className="font-medium">4/6</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content - Mobile: Full width, Desktop: 2/3 */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="personal" className="w-full">
            {/* Mobile Optimized Tab List */}
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto p-1 mb-4 sm:mb-6">
              <TabsTrigger value="personal" className="flex flex-col sm:flex-row items-center gap-1 py-2 px-2 text-xs sm:text-sm">
                <User className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Personal Info</span>
                <span className="sm:hidden">Personal</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="flex flex-col sm:flex-row items-center gap-1 py-2 px-2 text-xs sm:text-sm">
                <Shield className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>Security</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex flex-col sm:flex-row items-center gap-1 py-2 px-2 text-xs sm:text-sm">
                <Bell className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Notifications</span>
                <span className="sm:hidden">Alerts</span>
              </TabsTrigger>
              <TabsTrigger value="achievements" className="flex flex-col sm:flex-row items-center gap-1 py-2 px-2 text-xs sm:text-sm">
                <Award className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Achievements</span>
                <span className="sm:hidden">Awards</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="personal">
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">First Name</label>
                      <Input 
                        defaultValue="Alex" 
                        disabled={!isEditing}
                        className={!isEditing ? "bg-gray-50" : ""}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Last Name</label>
                      <Input 
                        defaultValue="Okafor" 
                        disabled={!isEditing}
                        className={!isEditing ? "bg-gray-50" : ""}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email Address
                    </label>
                    <Input 
                      type="email" 
                      defaultValue="alex.okafor@email.com" 
                      disabled={!isEditing}
                      className={!isEditing ? "bg-gray-50" : ""}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Phone Number
                    </label>
                    <Input 
                      type="tel" 
                      defaultValue="+234 813 456 7890" 
                      disabled={!isEditing}
                      className={!isEditing ? "bg-gray-50" : ""}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Location
                    </label>
                    <Input 
                      defaultValue="Lagos, Nigeria" 
                      disabled={!isEditing}
                      className={!isEditing ? "bg-gray-50" : ""}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Date of Birth
                    </label>
                    <Input 
                      type="date" 
                      defaultValue="1995-03-15" 
                      disabled={!isEditing}
                      className={!isEditing ? "bg-gray-50" : ""}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security">
              <div className="space-y-4 sm:space-y-6">
                <Card className="shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">Password & Security</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 sm:space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Current Password</label>
                      <Input type="password" placeholder="Enter current password" />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">New Password</label>
                      <Input type="password" placeholder="Enter new password" />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Confirm New Password</label>
                      <Input type="password" placeholder="Confirm new password" />
                    </div>
                    
                    <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
                      Update Password
                    </Button>
                  </CardContent>
                </Card>

                <Card className="shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">Two-Factor Authentication</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 sm:p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">SMS Authentication</h4>
                        <p className="text-sm text-gray-600">Get codes via SMS to your phone</p>
                      </div>
                      <Badge variant="outline" className="text-green-600 border-green-600 w-fit">
                        Enabled
                      </Badge>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 sm:p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">Authenticator App</h4>
                        <p className="text-sm text-gray-600">Use Google Authenticator or similar apps</p>
                      </div>
                      <Button variant="outline" size="sm" className="w-full sm:w-auto">
                        Setup
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">Account Security</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 sm:p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">Login Notifications</h4>
                        <p className="text-sm text-gray-600">Get notified of new logins</p>
                      </div>
                      <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600" />
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 sm:p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">Account Recovery</h4>
                        <p className="text-sm text-gray-600 break-all sm:break-normal">Backup email: alex.backup@email.com</p>
                      </div>
                      <Button variant="outline" size="sm" className="w-full sm:w-auto">
                        Update
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="notifications">
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">Notification Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6">
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 sm:p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">Email Notifications</h4>
                        <p className="text-sm text-gray-600">Bet updates, wins, and market alerts</p>
                      </div>
                      <input 
                        type="checkbox" 
                        checked={notifications.email}
                        onChange={(e) => setNotifications({...notifications, email: e.target.checked})}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600" 
                      />
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 sm:p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">Push Notifications</h4>
                        <p className="text-sm text-gray-600">Real-time alerts on your device</p>
                      </div>
                      <input 
                        type="checkbox" 
                        checked={notifications.push}
                        onChange={(e) => setNotifications({...notifications, push: e.target.checked})}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600" 
                      />
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 sm:p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">SMS Notifications</h4>
                        <p className="text-sm text-gray-600">Important updates via text message</p>
                      </div>
                      <input 
                        type="checkbox" 
                        checked={notifications.sms}
                        onChange={(e) => setNotifications({...notifications, sms: e.target.checked})}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600" 
                      />
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 sm:p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">Marketing Communications</h4>
                        <p className="text-sm text-gray-600">Tips, promotions, and new features</p>
                      </div>
                      <input 
                        type="checkbox" 
                        checked={notifications.marketing}
                        onChange={(e) => setNotifications({...notifications, marketing: e.target.checked})}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600" 
                      />
                    </div>
                  </div>
                  
                  <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
                    Save Preferences
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="achievements">
              <div className="space-y-4 sm:space-y-6">
                <Card className="shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">Your Achievements</CardTitle>
                    <p className="text-gray-600 text-sm">Unlock badges by reaching milestones</p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-4">
                      {achievements.map((achievement) => (
                        <div 
                          key={achievement.id} 
                          className={`p-3 sm:p-4 border rounded-lg ${achievement.earned ? 'bg-green-50 border-green-200' : 'bg-gray-50'}`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`text-2xl flex-shrink-0 ${achievement.earned ? '' : 'grayscale opacity-50'}`}>
                              {achievement.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className={`font-medium ${achievement.earned ? 'text-green-700' : 'text-gray-600'}`}>
                                {achievement.name}
                              </h4>
                              <p className="text-sm text-gray-600 mb-2">
                                {achievement.description}
                              </p>
                              {achievement.earned ? (
                                <Badge variant="outline" className="text-green-600 border-green-600 text-xs">
                                  Earned {achievement.date}
                                </Badge>
                              ) : (
                                <div className="space-y-1">
                                  <div className="flex justify-between text-xs">
                                    <span className="text-gray-600">Progress</span>
                                    <span className="font-medium">{achievement.progress}%</span>
                                  </div>
                                  <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div 
                                      className="bg-blue-600 h-2 rounded-full transition-all" 
                                      style={{ width: `${achievement.progress}%` }}
                                    />
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 sm:space-y-4">
                      {recentActivity.map((activity) => (
                        <div key={activity.id} className="flex items-center gap-3 p-3 border rounded-lg">
                          <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                            activity.type === 'bet_won' ? 'bg-green-500' :
                            activity.type === 'bet_placed' ? 'bg-blue-600' :
                            'bg-gray-600'
                          }`} />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate sm:text-clip">{activity.title}</p>
                            <p className="text-xs text-gray-600">{activity.time}</p>
                          </div>
                          {activity.amount && (
                            <div className={`text-sm font-medium flex-shrink-0 ${
                              activity.type === 'bet_won' ? 'text-green-600' : 'text-blue-600'
                            }`}>
                              {activity.type === 'bet_won' ? '+' : '-'}${activity.amount}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}