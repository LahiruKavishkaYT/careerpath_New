import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Plus, 
  Search, 
  Filter, 
  Github, 
  ExternalLink, 
  Star,
  MessageCircle,
  Eye,
  Calendar
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '../components/UI/Card';
import Button from '../components/UI/Button';
import { Project } from '../types';

const ProjectsPage: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');

  // Mock project data
  const mockProjects: Project[] = [
    {
      id: '1',
      title: 'E-commerce React App',
      description: 'A full-stack e-commerce application built with React, Node.js, and PostgreSQL. Features include user authentication, shopping cart, payment integration, and admin dashboard.',
      author: 'Alex Chen',
      authorId: 'user1',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      githubUrl: 'https://github.com/alexchen/ecommerce-app',
      liveUrl: 'https://ecommerce-demo.netlify.app',
      imageUrl: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
      createdAt: '2024-03-10',
      feedback: []
    },
    {
      id: '2',
      title: 'Task Management Dashboard',
      description: 'A collaborative task management tool with real-time updates, drag-and-drop functionality, and team collaboration features.',
      author: 'Sarah Johnson',
      authorId: 'user2',
      technologies: ['Vue.js', 'Firebase', 'Tailwind CSS'],
      githubUrl: 'https://github.com/sarahjohnson/task-manager',
      liveUrl: 'https://taskboard-demo.vercel.app',
      imageUrl: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
      createdAt: '2024-03-08',
      feedback: []
    },
    {
      id: '3',
      title: 'Weather App with Maps',
      description: 'Interactive weather application with location-based forecasts, interactive maps, and weather alerts.',
      author: 'Mike Rodriguez',
      authorId: 'user3',
      technologies: ['React', 'OpenWeather API', 'Mapbox', 'Chart.js'],
      githubUrl: 'https://github.com/mikerodriguez/weather-app',
      imageUrl: 'https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
      createdAt: '2024-03-05',
      feedback: []
    }
  ];

  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (filterBy === 'all') return matchesSearch;
    if (filterBy === 'my-projects' && user) return matchesSearch && project.authorId === user.id;
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Projects</h1>
          <p className="text-gray-300">
            {user?.role === 'student' && 'Showcase your work and get feedback from the community'}
            {user?.role === 'professional' && 'Share your expertise and discover innovative projects'}
            {user?.role === 'company' && 'Discover talent through their project portfolios'}
          </p>
        </div>
        {(user?.role === 'student' || user?.role === 'professional') && (
          <Button className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Upload Project</span>
          </Button>
        )}
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects, technologies, or descriptions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Projects</option>
                {user && <option value="my-projects">My Projects</option>}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <Card key={project.id} hover className="overflow-hidden">
            <div className="aspect-video bg-gray-700 overflow-hidden">
              {project.imageUrl ? (
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
                  <span className="text-white text-2xl font-bold">
                    {project.title.split(' ').map(word => word[0]).join('').substring(0, 2)}
                  </span>
                </div>
              )}
            </div>
            
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">{project.title}</h3>
                  <p className="text-sm text-gray-300 line-clamp-3">{project.description}</p>
                </div>

                <div className="flex flex-wrap gap-1">
                  {project.technologies.slice(0, 3).map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-600/20 text-blue-300 text-xs rounded-full border border-blue-500/30"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 bg-gray-700 text-gray-400 text-xs rounded-full">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(project.createdAt).toLocaleDateString()}</span>
                  </div>
                  <span>by {project.author}</span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Eye className="h-4 w-4" />
                      <span>234</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4" />
                      <span>18</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="h-4 w-4" />
                      <span>7</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-gray-400 hover:text-gray-300 transition-colors"
                      >
                        <Github className="h-4 w-4" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-gray-400 hover:text-blue-400 transition-colors"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="mb-4">
                <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">No projects found</h3>
                <p className="text-gray-300">
                  {searchTerm
                    ? `No projects match your search for "${searchTerm}"`
                    : 'No projects available at the moment'
                  }
                </p>
              </div>
              {!searchTerm && (user?.role === 'student' || user?.role === 'professional') && (
                <Button className="mt-4">
                  <Plus className="h-4 w-4 mr-2" />
                  Upload Your First Project
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProjectsPage;