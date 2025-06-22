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
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary">My Profile</h1>
          <p className="text-neutral-dark mt-1">Manage your account settings and preferences</p>
        </div>
        <Button 
          onClick={() => setIsEditing(!isEditing)}
          className="bg-accent hover:bg-accent-dark"
        >
          <Settings className="h-4 w-4 mr-2" />
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Overview */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center text-2xl font-bold text-white">
                    AO
                  </div>
                  <Button 
                    size="sm" 
                    className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full p-0 bg-accent hover:bg-accent-dark"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold">Alex Okafor</h3>
                  <p className="text-neutral-dark">@alexokafor</p>
                  <Badge className="mt-2 bg-secondary hover:bg-secondary">
                    <Star className="h-3 w-3 mr-1" />
                    Premium Member
                  </Badge>
                </div>
              </div>
              
              <div className="mt-6 space-y-3">
                <div className="flex justify-between">
                  <span className="text-neutral-dark">Member since</span>
                  <span className="font-medium">{userStats.joinDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-dark">Total Bets</span>
                  <span className="font-medium">{userStats.totalBets}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-dark">Win Rate</span>
                  <span className="font-medium text-success">{userStats.winRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-dark">Global Rank</span>
                  <span className="font-medium">#{userStats.rank}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-dark">Balance</span>
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
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-success" />
                  <span className="text-sm">This Month</span>
                </div>
                <span className="font-medium text-success">+$2,850</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-primary" />
                  <span className="text-sm">Active Bets</span>
                </div>
                <span className="font-medium">8</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-accent" />
                  <span className="text-sm">Achievements</span>
                </div>
                <span className="font-medium">4/6</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="personal">
                <User className="h-4 w-4 mr-2" />
                Personal Info
              </TabsTrigger>
              <TabsTrigger value="security">
                <Shield className="h-4 w-4 mr-2" />
                Security
              </TabsTrigger>
              <TabsTrigger value="notifications">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="achievements">
                <Award className="h-4 w-4 mr-2" />
                Achievements
              </TabsTrigger>
            </TabsList>

            <TabsContent value="personal">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">First Name</label>
                      <Input 
                        defaultValue="Alex" 
                        disabled={!isEditing}
                        className={!isEditing ? "bg-neutral-light" : ""}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Last Name</label>
                      <Input 
                        defaultValue="Okafor" 
                        disabled={!isEditing}
                        className={!isEditing ? "bg-neutral-light" : ""}
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
                      className={!isEditing ? "bg-neutral-light" : ""}
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
                      className={!isEditing ? "bg-neutral-light" : ""}
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
                      className={!isEditing ? "bg-neutral-light" : ""}
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
                      className={!isEditing ? "bg-neutral-light" : ""}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Password & Security</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
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
                    
                    <Button className="bg-primary hover:bg-primary-dark">
                      Update Password
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Two-Factor Authentication</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">SMS Authentication</h4>
                        <p className="text-sm text-neutral-dark">Get codes via SMS to your phone</p>
                      </div>
                      <Badge variant="outline" className="text-success border-success">
                        Enabled
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">Authenticator App</h4>
                        <p className="text-sm text-neutral-dark">Use Google Authenticator or similar apps</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Setup
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Account Security</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">Login Notifications</h4>
                        <p className="text-sm text-neutral-dark">Get notified of new logins</p>
                      </div>
                      <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">Account Recovery</h4>
                        <p className="text-sm text-neutral-dark">Backup email: alex.backup@email.com</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Update
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">Email Notifications</h4>
                        <p className="text-sm text-neutral-dark">Bet updates, wins, and market alerts</p>
                      </div>
                      <input 
                        type="checkbox" 
                        checked={notifications.email}
                        onChange={(e) => setNotifications({...notifications, email: e.target.checked})}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" 
                      />
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">Push Notifications</h4>
                        <p className="text-sm text-neutral-dark">Real-time alerts on your device</p>
                      </div>
                      <input 
                        type="checkbox" 
                        checked={notifications.push}
                        onChange={(e) => setNotifications({...notifications, push: e.target.checked})}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" 
                      />
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">SMS Notifications</h4>
                        <p className="text-sm text-neutral-dark">Important updates via text message</p>
                      </div>
                      <input 
                        type="checkbox" 
                        checked={notifications.sms}
                        onChange={(e) => setNotifications({...notifications, sms: e.target.checked})}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" 
                      />
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">Marketing Communications</h4>
                        <p className="text-sm text-neutral-dark">Tips, promotions, and new features</p>
                      </div>
                      <input 
                        type="checkbox" 
                        checked={notifications.marketing}
                        onChange={(e) => setNotifications({...notifications, marketing: e.target.checked})}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" 
                      />
                    </div>
                  </div>
                  
                  <Button className="bg-primary hover:bg-primary-dark">
                    Save Preferences
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="achievements">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Achievements</CardTitle>
                    <p className="text-neutral-dark">Unlock badges by reaching milestones</p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {achievements.map((achievement) => (
                        <div 
                          key={achievement.id} 
                          className={`p-4 border rounded-lg ${achievement.earned ? 'bg-success/5 border-success/20' : 'bg-neutral-light/50'}`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`text-2xl ${achievement.earned ? '' : 'grayscale opacity-50'}`}>
                              {achievement.icon}
                            </div>
                            <div className="flex-1">
                              <h4 className={`font-medium ${achievement.earned ? 'text-success' : 'text-neutral-dark'}`}>
                                {achievement.name}
                              </h4>
                              <p className="text-sm text-neutral-dark mb-2">
                                {achievement.description}
                              </p>
                              {achievement.earned ? (
                                <Badge variant="outline" className="text-success border-success text-xs">
                                  Earned {achievement.date}
                                </Badge>
                              ) : (
                                <div className="space-y-1">
                                  <div className="flex justify-between text-xs">
                                    <span className="text-neutral-dark">Progress</span>
                                    <span className="font-medium">{achievement.progress}%</span>
                                  </div>
                                  <div className="w-full bg-neutral-light rounded-full h-2">
                                    <div 
                                      className="bg-primary h-2 rounded-full transition-all" 
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

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity.map((activity) => (
                        <div key={activity.id} className="flex items-center gap-3 p-3 border rounded-lg">
                          <div className={`w-2 h-2 rounded-full ${
                            activity.type === 'bet_won' ? 'bg-success' :
                            activity.type === 'bet_placed' ? 'bg-primary' :
                            'bg-neutral-dark'
                          }`} />
                          <div className="flex-1">
                            <p className="text-sm font-medium">{activity.title}</p>
                            <p className="text-xs text-neutral-dark">{activity.time}</p>
                          </div>
                          {activity.amount && (
                            <div className={`text-sm font-medium ${
                              activity.type === 'bet_won' ? 'text-success' : 'text-primary'
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