import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Plus, 
  Search, 
  Filter, 
  Calendar,
  Clock,
  MapPin,
  Users,
  Star,
  Eye,
  MessageCircle,
  Award,
  Zap,
  Code,
  Briefcase,
  GraduationCap,
  Building2,
  Globe,
  ChevronDown,
  Heart,
  Share2
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '../components/UI/Card';
import Button from '../components/UI/Button';
import { Event } from '../types';

const EventsPage: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [eventType, setEventType] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Mock events data with role-based content
  const mockEvents: Event[] = [
    {
      id: '1',
      title: 'React.js Advanced Workshop',
      description: 'Deep dive into advanced React patterns, performance optimization, and modern hooks. Perfect for developers looking to level up their React skills.',
      organizer: 'TechCorp Inc.',
      organizerId: 'company1',
      date: '2024-03-15T14:00:00Z',
      location: 'Online',
      type: 'workshop',
      maxAttendees: 50,
      currentAttendees: 45,
      imageUrl: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2'
    },
    {
      id: '2',
      title: 'AI/ML Career Fair 2024',
      description: 'Connect with leading AI companies, attend tech talks, and explore career opportunities in machine learning and artificial intelligence.',
      organizer: 'DataScience Hub',
      organizerId: 'company2',
      date: '2024-03-22T10:00:00Z',
      location: 'San Francisco, CA',
      type: 'networking',
      maxAttendees: 200,
      currentAttendees: 128,
      imageUrl: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2'
    },
    {
      id: '3',
      title: 'Full Stack Development Bootcamp',
      description: 'Intensive 3-day bootcamp covering frontend, backend, and deployment. Build a complete web application from scratch.',
      organizer: 'CodeAcademy Pro',
      organizerId: 'company3',
      date: '2024-03-28T09:00:00Z',
      location: 'New York, NY',
      type: 'hackathon',
      maxAttendees: 40,
      currentAttendees: 32,
      imageUrl: 'https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2'
    },
    {
      id: '4',
      title: 'DevOps Best Practices Seminar',
      description: 'Learn industry best practices for CI/CD, containerization, and cloud deployment from experienced DevOps engineers.',
      organizer: 'Sarah Johnson',
      organizerId: 'professional1',
      date: '2024-04-05T16:00:00Z',
      location: 'Online',
      type: 'seminar',
      maxAttendees: 75,
      currentAttendees: 23,
      imageUrl: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2'
    },
    {
      id: '5',
      title: 'Student Project Showcase',
      description: 'Students present their capstone projects and receive feedback from industry professionals. Great networking opportunity!',
      organizer: 'University Tech Club',
      organizerId: 'student1',
      date: '2024-04-12T18:00:00Z',
      location: 'Austin, TX',
      type: 'networking',
      maxAttendees: 100,
      currentAttendees: 67,
      imageUrl: 'https://images.pexels.com/photos/1181678/pexels-photo-1181678.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2'
    },
    {
      id: '6',
      title: 'Cybersecurity Fundamentals Workshop',
      description: 'Introduction to cybersecurity concepts, threat analysis, and security best practices for web applications.',
      organizer: 'SecureTech Solutions',
      organizerId: 'company4',
      date: '2024-04-18T13:00:00Z',
      location: 'Online',
      type: 'workshop',
      maxAttendees: 60,
      currentAttendees: 41,
      imageUrl: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2'
    }
  ];

  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.organizer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = eventType === 'all' || event.type === eventType;
    
    if (filterBy === 'all') return matchesSearch && matchesType;
    if (filterBy === 'my-events' && user) {
      // Show events organized by the user or events they've joined
      return matchesSearch && matchesType && (event.organizerId === user.id);
    }
    if (filterBy === 'joined') {
      // Mock: assume user has joined some events
      return matchesSearch && matchesType && ['1', '4'].includes(event.id);
    }
    return matchesSearch && matchesType;
  });

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'workshop': return Code;
      case 'networking': return Users;
      case 'hackathon': return Zap;
      case 'seminar': return GraduationCap;
      default: return Calendar;
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'workshop': return 'bg-blue-600/20 text-blue-300 border-blue-500/30';
      case 'networking': return 'bg-purple-600/20 text-purple-300 border-purple-500/30';
      case 'hackathon': return 'bg-orange-600/20 text-orange-300 border-orange-500/30';
      case 'seminar': return 'bg-green-600/20 text-green-300 border-green-500/30';
      default: return 'bg-gray-600/20 text-gray-300 border-gray-500/30';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      time: date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
      full: date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    };
  };

  const getAttendancePercentage = (current: number, max?: number) => {
    if (!max) return 0;
    return Math.min((current / max) * 100, 100);
  };

  const canCreateEvents = user?.role === 'company' || user?.role === 'professional';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Events</h1>
          <p className="text-gray-300">
            {user?.role === 'student' && 'Discover workshops, networking events, and learning opportunities'}
            {user?.role === 'professional' && 'Share knowledge, attend events, and grow your network'}
            {user?.role === 'company' && 'Host events, engage with talent, and build your brand'}
          </p>
        </div>
        {canCreateEvents && (
          <Button 
            className="flex items-center space-x-2"
            onClick={() => setShowCreateModal(true)}
          >
            <Plus className="h-4 w-4" />
            <span>Create Event</span>
          </Button>
        )}
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search events, organizers, or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-400" />
                <select
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value)}
                  className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Events</option>
                  {user && <option value="joined">Joined Events</option>}
                  {canCreateEvents && <option value="my-events">My Events</option>}
                </select>
              </div>

              <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="workshop">Workshops</option>
                <option value="networking">Networking</option>
                <option value="hackathon">Hackathons</option>
                <option value="seminar">Seminars</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Calendar className="h-6 w-6 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">24</div>
            <div className="text-sm text-gray-400">This Month</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="h-6 w-6 text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">1.2K</div>
            <div className="text-sm text-gray-400">Attendees</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Building2 className="h-6 w-6 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">45</div>
            <div className="text-sm text-gray-400">Organizers</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Star className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">4.8</div>
            <div className="text-sm text-gray-400">Avg Rating</div>
          </CardContent>
        </Card>
      </div>

      {/* Events Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => {
          const TypeIcon = getEventTypeIcon(event.type);
          const dateInfo = formatDate(event.date);
          const attendancePercentage = getAttendancePercentage(event.currentAttendees, event.maxAttendees);
          
          return (
            <Card key={event.id} hover className="overflow-hidden">
              <div className="aspect-video bg-gray-700 overflow-hidden relative">
                {event.imageUrl ? (
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
                    <TypeIcon className="h-12 w-12 text-white" />
                  </div>
                )}
                
                {/* Event Type Badge */}
                <div className="absolute top-3 left-3">
                  <span className={`px-2 py-1 text-xs rounded-full border ${getEventTypeColor(event.type)}`}>
                    {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                  </span>
                </div>

                {/* Date Badge */}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg p-2 text-center">
                  <div className="text-xs font-bold text-gray-800">{dateInfo.date}</div>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">{event.title}</h3>
                    <p className="text-sm text-gray-300 line-clamp-3">{event.description}</p>
                  </div>

                  <div className="space-y-2 text-sm text-gray-300">
                    <div className="flex items-center space-x-2">
                      <Building2 className="h-4 w-4 text-gray-400" />
                      <span>{event.organizer}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span>{dateInfo.full}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span>{dateInfo.time}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span>{event.location}</span>
                      {event.location === 'Online' && (
                        <Globe className="h-4 w-4 text-blue-400" />
                      )}
                    </div>
                  </div>

                  {/* Attendance Progress */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-300">
                        {event.currentAttendees} / {event.maxAttendees} attendees
                      </span>
                      <span className="text-gray-400">{Math.round(attendancePercentage)}% full</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          attendancePercentage > 90 ? 'bg-red-500' :
                          attendancePercentage > 70 ? 'bg-yellow-500' :
                          'bg-blue-500'
                        }`}
                        style={{ width: `${attendancePercentage}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Eye className="h-4 w-4" />
                        <span>{Math.floor(Math.random() * 500) + 100}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="h-4 w-4" />
                        <span>{Math.floor(Math.random() * 20) + 5}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-red-400 transition-colors">
                        <Heart className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-blue-400 transition-colors">
                        <Share2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Register/Join Button */}
                  <div className="pt-2">
                    {attendancePercentage >= 100 ? (
                      <Button variant="outline" className="w-full" disabled>
                        Event Full
                      </Button>
                    ) : (
                      <Button className="w-full">
                        {user?.role === 'company' && event.organizerId === user.id ? 'Manage Event' : 'Register Now'}
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredEvents.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="mb-4">
                <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">No events found</h3>
                <p className="text-gray-300">
                  {searchTerm
                    ? `No events match your search for "${searchTerm}"`
                    : 'No events available at the moment'
                  }
                </p>
              </div>
              {!searchTerm && canCreateEvents && (
                <Button 
                  className="mt-4"
                  onClick={() => setShowCreateModal(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Event
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Create Event Modal Placeholder */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Create New Event</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ×
                </button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Event Title
                  </label>
                  <input
                    type="text"
                    placeholder="Enter event title..."
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe your event..."
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Event Type
                    </label>
                    <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="workshop">Workshop</option>
                      <option value="networking">Networking</option>
                      <option value="hackathon">Hackathon</option>
                      <option value="seminar">Seminar</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Max Attendees
                    </label>
                    <input
                      type="number"
                      placeholder="50"
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Time
                    </label>
                    <input
                      type="time"
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="Online or physical address..."
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowCreateModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={() => setShowCreateModal(false)}>
                    Create Event
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default EventsPage;